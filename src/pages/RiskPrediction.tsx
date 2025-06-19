
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface HIRARCResult {
  hazardType: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  riskColor: string;
  controlMeasures: string[];
}

const RiskPrediction = () => {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState<HIRARCResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeWithHIRARC = (scenario: string): HIRARCResult => {
    const lowerScenario = scenario.toLowerCase();
    
    // Hazard Identification
    let hazardType = 'General Workplace Hazard';
    let likelihood = 2;
    let severity = 2;
    let controlMeasures: string[] = [];

    // Work at Height Hazards
    if (lowerScenario.includes('ladder') || lowerScenario.includes('height') || lowerScenario.includes('roof') || lowerScenario.includes('scaffolding')) {
      hazardType = 'Fall from Height';
      
      // Assess likelihood
      if (lowerScenario.includes('without harness') || lowerScenario.includes('no safety') || lowerScenario.includes('wet') || lowerScenario.includes('windy')) {
        likelihood = 4; // Likely
      } else if (lowerScenario.includes('proper') || lowerScenario.includes('safety equipment')) {
        likelihood = 2; // Unlikely
      } else {
        likelihood = 3; // Possible
      }
      
      // Assess severity
      if (lowerScenario.includes('high') || lowerScenario.includes('story') || lowerScenario.includes('floor')) {
        severity = 4; // Major
      } else {
        severity = 3; // Moderate
      }
      
      controlMeasures = [
        'Use proper fall protection equipment (harness, lanyard)',
        'Inspect all equipment before use',
        'Ensure stable ladder positioning (4:1 rule)',
        'Maintain three points of contact',
        'Use spotters and barriers',
        'Check weather conditions'
      ];
    }
    
    // Electrical Hazards
    else if (lowerScenario.includes('electrical') || lowerScenario.includes('wiring') || lowerScenario.includes('power') || lowerScenario.includes('voltage')) {
      hazardType = 'Electrical Shock/Electrocution';
      
      if (lowerScenario.includes('live') || lowerScenario.includes('energized') || lowerScenario.includes('wet')) {
        likelihood = 4;
        severity = 5; // Catastrophic
      } else if (lowerScenario.includes('lockout') || lowerScenario.includes('isolated')) {
        likelihood = 1;
        severity = 3;
      } else {
        likelihood = 3;
        severity = 4;
      }
      
      controlMeasures = [
        'Implement lockout/tagout procedures',
        'Use insulated tools and PPE',
        'Test circuits before work',
        'Maintain safe distances from live parts',
        'Ensure proper grounding',
        'Use qualified electricians only'
      ];
    }
    
    // Chemical Hazards
    else if (lowerScenario.includes('chemical') || lowerScenario.includes('acid') || lowerScenario.includes('solvent') || lowerScenario.includes('toxic')) {
      hazardType = 'Chemical Exposure';
      
      if (lowerScenario.includes('without ppe') || lowerScenario.includes('no ventilation') || lowerScenario.includes('spill')) {
        likelihood = 4;
        severity = 4;
      } else if (lowerScenario.includes('proper ppe') || lowerScenario.includes('ventilation')) {
        likelihood = 2;
        severity = 3;
      } else {
        likelihood = 3;
        severity = 3;
      }
      
      controlMeasures = [
        'Use appropriate respiratory protection',
        'Wear chemical-resistant gloves and clothing',
        'Ensure adequate ventilation',
        'Have emergency eyewash/shower available',
        'Store chemicals properly',
        'Train workers on SDS information'
      ];
    }
    
    // Fire Hazards
    else if (lowerScenario.includes('fire') || lowerScenario.includes('flammable') || lowerScenario.includes('hot work') || lowerScenario.includes('welding')) {
      hazardType = 'Fire/Explosion';
      
      if (lowerScenario.includes('flammable') && lowerScenario.includes('without permit')) {
        likelihood = 4;
        severity = 5;
      } else if (lowerScenario.includes('fire watch') || lowerScenario.includes('permit')) {
        likelihood = 2;
        severity = 4;
      } else {
        likelihood = 3;
        severity = 4;
      }
      
      controlMeasures = [
        'Obtain hot work permits',
        'Remove flammable materials from area',
        'Have fire extinguisher readily available',
        'Assign fire watch personnel',
        'Check area 30 minutes after work completion',
        'Ensure proper ventilation'
      ];
    }
    
    // Machinery Hazards
    else if (lowerScenario.includes('machinery') || lowerScenario.includes('equipment') || lowerScenario.includes('moving parts')) {
      hazardType = 'Mechanical Injury';
      
      if (lowerScenario.includes('without guard') || lowerScenario.includes('broken') || lowerScenario.includes('maintenance')) {
        likelihood = 4;
        severity = 4;
      } else if (lowerScenario.includes('proper guard') || lowerScenario.includes('safety')) {
        likelihood = 2;
        severity = 3;
      } else {
        likelihood = 3;
        severity = 3;
      }
      
      controlMeasures = [
        'Ensure all machine guards are in place',
        'Implement lockout/tagout procedures',
        'Provide proper training on equipment use',
        'Conduct regular maintenance and inspections',
        'Use appropriate PPE',
        'Keep work area clean and well-lit'
      ];
    }
    
    // Confined Space Hazards
    else if (lowerScenario.includes('confined space') || lowerScenario.includes('tank') || lowerScenario.includes('vessel')) {
      hazardType = 'Confined Space Entry';
      
      if (lowerScenario.includes('without permit') || lowerScenario.includes('no ventilation') || lowerScenario.includes('alone')) {
        likelihood = 4;
        severity = 5;
      } else if (lowerScenario.includes('permit') && lowerScenario.includes('attendant')) {
        likelihood = 2;
        severity = 4;
      } else {
        likelihood = 3;
        severity = 4;
      }
      
      controlMeasures = [
        'Obtain confined space entry permit',
        'Test atmosphere before and during entry',
        'Provide continuous mechanical ventilation',
        'Station trained attendant outside',
        'Use appropriate respiratory protection',
        'Establish emergency rescue procedures'
      ];
    }
    
    // Manual Handling
    else if (lowerScenario.includes('lifting') || lowerScenario.includes('carrying') || lowerScenario.includes('heavy')) {
      hazardType = 'Musculoskeletal Injury';
      
      if (lowerScenario.includes('heavy') || lowerScenario.includes('awkward') || lowerScenario.includes('repetitive')) {
        likelihood = 3;
        severity = 2;
      } else {
        likelihood = 2;
        severity = 2;
      }
      
      controlMeasures = [
        'Use mechanical lifting aids when possible',
        'Get help for heavy or awkward loads',
        'Keep load close to body',
        'Bend knees, not back',
        'Avoid twisting while lifting',
        'Take regular breaks for repetitive tasks'
      ];
    }

    // Calculate risk score and level
    const riskScore = likelihood * severity;
    let riskLevel: 'Low' | 'Medium' | 'High';
    let riskColor: string;

    if (riskScore >= 15) {
      riskLevel = 'High';
      riskColor = 'bg-red-500';
    } else if (riskScore >= 5) {
      riskLevel = 'Medium';
      riskColor = 'bg-yellow-500';
    } else {
      riskLevel = 'Low';
      riskColor = 'bg-green-500';
    }

    return {
      hazardType,
      likelihood,
      severity,
      riskScore,
      riskLevel,
      riskColor,
      controlMeasures
    };
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenario.trim()) return;

    setIsLoading(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = analyzeWithHIRARC(scenario);
    setResult(analysis);
    setIsLoading(false);
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
          <h1 className="text-3xl font-bold text-primary mb-2">HIRARC Risk Assessment</h1>
          <p className="text-muted-foreground">
            Hazard Identification, Risk Assessment & Risk Control analysis for workplace scenarios
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Workplace Scenario Analysis</CardTitle>
            <CardDescription>
              Describe the workplace situation for comprehensive HIRARC analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePredict} className="space-y-4">
              <Textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Example: A maintenance worker needs to replace a light fixture 15 feet above the factory floor using a ladder without proper fall protection equipment..."
                className="min-h-32 resize-none"
                required
              />
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-safety-orange hover:bg-safety-orange/90"
                disabled={isLoading || !scenario.trim()}
              >
                {isLoading ? 'Analyzing with HIRARC...' : 'Analyze Risk'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* HIRARC Results */}
        {(result || isLoading) && (
          <div className="space-y-6 animate-fade-in">
            {isLoading ? (
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Performing HIRARC analysis...</p>
                </CardContent>
              </Card>
            ) : result && (
              <>
                {/* Hazard Identification */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Hazard Identification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold text-primary">
                      {result.hazardType}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{result.likelihood}</div>
                        <p className="text-sm text-muted-foreground">Likelihood</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {result.likelihood === 1 ? 'Inconceivable' : 
                           result.likelihood === 2 ? 'Unlikely' :
                           result.likelihood === 3 ? 'Possible' :
                           result.likelihood === 4 ? 'Likely' : 'Most Likely'}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-safety-orange">{result.severity}</div>
                        <p className="text-sm text-muted-foreground">Severity</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {result.severity === 1 ? 'Negligible' : 
                           result.severity === 2 ? 'Minor' :
                           result.severity === 3 ? 'Moderate' :
                           result.severity === 4 ? 'Major' : 'Catastrophic'}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <Badge className={`${result.riskColor} text-white text-lg px-4 py-2 mb-2`}>
                          <div className="flex items-center space-x-2">
                            {getRiskIcon(result.riskLevel)}
                            <span>{result.riskScore}</span>
                          </div>
                        </Badge>
                        <p className="text-sm text-muted-foreground">Risk Score</p>
                        <p className="text-xs font-semibold">{result.riskLevel} Risk</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Control Measures */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Risk Control Measures</CardTitle>
                    <CardDescription>
                      Recommended actions based on {result.riskLevel.toLowerCase()} risk level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.controlMeasures.map((measure, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                          <span className="text-sm">{measure}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {result.riskLevel === 'High' && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-semibold text-red-800">
                          ⚠️ HIGH RISK: Immediate action required. Stop work until proper controls are implemented.
                        </p>
                      </div>
                    )}
                    
                    {result.riskLevel === 'Medium' && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-semibold text-yellow-800">
                          ⚡ MEDIUM RISK: Planned control measures required before proceeding.
                        </p>
                      </div>
                    )}
                    
                    {result.riskLevel === 'Low' && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-semibold text-green-800">
                          ✓ LOW RISK: Acceptable with monitoring and basic precautions.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Sample Scenarios */}
        {!result && !isLoading && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sample Workplace Scenarios</CardTitle>
              <CardDescription>
                Click on these examples to see HIRARC analysis in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Working on a ladder 12 feet high to clean windows without safety harness in windy conditions",
                  "Electrical maintenance on live 480V panel without lockout/tagout procedures",
                  "Handling sulfuric acid without proper PPE in poorly ventilated area",
                  "Hot work welding near flammable materials without fire watch",
                  "Operating metal cutting machine with damaged safety guard",
                  "Confined space entry into storage tank without permit or attendant"
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
