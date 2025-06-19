
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MessageSquare, AlertTriangle, ArrowRight, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [quickRisk, setQuickRisk] = useState('');
  const [riskResult, setRiskResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: 'Hello! I\'m your AI Safety Assistant. I can help you with all workplace safety questions including work at height, fire safety, chemical handling, machinery operation, electrical safety, manual handling, confined spaces, PPE requirements, emergency procedures, and much more. What would you like to know?',
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

  // Enhanced comprehensive AI response system
  const getSafetyResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Work at height responses
    if (lowerQuestion.includes('ppe') && (lowerQuestion.includes('height') || lowerQuestion.includes('working at height'))) {
      return "**PPE Required for Working at Height:**\n\n• **Safety Harness**: Full body harness with D-rings, certified to ANSI/OSHA standards\n• **Hard Hat**: Impact-resistant helmet with chin strap\n• **Safety Boots**: Non-slip soles with ankle support\n• **High-Visibility Clothing**: Reflective vest or clothing for visibility\n• **Cut-Resistant Gloves**: For handling materials and ropes\n• **Eye Protection**: Safety glasses or goggles if needed\n\n**Important**: All PPE must be inspected before each use and replaced if damaged. Ensure proper fit and training on correct usage.";
    }
    
    if (lowerQuestion.includes('ladder')) {
      return "**Ladder Safety Guidelines:**\n\n• **4:1 Rule**: For every 4 feet of height, place ladder 1 foot from the wall\n• **Three-Point Contact**: Always maintain contact with ladder using both hands and one foot, or both feet and one hand\n• **Extension**: Ladder should extend 3 feet above the landing point\n• **Weight Limits**: Never exceed the ladder's maximum weight capacity\n• **Inspection**: Check for damage, bent rungs, or loose parts before use\n• **Positioning**: Place on firm, level ground - never on boxes or other objects\n• **Climbing**: Face the ladder when ascending or descending\n• **Work Zone**: Never lean sideways or overreach - move the ladder instead";
    }
    
    if (lowerQuestion.includes('scaffolding')) {
      return "**Scaffolding Safety Requirements:**\n\n• **Assembly**: Must be erected by qualified, trained personnel only\n• **Guardrails**: Required on all open sides 6 feet or higher\n• **Toeboards**: Install 4-inch minimum height toeboards to prevent falling objects\n• **Platform Planking**: Secure, overlap properly, and extend 6-12 inches beyond supports\n• **Access**: Provide safe access points - ladders or stair towers\n• **Inspection**: Daily inspection by competent person before use\n• **Base**: Ensure 10:1 base-to-height ratio for stability\n• **Load Limits**: Never exceed designed load capacity";
    }
    
    // Fire safety responses
    if (lowerQuestion.includes('fire') && (lowerQuestion.includes('extinguisher') || lowerQuestion.includes('suppress'))) {
      return "**Fire Extinguisher Types & Usage:**\n\n**Types:**\n• **Class A**: Water/Foam - for ordinary combustibles (wood, paper, cloth)\n• **Class B**: Foam/CO2 - for flammable liquids (gasoline, oil)\n• **Class C**: CO2/Dry Chemical - for electrical fires\n• **Class D**: Dry Powder - for combustible metals\n• **Class K**: Wet Chemical - for cooking oils and fats\n\n**PASS Method:**\n• **P**ull the pin\n• **A**im at the base of the fire\n• **S**queeze the handle\n• **S**weep from side to side\n\n**Important**: Only fight small fires. If fire is larger than you, evacuate immediately and call emergency services.";
    }
    
    if (lowerQuestion.includes('evacuation') || (lowerQuestion.includes('fire') && lowerQuestion.includes('emergency'))) {
      return "**Fire Evacuation Procedures:**\n\n**Immediate Actions:**\n• Sound the fire alarm immediately\n• Alert others in the area\n• Use nearest safe exit route (NEVER use elevators)\n• Close doors behind you to slow fire spread\n• Stay low if there's smoke\n\n**At Assembly Point:**\n• Proceed directly to designated assembly point\n• Report to your supervisor or safety warden\n• Remain at assembly point until all-clear is given\n• Report anyone missing to emergency responders\n\n**Prevention:**\n• Know all exit routes from your work area\n• Practice evacuation drills monthly\n• Keep exit routes clear of obstructions";
    }
    
    // Chemical safety
    if (lowerQuestion.includes('chemical') || lowerQuestion.includes('hazardous material') || lowerQuestion.includes('spill')) {
      return "**Chemical Safety & Spill Response:**\n\n**Before Handling:**\n• Read Safety Data Sheet (SDS) thoroughly\n• Use appropriate PPE (gloves, goggles, respiratory protection)\n• Ensure adequate ventilation\n• Have spill kit and eyewash station nearby\n\n**Spill Response:**\n• **Evacuate** area immediately if large spill\n• **Alert** others and prevent access to spill area\n• **Contain** spill if safe to do so\n• **Absorb** using appropriate spill kit materials\n• **Dispose** of contaminated materials properly\n• **Report** incident to supervisor immediately\n• **Decontaminate** affected area thoroughly";
    }
    
    // Electrical safety
    if (lowerQuestion.includes('electrical') || lowerQuestion.includes('electricity') || lowerQuestion.includes('lockout')) {
      return "**Electrical Safety Procedures:**\n\n**Lockout/Tagout (LOTO):**\n• Turn off equipment at main switch\n• Lock the switch in OFF position\n• Tag the lock with your name and date\n• Test equipment to ensure it's de-energized\n• Only YOU can remove YOUR lock and tag\n\n**General Safety:**\n• Use insulated tools when working near electrical equipment\n• Wear appropriate PPE (rubber gloves, safety glasses)\n• Never work on live circuits unless absolutely necessary\n• Maintain safe distances from overhead power lines\n• Inspect electrical equipment regularly for damage\n• Report damaged cords, plugs, or equipment immediately";
    }
    
    // Manual handling
    if (lowerQuestion.includes('lifting') || lowerQuestion.includes('manual handling') || lowerQuestion.includes('ergonomic')) {
      return "**Safe Manual Lifting Techniques:**\n\n**Proper Lifting:**\n• **Plan** your lift - check the path and destination\n• **Test** the weight - if it feels too heavy, get help\n• **Position** yourself close to the object\n• **Squat** down keeping your back straight\n• **Grip** the object firmly with both hands\n• **Lift** using your leg muscles, not your back\n• **Keep** the load close to your body\n• **Avoid** twisting while lifting - turn with your feet\n\n**When to Get Help:**\n• Objects over 23kg (50 lbs)\n• Awkward shapes or sizes\n• When you feel tired or have back pain\n• Use mechanical aids (dollies, forklifts) when available";
    }
    
    // Machinery safety
    if (lowerQuestion.includes('machinery') || lowerQuestion.includes('equipment') || lowerQuestion.includes('guard')) {
      return "**Machinery Safety Requirements:**\n\n**Before Operation:**\n• Ensure all safety guards are in place and secure\n• Complete pre-operation inspection checklist\n• Verify emergency stop buttons are functional\n• Check that work area is clean and well-lit\n\n**During Operation:**\n• Never bypass or remove safety devices\n• Keep hands and loose clothing away from moving parts\n• Stay alert and focused on the task\n• Follow lockout/tagout procedures for maintenance\n• Use appropriate PPE for the specific machinery\n\n**Maintenance:**\n• Only qualified personnel should perform maintenance\n• Always use lockout/tagout procedures\n• Report any defects or unusual sounds immediately";
    }
    
    // Confined spaces
    if (lowerQuestion.includes('confined space')) {
      return "**Confined Space Entry Procedures:**\n\n**Before Entry:**\n• Obtain written entry permit\n• Test atmosphere: Oxygen 19.5-23.5%, toxic gases <10% LEL\n• Ensure continuous forced air ventilation\n• Implement lockout/tagout on all energy sources\n• Station trained attendant outside at all times\n\n**Entry Requirements:**\n• Use appropriate respiratory protection\n• Wear gas detection equipment\n• Maintain communication with outside attendant\n• Use retrieval equipment (harness and lifeline)\n• Have rescue procedures ready\n• Never enter alone - work in teams\n\n**Emergency:** If problems occur, attendant calls for help but does NOT enter to rescue";
    }
    
    // PPE general
    if (lowerQuestion.includes('ppe') || lowerQuestion.includes('personal protective equipment')) {
      return "**Personal Protective Equipment (PPE) Guidelines:**\n\n**Selection:**\n• Assess specific workplace hazards first\n• Choose PPE appropriate for the hazard type\n• Ensure proper fit and comfort for the user\n• Consider compatibility with other PPE\n\n**Types:**\n• **Head**: Hard hats for impact and electrical hazards\n• **Eyes/Face**: Safety glasses, goggles, face shields\n• **Hearing**: Earplugs, earmuffs for noise >85dB\n• **Respiratory**: Masks, respirators for airborne hazards\n• **Hands**: Cut-resistant, chemical-resistant gloves\n• **Feet**: Steel-toe boots, slip-resistant soles\n• **Body**: High-vis clothing, chemical suits, aprons\n\n**Remember**: PPE is the LAST line of defense. Always try to eliminate hazards at the source first.";
    }
    
    // Default comprehensive response
    return "I can provide detailed guidance on all workplace safety topics. Here are the main areas I can help with:\n\n• **Work at Height**: Ladders, scaffolding, fall protection, PPE requirements\n• **Fire Safety**: Extinguisher types, evacuation procedures, prevention\n• **Chemical Safety**: Handling, storage, spill response, SDS interpretation\n• **Electrical Safety**: Lockout/tagout, safe work practices, PPE\n• **Manual Handling**: Proper lifting techniques, ergonomics, injury prevention\n• **Machinery Safety**: Guards, maintenance, operating procedures\n• **Confined Spaces**: Entry permits, atmospheric testing, rescue procedures\n• **PPE Selection**: Proper types for specific hazards\n• **Emergency Procedures**: Response plans, first aid, incident reporting\n• **Risk Assessment**: Hazard identification and control measures\n\nPlease ask me a specific question about any of these topics, and I'll provide detailed, practical guidance to keep you safe at work.";
  };

  // HIRARC-based risk prediction system
  const predictRisk = (scenario: string) => {
    const lowerScenario = scenario.toLowerCase();
    let hazardType = 'General Workplace';
    let likelihood = 2;
    let severity = 2;
    let suggestions = [];

    // Identify hazard type and assess likelihood/severity
    if (lowerScenario.includes('height') || lowerScenario.includes('ladder') || lowerScenario.includes('roof') || lowerScenario.includes('scaffolding')) {
      hazardType = 'Work at Height';
      if (lowerScenario.includes('without') && (lowerScenario.includes('harness') || lowerScenario.includes('safety'))) {
        likelihood = 4; severity = 5;
      } else if (lowerScenario.includes('ladder')) {
        likelihood = 3; severity = 4;
      } else {
        likelihood = 2; severity = 4;
      }
      suggestions = ['Use proper fall protection equipment', 'Inspect equipment before use', 'Ensure proper training', 'Maintain three-point contact'];
    }
    else if (lowerScenario.includes('electrical') || lowerScenario.includes('electricity')) {
      hazardType = 'Electrical';
      if (lowerScenario.includes('live') || lowerScenario.includes('without lockout')) {
        likelihood = 4; severity = 5;
      } else if (lowerScenario.includes('wet') || lowerScenario.includes('water')) {
        likelihood = 3; severity = 4;
      } else {
        likelihood = 2; severity = 3;
      }
      suggestions = ['Use lockout/tagout procedures', 'Wear insulated PPE', 'Test circuits before work', 'Keep work area dry'];
    }
    else if (lowerScenario.includes('chemical') || lowerScenario.includes('toxic') || lowerScenario.includes('corrosive')) {
      hazardType = 'Chemical';
      if (lowerScenario.includes('without') && lowerScenario.includes('ppe')) {
        likelihood = 4; severity = 4;
      } else if (lowerScenario.includes('spill') || lowerScenario.includes('leak')) {
        likelihood = 3; severity = 3;
      } else {
        likelihood = 2; severity = 3;
      }
      suggestions = ['Read Safety Data Sheets', 'Use appropriate PPE', 'Ensure proper ventilation', 'Have spill kit ready'];
    }
    else if (lowerScenario.includes('confined space')) {
      hazardType = 'Confined Space';
      if (lowerScenario.includes('without permit') || lowerScenario.includes('no testing')) {
        likelihood = 4; severity = 5;
      } else {
        likelihood = 3; severity = 4;
      }
      suggestions = ['Obtain entry permit', 'Test atmosphere', 'Use continuous ventilation', 'Station attendant outside'];
    }
    else if (lowerScenario.includes('machinery') || lowerScenario.includes('equipment')) {
      hazardType = 'Machinery';
      if (lowerScenario.includes('without guard') || lowerScenario.includes('bypass safety')) {
        likelihood = 4; severity = 4;
      } else {
        likelihood = 2; severity = 3;
      }
      suggestions = ['Ensure all guards in place', 'Follow lockout/tagout', 'Use appropriate PPE', 'Regular maintenance'];
    }
    else if (lowerScenario.includes('fire') || lowerScenario.includes('flame') || lowerScenario.includes('heat')) {
      hazardType = 'Fire';
      if (lowerScenario.includes('flammable') || lowerScenario.includes('explosive')) {
        likelihood = 3; severity = 5;
      } else {
        likelihood = 2; severity = 4;
      }
      suggestions = ['Remove ignition sources', 'Use fire-resistant materials', 'Install fire detection', 'Train on evacuation'];
    }
    else if (lowerScenario.includes('lifting') || lowerScenario.includes('manual handling')) {
      hazardType = 'Manual Handling';
      if (lowerScenario.includes('heavy') || lowerScenario.includes('repetitive')) {
        likelihood = 4; severity = 2;
      } else {
        likelihood = 3; severity = 2;
      }
      suggestions = ['Use proper lifting technique', 'Get help for heavy items', 'Use mechanical aids', 'Take regular breaks'];
    }

    const riskScore = likelihood * severity;
    let riskLevel = 'Low';
    let color = 'bg-green-500';
    
    if (riskScore >= 15) {
      riskLevel = 'High';
      color = 'bg-red-500';
    } else if (riskScore >= 5) {
      riskLevel = 'Medium';
      color = 'bg-yellow-500';
    }

    return {
      hazardType,
      likelihood,
      severity,
      riskScore,
      level: riskLevel,
      color,
      suggestions: suggestions.slice(0, 4)
    };
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
                        className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line ${
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
                Get instant HIRARC-based risk assessment with meter display
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

              {/* Risk Result Display - Meter Style */}
              {riskResult && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg animate-fade-in">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Risk Assessment Result</h3>
                    <Badge variant="outline" className="mb-3">
                      Hazard Type: {riskResult.hazardType}
                    </Badge>
                  </div>
                  
                  {/* Risk Meter Display */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Likelihood:</span>
                      <span className="text-lg font-bold">{riskResult.likelihood}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500" 
                        style={{width: `${(riskResult.likelihood / 5) * 100}%`}}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Severity:</span>
                      <span className="text-lg font-bold">{riskResult.severity}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-orange-500 h-4 rounded-full transition-all duration-500" 
                        style={{width: `${(riskResult.severity / 5) * 100}%`}}
                      ></div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Risk Score:</span>
                        <span className="text-xl font-bold">{riskResult.riskScore}/25</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
                        <div 
                          className={`${riskResult.color} h-6 rounded-full transition-all duration-500 flex items-center justify-center`}
                          style={{width: `${(riskResult.riskScore / 25) * 100}%`}}
                        >
                          <span className="text-white text-sm font-bold">{riskResult.level}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge className={`${riskResult.color} text-white text-lg px-4 py-2`}>
                          {riskResult.level} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Safety Recommendations:</p>
                    <ul className="space-y-1">
                      {riskResult.suggestions.map((suggestion, index) => (
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
                    See detailed HIRARC analysis
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
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
