
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MessageSquare, AlertTriangle, ArrowRight, Send } from 'lucide-react';

const Dashboard = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [quickRisk, setQuickRisk] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: 'Hello! I\'m your AI Safety Assistant. Ask me anything about workplace safety, fire safety, or working at height.',
      timestamp: new Date()
    }
  ]);

  const sampleQuestions = [
    "What PPE is required for working at height?",
    "How often should fire extinguishers be inspected?",
    "What are the main causes of workplace accidents?",
    "Safety checklist for confined spaces"
  ];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    }]);

    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: 'Thank you for your question about workplace safety. Based on current safety standards, I recommend...',
        timestamp: new Date()
      }]);
    }, 1000);

    setChatMessage('');
  };

  const handleQuickPredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickRisk.trim()) return;
    console.log('Quick risk prediction:', quickRisk);
    // This would trigger the ML prediction service
    setQuickRisk('');
  };

  const askSampleQuestion = (question: string) => {
    setChatMessage(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Safety Dashboard</h1>
          <p className="text-muted-foreground">
            Get instant safety insights and AI-powered risk predictions
          </p>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AI Safety Chatbot Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle>AI Safety Chatbot</CardTitle>
              </div>
              <CardDescription>
                Ask questions about work at height and fire safety
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sample Questions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10 transition-colors text-xs"
                      onClick={() => askSampleQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Chat Interface */}
              <div className="border rounded-lg h-64 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask about safety procedures..."
                      className="flex-1"
                      data-chatbot="true"
                    />
                    <Button type="submit" size="sm" className="bg-safety-orange hover:bg-safety-orange/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Quick Risk Predictor Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-safety-orange" />
                <CardTitle>Quick Risk Predictor</CardTitle>
              </div>
              <CardDescription>
                Get instant risk assessment for workplace scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleQuickPredict} className="space-y-4">
                <Input
                  value={quickRisk}
                  onChange={(e) => setQuickRisk(e.target.value)}
                  placeholder="Describe a workplace situation..."
                  className="w-full"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-safety-orange hover:bg-safety-orange/90"
                  data-predict="true"
                >
                  Predict Risk Level
                </Button>
              </form>

              <div className="pt-4 border-t">
                <Link to="/risk-prediction">
                  <Button variant="outline" className="w-full group">
                    See full prediction details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Sample Recent Predictions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Recent Predictions:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm truncate">Working on ladder without harness</span>
                    <Badge className="bg-risk-high text-white">High</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm truncate">Blocked fire exit</span>
                    <Badge className="bg-risk-medium text-white">Medium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <p className="text-sm text-muted-foreground">Safety Queries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-safety-orange">23</div>
              <p className="text-sm text-muted-foreground">Risk Assessments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-risk-low">89%</div>
              <p className="text-sm text-muted-foreground">Safety Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground">Days Incident-Free</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
