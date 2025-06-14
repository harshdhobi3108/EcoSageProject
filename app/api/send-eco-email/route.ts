import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, ecoDay } = body;

    if (!email || !ecoDay?.title || !ecoDay?.date) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
  from: process.env.SMTP_EMAIL,
  to: email,
  subject: `🌿 ${ecoDay.title} is Today! Let's Celebrate!`,
  html: `
  <div style="background-color:#e0f7ec;padding:24px 20px;border-radius:12px;font-family:'Segoe UI',sans-serif;color:#2e7d32;max-width:600px;margin:auto;border:1px solid #81c784;line-height:1.6;">
    <h2 style="text-align:center;margin-bottom:20px;">🌿 ${ecoDay.title} Reminder</h2>

    <p style="font-size:16px;margin-bottom:12px;">Hi Eco Warrior! 👋</p>

    <p style="font-size:16px;margin-bottom:20px;">
      Today is <strong>${ecoDay.title}</strong> (<em>${ecoDay.date}</em>)!<br/>
      It’s the perfect moment to make a small change with a big impact.
    </p>

    <div style="background:#ffffff;border-radius:10px;padding:18px 16px;margin:24px 0;border:1px dashed #a5d6a7;">
      <p style="margin:0;font-size:15px;font-weight:600;">✅ Simple Eco Actions You Can Do Today:</p>
      <ul style="margin-top:10px;padding-left:20px;">
        <li style="margin-bottom:8px;">♻️ Recycle something around you</li>
        <li style="margin-bottom:8px;">🌳 Plant a tree or water a plant</li>
        <li style="margin-bottom:8px;">🚶‍♂️ Walk or cycle instead of driving</li>
        <li>📚 Teach someone about sustainability</li>
      </ul>
    </div>

    <p style="font-size:15px;margin-bottom:20px;">
      Every action counts. Let’s make the Earth a little greener today 💚
    </p>

    <p style="font-size:15px;margin-top:28px;">
      Stay Green, Stay Awesome 🌟<br/>
      — Team EcoSage 🌱
    </p>

    <div style="text-align:center;margin-top:40px;font-size:13px;color:#555;">
      You received this because you’re part of the EcoSage community 🌍
    </div>
  </div>
`,
});


    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
