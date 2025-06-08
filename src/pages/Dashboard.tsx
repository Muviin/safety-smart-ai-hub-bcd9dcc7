
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { MessageSquare, AlertTriangle, ArrowRight, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [quickRisk, setQuickRisk] = useState('');
  const [riskResult, setRiskResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: 'Hello! I\'m your AI Safety Assistant. Ask me anything about workplace safety, including work at height, fire safety, chemical handling, machinery operation, electrical safety, manual handling, confined spaces, and more.',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    "What PPE is required for working at height?",
    "How to handle chemical spills safely?",
    "Electrical safety checklist",
    "Manual lifting best practices",
    "Confined space entry procedures",
    "Fire evacuation protocols"
  ];

  // Enhanced AI response system for comprehensive safety questions
  const getSafetyResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Work at height responses
    if (lowerQuestion.includes('ppe') && (lowerQuestion.includes('height') || lowerQuestion.includes('working at height'))) {
      return "For working at height, essential PPE includes: safety harness with full body support, hard hat, safety boots with slip-resistant soles, high-visibility clothing, and cut-resistant gloves. All equipment must be inspected before use and certified to current standards (ANSI/OSHA). Replace any damaged equipment immediately.";
    }
    
    if (lowerQuestion.includes('ladder')) {
      return "Ladder safety: Follow the 4:1 rule (4 feet height = 1 foot from wall), extend 3 feet above landing, maintain three points of contact, face ladder when climbing, check weight limits, and inspect for damage before use. Never lean sideways or overreach.";
    }
    
    if (lowerQuestion.includes('scaffolding')) {
      return "Scaffolding safety: Ensure proper assembly by qualified personnel, use guardrails and toeboards, check platform planking, maintain safe access points, inspect daily, and ensure 10:1 base-to-height ratio for stability.";
    }
    
    // Fire safety responses
    if (lowerQuestion.includes('fire') && (lowerQuestion.includes('extinguisher') || lowerQuestion.includes('suppress'))) {
      return "Fire extinguisher types: Class A (water/foam for ordinary combustibles), Class B (foam/CO2 for flammable liquids), Class C (CO2/dry chemical for electrical), Class D (dry powder for metals), Class K (wet chemical for cooking oils). Remember PASS: Pull pin, Aim at base, Squeeze handle, Sweep side to side.";
    }
    
    if (lowerQuestion.includes('evacuation') || (lowerQuestion.includes('fire') && lowerQuestion.includes('emergency'))) {
      return "Fire evacuation: Sound alarm immediately, use nearest safe exit (never elevators), close doors behind you, proceed to assembly point, take roll call, remain until all-clear. Practice monthly drills and keep exit routes clear and marked.";
    }
    
    // Chemical safety
    if (lowerQuestion.includes('chemical') || lowerQuestion.includes('hazardous material') || lowerQuestion.includes('spill')) {
      return "Chemical safety: Read SDS (Safety Data Sheets), use appropriate PPE, ensure proper ventilation, store chemicals correctly, have spill kits available, know emergency procedures. For spills: evacuate area, contain if safe, use appropriate absorbents, dispose properly, report immediately.";
    }
    
    if (lowerQuestion.includes('msds') || lowerQuestion.includes('sds')) {
      return "Safety Data Sheets (SDS) provide crucial information: hazard identification, composition, first-aid measures, fire-fighting measures, handling and storage, exposure controls/PPE, physical/chemical properties, and disposal considerations. Always consult before handling chemicals.";
    }
    
    // Electrical safety
    if (lowerQuestion.includes('electrical') || lowerQuestion.includes('electricity') || lowerQuestion.includes('lockout')) {
      return "Electrical safety: Use lockout/tagout (LOTO) procedures, test circuits before work, use insulated tools, wear appropriate PPE, maintain safe distances from power lines, inspect equipment regularly, and never work on live circuits unless absolutely necessary with proper training.";
    }
    
    // Manual handling
    if (lowerQuestion.includes('lifting') || lowerQuestion.includes('manual handling') || lowerQuestion.includes('ergonomic')) {
      return "Manual handling: Keep load close to body, bend knees not back, test weight before lifting, get help for heavy items, use mechanical aids when possible, avoid twisting while lifting, take breaks, and report any discomfort immediately.";
    }
    
    // Machinery safety
    if (lowerQuestion.includes('machinery') || lowerQuestion.includes('equipment') || lowerQuestion.includes('guard')) {
      return "Machinery safety: Ensure all guards are in place, follow lockout/tagout procedures, wear appropriate PPE, receive proper training, inspect before use, report defects immediately, never bypass safety devices, and maintain safe distances from moving parts.";
    }
    
    // Confined spaces
    if (lowerQuestion.includes('confined space')) {
      return "Confined space safety: Obtain entry permit, test atmosphere (oxygen 19.5-23.5%, toxic gases <10% LEL), ensure continuous ventilation, use lockout/tagout, station attendant outside, wear appropriate PPE and detection equipment, establish rescue procedures, never enter alone.";
    }
    
    // General workplace safety
    if (lowerQuestion.includes('accident') && lowerQuestion.includes('prevent')) {
      return "Accident prevention: Conduct regular risk assessments, provide proper training, maintain equipment, ensure good housekeeping, use appropriate PPE, follow procedures, report near misses, investigate incidents, and foster a safety culture.";
    }
    
    if (lowerQuestion.includes('risk assessment')) {
      return "Risk assessment process: 1) Identify hazards, 2) Determine who might be harmed, 3) Evaluate risks and existing controls, 4) Record findings and implement additional controls, 5) Review and update regularly. Use hierarchy of controls: elimination, substitution, engineering, administrative, PPE.";
    }
    
    if (lowerQuestion.includes('ppe') || lowerQuestion.includes('personal protective equipment')) {
      return "PPE selection: Assess specific hazards, ensure proper fit and comfort, provide training on use and maintenance, inspect regularly, replace when damaged, and remember PPE is the last line of defense - eliminate hazards at source when possible.";
    }
    
    if (lowerQuestion.includes('incident') || lowerQuestion.includes('report')) {
      return "Incident reporting: Report immediately to supervisor, provide first aid if needed, preserve scene for investigation, document thoroughly (who, what, when, where, why), identify root causes, implement corrective actions, and follow up to prevent recurrence.";
    }
    
    if (lowerQuestion.includes('training') || lowerQuestion.includes('safety training')) {
      return "Safety training essentials: Job-specific hazard awareness, proper PPE use, emergency procedures, equipment operation, risk assessment, incident reporting, and regular refresher sessions. Training should be practical, relevant, and regularly updated.";
    }
    
    if (lowerQuestion.includes('noise') || lowerQuestion.includes('hearing protection')) {
      return "Hearing protection: Use when noise exceeds 85dB (8-hour exposure), choose appropriate type (earplugs/earmuffs), ensure proper fit, maintain equipment, conduct audiometric testing, and implement noise control measures where possible.";
    }
    
    if (lowerQuestion.includes('ventilation') || lowerQuestion.includes('air quality')) {
      return "Ventilation safety: Ensure adequate fresh air supply, use local exhaust for hazardous processes, monitor air quality, maintain ventilation systems, and provide respiratory protection when engineering controls are insufficient.";
    }
    
    // Default comprehensive response
    return "I can help with all workplace safety topics including: work at height, fire safety, chemical handling, electrical safety, machinery operation, manual handling, confined spaces, PPE selection, risk assessment, incident reporting, emergency procedures, and safety training. Please provide more specific details about your safety question or concern.";
  };

  // Enhanced risk prediction system
  const predictRisk = (scenario: string) => {
    const lowerScenario = scenario.toLowerCase();
    let riskLevel = 'Low';
    let percentage = 20;
    let suggestions = [];
    let color = 'bg-risk-low';
    let icon = <CheckCircle className="h-5 w-5" />;

    // High risk scenarios
    if (lowerScenario.includes('height') || lowerScenario.includes('ladder') || lowerScenario.includes('roof') || 
        lowerScenario.includes('electrical') && lowerScenario.includes('live') ||
        lowerScenario.includes('chemical') && lowerScenario.includes('without') ||
        lowerScenario.includes('confined space') && !lowerScenario.includes('permit') ||
        lowerScenario.includes('machinery') && lowerScenario.includes('without guard')) {
      
      riskLevel = 'High';
      percentage = Math.floor(Math.random() * 20) + 75; // 75-95%
      color = 'bg-risk-high';
      icon = <AlertTriangle className="h-5 w-5" />;
      
      suggestions = [
        'Stop work immediately and assess hazards',
        'Implement proper safety controls before proceeding',
        'Ensure all required PPE is worn and functioning',
        'Conduct thorough risk assessment',
        'Provide additional safety training if needed',
        'Have emergency response procedures ready',
        'Consider alternative safer methods'
      ];
    }
    // Medium risk scenarios
    else if (lowerScenario.includes('machinery') || lowerScenario.includes('chemical') || 
             lowerScenario.includes('noise') || lowerScenario.includes('lifting') ||
             lowerScenario.includes('crowded') || lowerScenario.includes('weather')) {
      
      riskLevel = 'Medium';
      percentage = Math.floor(Math.random() * 20) + 45; // 45-65%
      color = 'bg-risk-medium';
      icon = <AlertCircle className="h-5 w-5" />;
      
      suggestions = [
        'Follow established safety procedures',
        'Ensure appropriate PPE is available and used',
        'Verify safety equipment is functioning',
        'Brief team on specific hazards',
        'Monitor conditions throughout work',
        'Have first aid resources available'
      ];
    }
    // Low risk scenarios
    else {
      riskLevel = 'Low';
      percentage = Math.floor(Math.random() * 25) + 15; // 15-40%
      color = 'bg-risk-low';
      icon = <CheckCircle className="h-5 w-5" />;
      
      suggestions = [
        'Follow standard safety protocols',
        'Wear appropriate PPE for the task',
        'Maintain situational awareness',
        'Report any safety concerns immediately',
        'Keep work area clean and organized'
      ];
    }

    return { level: riskLevel, percentage, suggestions, color, icon };
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
    
    const result = predictRisk(quickRisk);
    setRiskResult(result);
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
            Get instant safety insights and AI-powered risk predictions for all workplace scenarios
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
                Ask questions about all workplace safety topics
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
                      placeholder="Ask about any workplace safety topic..."
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
                Get instant graphical risk assessment for any workplace scenario
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

              {/* Risk Result Display */}
              {riskResult && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg animate-fade-in">
                  <div className="text-center">
                    <Badge className={`${riskResult.color} text-white text-lg px-4 py-2 mb-3`}>
                      <div className="flex items-center space-x-2">
                        {riskResult.icon}
                        <span>{riskResult.level} Risk</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Risk Level</span>
                      <span className="text-sm font-bold">{riskResult.percentage}%</span>
                    </div>
                    <Progress value={riskResult.percentage} className="h-3" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Safety Recommendations:</p>
                    <ul className="space-y-1">
                      {riskResult.suggestions.slice(0, 3).map((suggestion, index) => (
                        <li key={index} className="text-xs flex items-start space-x-2">
                          <span className="text-safety-orange mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Link to="/risk-prediction">
                  <Button variant="outline" className="w-full group">
                    See detailed prediction analysis
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
                    <span className="text-sm truncate">Chemical handling with PPE</span>
                    <Badge className="bg-risk-medium text-white">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm truncate">Office desk work</span>
                    <Badge className="bg-risk-low text-white">Low</Badge>
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
              <div className="text-2xl font-bold text-primary">324</div>
              <p className="text-sm text-muted-foreground">Safety Queries Answered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-safety-orange">67</div>
              <p className="text-sm text-muted-foreground">Risk Assessments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-risk-low">92%</div>
              <p className="text-sm text-muted-foreground">Safety Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">28</div>
              <p className="text-sm text-muted-foreground">Days Incident-Free</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
