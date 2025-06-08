
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
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    "What PPE is required for working at height?",
    "How often should fire extinguishers be inspected?",
    "What are the main causes of workplace accidents?",
    "Safety checklist for confined spaces"
  ];

  // AI response system for safety questions
  const getSafetyResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Work at height responses
    if (lowerQuestion.includes('ppe') && (lowerQuestion.includes('height') || lowerQuestion.includes('working at height'))) {
      return "For working at height, essential PPE includes: safety harness with full body support, hard hat, safety boots with slip-resistant soles, high-visibility clothing, and cut-resistant gloves. All equipment must be inspected before use and certified to current standards (ANSI/OSHA). Replace any damaged equipment immediately.";
    }
    
    if (lowerQuestion.includes('ladder') && (lowerQuestion.includes('safe') || lowerQuestion.includes('position'))) {
      return "Follow the 4:1 ladder safety rule - for every 4 feet of height, position the base 1 foot from the wall. Ensure the ladder extends 3 feet above the landing point, maintain three points of contact while climbing, never exceed the weight limit, and always face the ladder when ascending or descending.";
    }
    
    if (lowerQuestion.includes('fall protection') || (lowerQuestion.includes('fall') && lowerQuestion.includes('system'))) {
      return "Fall protection is required at 6+ feet in general industry and 4+ feet in construction. Main systems include: Personal Fall Arrest Systems (PFAS), guardrails, safety nets, positioning systems, and travel restraint systems. Each system requires proper anchorage points rated for 5,000 lbs per person.";
    }
    
    // Fire safety responses
    if (lowerQuestion.includes('fire extinguisher') && lowerQuestion.includes('inspect')) {
      return "Fire extinguishers require: monthly visual inspections (check pressure gauge, pin/tamper seal, general condition), annual maintenance by qualified personnel, and internal examination every 6 years. Keep detailed inspection records and ensure extinguishers are easily accessible and properly mounted.";
    }
    
    if (lowerQuestion.includes('fire') && lowerQuestion.includes('class')) {
      return "Fire classes: Class A (ordinary combustibles like wood/paper) - use water/foam; Class B (flammable liquids) - use foam/CO2; Class C (electrical) - use CO2/dry chemical; Class D (metals) - use dry powder; Class K (cooking oils) - use wet chemical. Never use water on electrical or grease fires.";
    }
    
    if (lowerQuestion.includes('evacuation') || (lowerQuestion.includes('fire') && lowerQuestion.includes('drill'))) {
      return "Fire evacuation procedure: 1) Sound the alarm immediately, 2) Exit via nearest safe route (not elevators), 3) Close doors behind you, 4) Proceed to designated assembly point, 5) Take roll call, 6) Remain at assembly point until all-clear. Practice monthly and ensure all exit routes are clearly marked and unobstructed.";
    }
    
    // General workplace safety
    if (lowerQuestion.includes('accident') && lowerQuestion.includes('cause')) {
      return "Main causes of workplace accidents: 1) Slips, trips, and falls (33%), 2) Being struck by objects (10%), 3) Falls from height (8%), 4) Manual handling injuries (20%), 5) Being caught in machinery (7%). Prevention focuses on proper training, PPE use, hazard identification, and maintaining clean, organized workspaces.";
    }
    
    if (lowerQuestion.includes('confined space')) {
      return "Confined space safety checklist: 1) Obtain entry permit, 2) Test atmosphere (oxygen 19.5-23.5%, toxic gases <10% LEL), 3) Ensure continuous ventilation, 4) Use lockout/tagout procedures, 5) Station attendant outside, 6) Wear appropriate PPE and detection equipment, 7) Establish emergency rescue procedures, 8) Never enter alone.";
    }
    
    if (lowerQuestion.includes('harness') || lowerQuestion.includes('safety belt')) {
      return "Safety harness guidelines: Use full-body harnesses (not belts) for fall protection, inspect before each use for cuts/fraying/damaged hardware, ensure proper fit (snug but comfortable), attach to certified anchor points, replace if dropped or after arresting a fall, and store properly away from chemicals/UV light.";
    }
    
    // Default response for unrecognized questions
    return "I can help with workplace safety questions about work at height, fire safety, PPE requirements, and general safety procedures. Could you please rephrase your question or try asking about specific safety topics like ladder safety, fire extinguishers, fall protection, or confined spaces?";
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    }]);

    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const response = getSafetyResponse(chatMessage);
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
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
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg text-sm bg-muted text-muted-foreground">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
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
