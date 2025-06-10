import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FeedbackForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create mailto link with all form data
      const emailSubject = encodeURIComponent(`PII Shield Feedback: ${subject}`);
      const emailBody = encodeURIComponent(
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}`
      );
      const mailtoLink = `mailto:jacksonmativo21@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Email client opened",
        description: "Your feedback email has been prepared. Please send it from your email client.",
      });
      
      // Clear form
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client. Please contact jacksonmativo21@gmail.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Send a Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white text-sm font-medium">
              Full Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="jackson mativo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
              required
            />
          </div>

          {/* Email Address Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-medium">
              Email Address <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
              required
            />
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white text-sm font-medium">
              Subject <span className="text-red-400">*</span>
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="What's this about?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
              required
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white text-sm font-medium">
              Message <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="write your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-base transition-all shadow-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Opening Email...' : 'Send feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};