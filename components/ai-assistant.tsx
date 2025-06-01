"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, Leaf } from "lucide-react";
import { searchProducts, Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { processAIQuery, generateFollowUpSuggestions } from "@/lib/ai-service";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: Product[];
  timestamp: Date;
  confidence?: number;
  suggestions?: string[];
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your EcoSage assistant. Tell me what you're looking for and I'll help you find the perfect sustainable product. For example, try asking: 'I need something to keep my drinks cold while traveling'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const processUserQuery = async (query: string): Promise<{ response: string; products: Product[]; confidence: number; suggestions: string[] }> => {
    console.log("Processing AI query:", query);
    
    // Use the enhanced AI service
    const aiResponse = processAIQuery(query);
    const suggestions = generateFollowUpSuggestions(query, aiResponse.products);
    
    return { 
      response: aiResponse.message, 
      products: aiResponse.products,
      confidence: aiResponse.confidence,
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { response, products, confidence, suggestions } = await processUserQuery(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        products: products,
        timestamp: new Date(),
        confidence,
        suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      console.log("AI response generated:", { response, productCount: products.length, confidence });
    } catch (error) {
      console.error("Error processing AI query:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble right now. Please try asking again!",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-forest-500 to-sage-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span>EcoSage AI Assistant</span>
          <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-white/30">
            <Leaf className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Messages */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                message.role === "assistant"
                  ? "bg-forest-100 text-forest-600"
                  : "bg-sandy-100 text-sandy-600"
              }`}>
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>

              <div className={`flex-1 max-w-sm ${message.role === "user" ? "text-right" : ""}`}>
                <div className={`chat-bubble ${
                  message.role === "user"
                    ? "bg-sandy-100 border-sandy-200"
                    : "bg-white border-gray-200"
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>

                {/* Product Recommendations */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {message.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Follow-up Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs text-muted-foreground">You might also ask:</div>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(suggestion)}
                          className="text-xs px-3 py-1 bg-forest-50 hover:bg-forest-100 text-forest-700 rounded-full border border-forest-200 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confidence Indicator */}
                {message.confidence && message.role === "assistant" && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {message.confidence >= 0.8 ? "🎯 High confidence" : 
                     message.confidence >= 0.6 ? "✅ Good match" : 
                     "💡 Suggested alternatives"}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-forest-100 text-forest-600">
                <Bot className="h-4 w-4" />
              </div>
              <div className="chat-bubble">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about sustainable products... (e.g., 'I need a reusable water bottle for hiking')"
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-forest-500 hover:bg-forest-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}