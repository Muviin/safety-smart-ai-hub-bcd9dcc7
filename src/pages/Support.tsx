
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Clock, MessageSquare, HelpCircle, FileQuestion } from 'lucide-react';

const Support = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support request submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  const faqItems = [
    {
      question: "How accurate is the AI risk prediction?",
      answer: "Our AI system achieves 92% accuracy in risk assessment based on extensive training data from workplace incidents and safety protocols."
    },
    {
      question: "Can I integrate this with existing safety systems?",
      answer: "Yes, we provide API endpoints and webhook integrations for popular safety management platforms and IoT devices."
    },
    {
      question: "What data is required for risk prediction?",
      answer: "The system works best with detailed scenario descriptions including environment, equipment, personnel, and specific activities being performed."
    },
    {
      question: "How do I train my team to use the chatbot effectively?",
      answer: "We provide comprehensive training materials and can arrange live demo sessions for your team."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Support & Contact</h1>
          <p className="text-muted-foreground">
            Get help with SafetyAI or reach out to our support team
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <CardTitle>Contact Support</CardTitle>
                </div>
                <CardDescription>
                  Send us a message and we'll respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="training">Training Support</SelectItem>
                        <SelectItem value="integration">Integration Help</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your issue or question in detail..."
                      className="min-h-32"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-safety-orange hover:bg-safety-orange/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </div>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="font-semibold mb-2 flex items-start space-x-2">
                      <FileQuestion className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item.question}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@safetyai.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>
                  When you can expect to hear from us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical Issues</span>
                  <span className="text-sm font-medium text-risk-high">2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technical Support</span>
                  <span className="text-sm font-medium text-risk-medium">24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">General Inquiries</span>
                  <span className="text-sm font-medium text-risk-low">48 hours</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="shadow-lg border-safety-orange">
              <CardHeader>
                <CardTitle className="text-safety-orange">Emergency Support</CardTitle>
                <CardDescription>
                  For critical safety issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  If you're experiencing a critical safety situation that requires immediate attention:
                </p>
                <Button className="w-full bg-safety-orange hover:bg-safety-orange/90">
                  Call Emergency Line
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Available 24/7 for urgent safety matters
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
