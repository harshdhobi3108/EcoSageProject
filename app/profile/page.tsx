"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Leaf,
  Award,
  Package,
  CreditCard,
  Bell,
  Shield,
  Edit3
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    joinDate: "March 2024",
    ecoScore: 850,
    orderCount: 12,
    carbonSaved: "45 kg",
    plasticAvoided: "120 items"
  });

  console.log("Profile page rendered");

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-05-20",
      status: "Delivered",
      total: 89.99,
      items: 3,
      ecoImpact: "12 kg CO2 saved"
    },
    {
      id: "ORD-002", 
      date: "2024-05-15",
      status: "Shipped",
      total: 45.99,
      items: 2,
      ecoImpact: "8 kg CO2 saved"
    },
    {
      id: "ORD-003",
      date: "2024-05-10",
      status: "Delivered",
      total: 156.99,
      items: 5,
      ecoImpact: "25 kg CO2 saved"
    }
  ];

  const mockFavorites = [
    {
      id: "1",
      name: "EcoFlow Stainless Steel Water Bottle",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop"
    },
    {
      id: "5",
      name: "Beeswax Food Wraps Set",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-forest-50 to-sage-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-forest-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <h1 className="text-3xl font-bold text-forest-600">{profile.name}</h1>
                <Badge className="eco-badge">
                  <Leaf className="h-3 w-3 mr-1" />
                  Eco Champion
                </Badge>
              </div>
              <p className="text-muted-foreground">{profile.email}</p>
              <p className="text-sm text-muted-foreground">Member since {profile.joinDate}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-forest-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-forest-600">{profile.ecoScore}</div>
                  <div className="text-sm text-muted-foreground">Eco Score</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-sage-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-forest-600">{profile.orderCount}</div>
                  <div className="text-sm text-muted-foreground">Orders Placed</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Leaf className="h-8 w-8 text-sandy-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-forest-600">{profile.carbonSaved}</div>
                  <div className="text-sm text-muted-foreground">CO2 Saved</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-forest-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-forest-600">{profile.plasticAvoided}</div>
                  <div className="text-sm text-muted-foreground">Plastic Avoided</div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <Button onClick={handleSaveProfile} className="bg-forest-500 hover:bg-forest-600">
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-forest-500" />
                  <span>Your Environmental Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-forest-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-700 mb-2">🌍 Carbon Footprint Reduction</h4>
                    <p className="text-sm text-forest-600">
                      By choosing sustainable products, you've saved {profile.carbonSaved} of CO2 emissions compared to conventional alternatives.
                    </p>
                  </div>
                  
                  <div className="bg-sage-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sage-700 mb-2">♻️ Plastic Waste Prevention</h4>
                    <p className="text-sm text-sage-600">
                      Your choices have prevented {profile.plasticAvoided} of single-use plastic items from entering landfills and oceans.
                    </p>
                  </div>
                  
                  <div className="bg-sandy-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sandy-700 mb-2">🏆 Sustainability Score</h4>
                    <p className="text-sm text-sandy-600">
                      With an eco score of {profile.ecoScore}, you're in the top 15% of our most environmentally conscious customers!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Order History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="font-semibold">{order.id}</div>
                          <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${order.total}</div>
                          <div className="text-sm text-muted-foreground">{order.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{order.items} items</span>
                        <span className="text-forest-600">🌱 {order.ecoImpact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Favorite Products</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockFavorites.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-lg font-bold text-forest-600">${item.price}</p>
                      </div>
                      <Button size="sm" className="bg-forest-500 hover:bg-forest-600">
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>Order updates and shipping notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>New eco-friendly product recommendations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Weekly sustainability tips and insights</span>
                    </label>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment & Billing</span>
                  </h4>
                  <Button variant="outline">Manage Payment Methods</Button>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Privacy & Security</span>
                  </h4>
                  <div className="space-y-2">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Download My Data</Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}