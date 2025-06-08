
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Search } from 'lucide-react';

const KnowledgeBase = () => {
  const workAtHeightFAQs = [
    {
      question: "What PPE is required when working at height?",
      answer: "Essential PPE includes: safety harness with full body support, hard hat, safety boots with good grip, high-visibility clothing, and appropriate gloves. All equipment must be regularly inspected and certified."
    },
    {
      question: "When should fall protection be used?",
      answer: "Fall protection is required when working at heights of 6 feet (1.8m) or more in general industry, or 4 feet (1.2m) in construction. This includes work platforms, ladders, scaffolding, and any elevated surfaces."
    },
    {
      question: "How should ladders be positioned safely?",
      answer: "Follow the 4:1 rule - for every 4 feet of height, the base should be 1 foot away from the wall. Ensure the ladder extends 3 feet above the landing point, maintain three points of contact, and never exceed the weight limit."
    },
    {
      question: "What are the main types of fall protection systems?",
      answer: "Personal Fall Arrest Systems (PFAS), guardrails, safety nets, positioning systems, and travel restraint systems. Each has specific applications and requirements for proper installation and use."
    }
  ];

  const fireSafetyFAQs = [
    {
      question: "How often should fire extinguishers be inspected?",
      answer: "Visual inspections should be monthly, annual maintenance by qualified personnel, and internal examination every 6 years. Keep records of all inspections and ensure extinguishers are easily accessible."
    },
    {
      question: "What are the different classes of fires?",
      answer: "Class A (ordinary combustibles), Class B (flammable liquids), Class C (electrical), Class D (metals), and Class K (cooking oils). Each requires specific extinguishing agents."
    },
    {
      question: "How should evacuation routes be maintained?",
      answer: "Keep all exits clearly marked and illuminated, ensure pathways are free of obstructions, maintain proper width requirements, and regularly test emergency lighting systems."
    },
    {
      question: "What is the proper fire drill procedure?",
      answer: "Sound alarm, evacuate via nearest safe exit, proceed to designated assembly point, take roll call, remain at assembly point until all-clear is given. Practice should occur regularly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Comprehensive safety information and frequently asked questions
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Ask the Chatbot</h3>
                  <p className="text-sm text-muted-foreground">Get instant answers</p>
                </div>
              </div>
              <Link to="/dashboard">
                <Button className="w-full bg-safety-orange hover:bg-safety-orange/90">
                  Chat with AI Assistant
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Search className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">Analyze scenarios</p>
                </div>
              </div>
              <Link to="/risk-prediction">
                <Button variant="outline" className="w-full">
                  Predict Risk Level
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Work at Height */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <CardTitle>Work at Height</CardTitle>
                </div>
                <Badge variant="outline">{workAtHeightFAQs.length} FAQs</Badge>
              </div>
              <CardDescription>
                Safety guidelines and best practices for elevated work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {workAtHeightFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`height-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Fire Safety */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-safety-orange" />
                  <CardTitle>Fire Safety</CardTitle>
                </div>
                <Badge variant="outline">{fireSafetyFAQs.length} FAQs</Badge>
              </div>
              <CardDescription>
                Fire prevention, protection, and emergency procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {fireSafetyFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`fire-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Additional Safety Resources</CardTitle>
            <CardDescription>
              Important links and documentation for workplace safety
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "OSHA Standards", description: "Official workplace safety regulations" },
                { title: "Safety Training Materials", description: "Comprehensive training resources" },
                { title: "Incident Reporting", description: "How to report safety incidents" },
                { title: "Emergency Procedures", description: "Step-by-step emergency responses" },
                { title: "Equipment Manuals", description: "Safety equipment documentation" },
                { title: "Industry Guidelines", description: "Sector-specific safety requirements" }
              ].map((resource, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default KnowledgeBase;
