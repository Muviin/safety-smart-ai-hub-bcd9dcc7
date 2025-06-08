
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskResult {
  level: 'Low' | 'Medium' | 'High';
  percentage: number;
  suggestions: string[];
}

const RiskPrediction = () => {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState<RiskResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenario.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result based on keywords
    const mockResult: RiskResult = scenario.toLowerCase().includes('ladder') || scenario.toLowerCase().includes('height')
      ? {
          level: 'High',
          percentage: 85,
          suggestions: [
            'Ensure proper fall protection equipment is worn',
            'Conduct a pre-work safety briefing',
            'Verify ladder stability and positioning',
            'Maintain three points of contact when climbing',
            'Have a spotter present during work'
          ]
        }
      : scenario.toLowerCase().includes('fire') || scenario.toLowerCase().includes('chemical')
      ? {
          level: 'Medium',
          percentage: 62,
          suggestions: [
            'Verify fire suppression systems are operational',
            'Ensure clear evacuation routes',
            'Check availability of fire extinguishers',
            'Review emergency response procedures',
            'Conduct regular safety drills'
          ]
        }
      : {
          level: 'Low',
          percentage: 28,
          suggestions: [
            'Follow standard safety protocols',
            'Wear appropriate personal protective equipment',
            'Maintain situational awareness',
            'Report any safety concerns immediately'
          ]
        };

    setResult(mockResult);
    setIsLoading(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-risk-high';
      case 'Medium': return 'bg-risk-medium';
      case 'Low': return 'bg-risk-low';
      default: return 'bg-muted';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'High': return <AlertTriangle className="h-5 w-5" />;
      case 'Medium': return <AlertCircle className="h-5 w-5" />;
      case 'Low': return <CheckCircle className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Detailed Risk Prediction</h1>
          <p className="text-muted-foreground">
            Describe a workplace situation to get comprehensive risk assessment and safety recommendations
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Scenario Description</CardTitle>
            <CardDescription>
              Provide detailed information about the workplace situation you want to assess
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePredict} className="space-y-4">
              <Textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Example: A maintenance worker needs to replace a light fixture 15 feet above the factory floor using a ladder. The area has some foot traffic and the floor may be slightly wet from recent cleaning..."
                className="min-h-32 resize-none"
                required
              />
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-safety-orange hover:bg-safety-orange/90"
                disabled={isLoading || !scenario.trim()}
                data-predict="true"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Risk'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {(result || isLoading) && (
          <div className="space-y-6 animate-fade-in">
            {/* Risk Level Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Analyzing scenario...</p>
                  </div>
                ) : result && (
                  <div className="space-y-6">
                    {/* Risk Level Badge */}
                    <div className="text-center">
                      <Badge 
                        className={`${getRiskColor(result.level)} text-white text-lg px-6 py-2 mb-4`}
                      >
                        <div className="flex items-center space-x-2">
                          {getRiskIcon(result.level)}
                          <span>{result.level} Risk</span>
                        </div>
                      </Badge>
                    </div>

                    {/* Risk Percentage */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Risk Level</span>
                        <span className="text-sm font-bold">{result.percentage}%</span>
                      </div>
                      <Progress 
                        value={result.percentage} 
                        className="h-3"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Suggestions */}
            {result && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Safety Recommendations</CardTitle>
                  <CardDescription>
                    Follow these suggestions to minimize risk and ensure safety
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Sample Scenarios */}
        {!result && !isLoading && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sample Scenarios</CardTitle>
              <CardDescription>
                Try these example scenarios to see how the risk prediction works
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Working on a ladder to clean windows on the second floor without safety harness",
                  "Handling chemicals in a poorly ventilated storage room without proper PPE",
                  "Operating machinery with a loose guard rail and no safety training",
                  "Electrical work in a damp environment without proper isolation procedures"
                ].map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 whitespace-normal"
                    onClick={() => setScenario(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default RiskPrediction;
