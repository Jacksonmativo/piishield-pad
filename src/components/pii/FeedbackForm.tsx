import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Create mailto link to send feedback with user's email included
      const subject = encodeURIComponent('PII Shield Feedback');
      const emailInfo = email ? `From: ${email}\n\n` : '';
      const body = encodeURIComponent(`${emailInfo}${feedback}`);
      const mailtoLink = `mailto:jacksonmativo21@gmail.com?subject=${subject}&body=${body}`;
      
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Email client opened",
        description: "Your feedback email has been prepared. Please send it from your email client.",
      });
      setFeedback('');
      setEmail('');
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
          Send Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm">
              Your Email (optional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-white text-sm">
              Your Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, suggestions, or report issues..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
            />
          </div>
          <Button
            type="submit"
            disabled={!feedback.trim() || isSubmitting}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Opening Email...' : 'Send Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};