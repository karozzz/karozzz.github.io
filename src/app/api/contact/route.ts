import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, subject, message, contactType } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
      Contact Type: ${contactType || 'General'}
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      
      Message:
      ${message}
    `;

    console.log('Attempting to send email from', process.env.EMAIL_USER);

    // Configure Nodemailer with certificate issue fix
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // This is the critical fix for the certificate issue
        rejectUnauthorized: false
      }
    });

    // Send the email directly without verification
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent successfully:', info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Provide more specific error information
    let errorMessage = 'Failed to send email';
    let details = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      details = error.stack || '';
    }
    
    console.error('Error sending email:', errorMessage);
    console.error('Error details:', details);
    
    return NextResponse.json(
      { error: errorMessage, details },
      { status: 500 }
    );
  }
}
