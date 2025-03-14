"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type ContactType = "Hiring" | "Collaboration" | "General";
type StarData = {
  width: string;
  height: string;
  top: string;
  left: string;
  opacity: number;
  animationDelay?: string;
  animationDuration?: string;
};

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2024");
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactType, setContactType] = useState<ContactType>("General");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [stars, setStars] = useState<StarData[]>([]);
  const [formStars, setFormStars] = useState<StarData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate stars on client-side only
  useEffect(() => {
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear().toString());
    setIsVisible(true);
    
    // Generate footer background stars
    const footerStars = Array.from({ length: 20 }, () => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    
    // Generate form background stars
    const contactFormStars = Array.from({ length: 8 }, () => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${Math.random() * 2 + 3}s`,
    }));
    
    setStars(footerStars);
    setFormStars(contactFormStars);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Validate form before sending
    if (!name || !email || !subject || !message) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create form data to send to API
      const formData = {
        contactType: contactType || "General",
        name,
        email,
        phone,
        subject,
        message
      };

      console.log('Sending message:', formData);

      // Send to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      // Reset form on success
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setSubmitStatus("success");
      
      console.log('Message sent successfully');
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render stars until client-side mounted
  if (!isMounted) {
    return null; // Return minimal footer or loading state
  }

  return (
    <footer className="bg-gradient-to-b from-black via-blue-950/90 to-indigo-950/95 text-gray-300 relative overflow-hidden z-40">
      {/* Subtle cosmic dots for footer */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white" 
            style={{
              width: star.width,
              height: star.height,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      
      <div 
        className={`max-w-7xl mx-auto transition-all duration-700 transform relative z-10 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Main Footer Content - Modified grid layout to give Send Message more space */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 px-6 py-16">
          {/* Contact Information - Now 1 column on desktop (was 1/3) */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
              </svg>
              Contact Info
            </h3>
            
            <div className="space-y-3">
              <ContactItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                text="k4r0z004@gmail.com"
                href="mailto:k4r0z004@gmail.com"
              />
              
              <ContactItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h4zm3 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V4a2 2 0 012-2h4zm3 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V4a2 2 0 012-2h4z" clipRule="evenodd" />
                  </svg>
                }
                text="+964 771 903 6814"
                href="tel:+9647719036814"
              />
              
              <ContactItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h4zm3 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V4a2 2 0 012-2h4z" clipRule="evenodd" />
                  </svg>
                }
                text="+964 770 265 8349"
                href="tel:+9647702658349"
              />
              
              <ContactItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                }
                text="Iraq, Sulaymaniah"
                href="https://maps.google.com/?q=Sulaymaniah+Iraq"
                external
              />
            </div>
          </div>
          
          {/* Connect Section - Now 1 column on desktop (was 1/3) */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              Connect
            </h3>
            
            {/* Social media buttons in 2 rows for desktop and tablets */}
            <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
              {/* First row */}
              <SocialButton href="https://github.com/karozzz" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </SocialButton>
              <SocialButton href="https://www.linkedin.com/in/karozrebaz" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </SocialButton>
              <SocialButton href="https://instagram.com/karoz04" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0-2.917-.01-3.96-.058-.976-.045-1.505-.207-1.858-.344-.466-.182-.8-.398-1.15-.748-.35-.35-.566-.683-.748-1.15-.137-.353-.3-.882-.344-1.857-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </SocialButton>
              <SocialButton href="https://snapchat.com/add/karoz2004" aria-label="Snapchat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.166 3.36c.323 0 1.43.1 1.938.271.211.068.41.14.608.242a2.66 2.66 0 01.714.56c.253.283.422.581.555.95.212.584.163 1.245.12 1.865-.13.211-.022.421-.03.632a.393.393 0 00.054.202.452.452 0 00.222.158c.13.042.263.075.395.114.443.135.768.276 1.007.462.353.272.532.6.552 1.007.01.267-.08.546-.328.785-.122.12-.3.223-.514.31a3.99 3.99 0 01-.484.122c-.214.045-.428.077-.623.134-.151.043-.376.119-.44.216-.05.08-.02.17.03.299.196.518.512.98.888 1.379.233.242.494.47.765.678.205.156.41.313.625.46.253.17.506.351.79.484.143.068.328.14.415.232.13.131.13.313-.01.454-.1.102-.223.165-.355.234-.243.128-.513.214-.783.294-.09.025-.198.06-.307.081-.12.018-.24.073-.291.181-.07.154.03.463-.179.6-.189.127-.652.081-.851.071a5.22 5.22 0 00-.807.011c-.183.02-.356.088-.538.15-.701.246-1.312.926-2.175.926-.03 0-.058 0-.087-.003-2.175.08-2.874-1.047-3.526-1.047-.17 0-.336.033-.499.081a1.008 1.008 0 00-.358.02c-.13.003-.261.013-.392.013-.358 0-.749-.048-.987-.303-.137-.143-.161-.31-.162-.475-.003-.26.092-.505-.13-.592a9.649 9.649 0 01-.298-.1c-.289-.105-.57-.2-.86-.283-.13-.041-.26-.078-.387-.123a2.624 2.624 0 01-.371-.177c-.192-.118-.328-.252-.38-.408-.07-.238.04-.408.192-.547.283-.26.622-.399.944-.553.144-.7.289-.135.423-.214.25-.15.47-.336.572-.61.05-.151.06-.32-.04-.445-.102-.129-.26-.174-.409-.224a3.494 3.494 0 01-.517-.246c-.142-.09-.272-.19-.363-.337a.723.723 0 01-.079-.635c.06-.18.175-.327.315-.445a1.494 1.494 0 01.487-.252c.179-.05.409-.08.545-.256.149-.183.129-.417.108-.642-.113-.98-.17-1.963.081-2.843.336-1.173 1.138-1.742 1.907-2.123a4.168 4.168 0 011.09-.32c.309-.04.617-.06.926-.06z"/>
                </svg>
              </SocialButton>
              <SocialButton href="https://wa.me/9647719036814" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </SocialButton>
            </div>
          </div>

          {/* Contact Form Section - Now 3 columns on desktop (was 1/3) */}
          <div id="contact-form" className="space-y-4 md:col-span-3 scroll-mt-32">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send Message
            </h3>
            
            {/* Dark-themed contact form with cosmic effect */}
            <div className="bg-gray-900/60 rounded-xl p-5 backdrop-blur-sm border border-indigo-500/20 
              shadow-lg shadow-indigo-500/10 relative overflow-hidden">
              
              {/* Subtle starry effect inside form */}
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                {formStars.map((star, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full bg-white animate-twinkle" 
                    style={{
                      width: star.width,
                      height: star.height,
                      top: star.top,
                      left: star.left,
                      opacity: star.opacity,
                      animationDelay: star.animationDelay,
                      animationDuration: star.animationDuration,
                    }}
                  />
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="relative z-10">
                {/* Toggle Buttons */}
                <div className="bg-gray-800/60 flex rounded-lg p-1 mb-5 text-sm">
                  <ToggleButton 
                    active={contactType === "Hiring"} 
                    onClick={() => setContactType("Hiring")}
                  >
                    Hiring
                  </ToggleButton>
                  <ToggleButton 
                    active={contactType === "Collaboration"} 
                    onClick={() => setContactType("Collaboration")}
                  >
                    Collaboration
                  </ToggleButton>
                  <ToggleButton 
                    active={contactType === "General"} 
                    onClick={() => setContactType("General")}
                  >
                    General
                  </ToggleButton>
                </div>
                
                {/* Input Fields */}
                <div className="space-y-4">
                  <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
                    <div className="md:w-1/2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="w-full bg-gray-800/60 rounded-lg border border-gray-700 px-4 py-2
                          text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2
                          focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                        className="w-full bg-gray-800/60 rounded-lg border border-gray-700 px-4 py-2
                          text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2
                          focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
                    <div className="md:w-1/2">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full bg-gray-800/60 rounded-lg border border-gray-700 px-4 py-2
                          text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2
                          focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        required
                        className="w-full bg-gray-800/60 rounded-lg border border-gray-700 px-4 py-2
                          text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2
                          focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      required
                      rows={5}
                      className="w-full bg-gray-800/60 rounded-lg border border-gray-700 px-4 py-2
                        text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2
                        focus:ring-blue-500/50 transition-all resize-none"
                    />
                  </div>
                  
                  {/* Submit Button with gradient and arrow icon */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700
                        hover:to-indigo-700 text-white rounded-lg px-4 py-2 transition-all
                        duration-300 relative overflow-hidden group flex items-center justify-center
                        hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50
                        disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2 transition-transform duration-300 
                            group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 
                        scale-x-0 group-hover:scale-100 origin-left transition-transform duration-300"></span>
                    </button>
                  </div>
                  
                  {/* Status Message */}
                  {submitStatus === "success" && (
                    <p className="text-green-400 text-sm mt-2 text-center animate-fadeIn">
                      Message sent successfully!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-400 text-sm mt-2 text-center animate-fadeIn">
                      Failed to send message. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Divider - Simplified with only copyright */}
        <div className="border-t border-blue-900/30">
          <div className="px-6 py-6 text-center">
            <div className="text-sm text-gray-400">
              © {currentYear} Karoz Rebaz. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Toggle Button for Contact Form
function ToggleButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-1.5 px-3 rounded-md transition-all relative ${
        active ? 'text-white' : 'text-gray-400 hover:text-gray-300'
      }`}
    >
      {children}
      {active && (
        <span className="absolute inset-0 rounded-md bg-indigo-600/30 blur-sm -z-10"></span>
      )}
      {active && (
        <span className="absolute inset-0 rounded-md border border-indigo-500/50 -z-10"></span>
      )}
      {active && (
        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-600/20 to-indigo-600/20 -z-10"></span>
      )}
    </button>
  );
}

// Contact item component
function ContactItem({ 
  icon, 
  text, 
  href,
  external = false
}: { 
  icon: React.ReactNode; 
  text: string; 
  href: string;
  external?: boolean;
}) {
  const commonClasses = "flex items-center text-gray-400 hover:text-blue-400 group transition-colors duration-300";
  
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
        <span className="mr-3 text-gray-500 group-hover:text-blue-400 transition-colors">{icon}</span>
        {text}
      </a>
    );
  }
  
  return (
    <a href={href} className={commonClasses}>
      <span className="mr-3 text-gray-500 group-hover:text-blue-400 transition-colors">{icon}</span>
      {text}
    </a>
  );
}

// Social button component with enhanced microinteractions
function SocialButton({ href, children, ...props }: { href: string; children: React.ReactNode; [x: string]: any }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-950/50 
        text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 
        transform magnetic-effect icon-rotate-hover relative
        after:absolute after:inset-0 after:rounded-full after:border-2 
        after:border-transparent hover:after:border-blue-400 after:scale-110 
        after:opacity-0 hover:after:opacity-100 after:transition-all"
      {...props}
    >
      {children}
    </a>
  );
}
