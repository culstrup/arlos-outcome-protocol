import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, DollarSign, Clock, Users, Target, TrendingUp, Eye, Award, Scale } from 'lucide-react';

interface StoryStep {
  id: number;
  title: string;
  description: string;
  actor: string;
  motivation: string;
  action: string;
  outcome: string;
  visual: React.ReactNode;
  isActive: boolean;
}

const ARLOSStoryFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [sponsorStake] = useState(10000);
  const [marketProgress, setMarketProgress] = useState(0);
  const [participantCount, setParticipantCount] = useState(1);

  const storySteps: StoryStep[] = [
    {
      id: 0,
      title: "The Sponsor's Dilemma",
      description: "A sponsor wants to reach 10,000 LinkedIn followers in 10 weeks but lacks time to execute personally",
      actor: "Sponsor",
      motivation: "More money than time - outcome is worth more than the cost",
      action: "Creates a prediction market and bets maximum willingness to pay on 'NO'",
      outcome: "Makes 'YES' shares extremely cheap for potential agents",
      visual: (
        <div className="flex items-center justify-center space-x-4 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
              S
            </div>
            <div className="text-sm font-medium">Sponsor</div>
            <div className="text-xs text-muted-foreground">Has: ${sponsorStake.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Wants: 10K followers</div>
          </div>
          <ChevronRight className="text-muted-foreground" />
          <div className="text-center">
            <Clock className="w-8 h-8 mx-auto text-orange-500 mb-2" />
            <div className="text-sm">Time Constraint</div>
            <div className="text-xs text-muted-foreground">Only 10 weeks</div>
          </div>
        </div>
      ),
      isActive: true
    },
    {
      id: 1,
      title: "Market Creation",
      description: "Sponsor deploys their stake to bias the market, making success shares cheap",
      actor: "Market Mechanism",
      motivation: "Automated market maker responds to initial liquidity",
      action: "Sponsor's $10,000 bet on 'NO' creates cheap 'YES' shares (~$0.15 each)",
      outcome: "Economic incentive created for agents who believe they can help",
      visual: (
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
            <div className="text-2xl font-bold text-red-600">NO</div>
            <div className="text-sm">$0.85</div>
            <div className="text-xs text-muted-foreground">Sponsor bet: ${sponsorStake.toLocaleString()}</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="text-2xl font-bold text-green-600">YES</div>
            <div className="text-sm">$0.15</div>
            <div className="text-xs text-muted-foreground">Cheap for agents</div>
          </div>
        </div>
      ),
      isActive: false
    },
    {
      id: 2,
      title: "Private Network First",
      description: "Market initially shared within sponsor's trusted private network",
      actor: "Trusted Network",
      motivation: "Early access to opportunity before public launch",
      action: "Curated agents evaluate the opportunity and buy initial 'YES' shares",
      outcome: "Price discovery begins within trusted circle",
      visual: (
        <div className="flex items-center justify-center space-x-2 p-6">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            ))}
          </div>
          <div className="mx-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xs text-center mt-1">Private</div>
          </div>
        </div>
      ),
      isActive: false
    },
    {
      id: 3,
      title: "Public Market Launch",
      description: "Market goes public with transparent ledger and open participation",
      actor: "Public Network",
      motivation: "Open access creates broader talent pool and price discovery",
      action: "Anyone can view market, buy shares, and contribute to outcome",
      outcome: "Market attracts diverse agents with relevant expertise",
      visual: (
        <div className="space-y-4 p-6">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              PUBLIC LEDGER
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(participantCount + 3)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {participantCount + 3} participants
          </div>
        </div>
      ),
      isActive: false
    },
    {
      id: 4,
      title: "Agent Participation",
      description: "Agents with relevant expertise buy 'YES' shares and take action",
      actor: "ARLOS Agents",
      motivation: "Confident in their ability to help achieve the outcome",
      action: "Purchase cheap 'YES' shares and begin working toward the goal",
      outcome: "Real work begins, market price adjusts based on progress",
      visual: (
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">R</div>
              <span className="text-sm">Responsible Agent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">A</div>
              <span className="text-sm">Accountable Agent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center">C</div>
              <span className="text-sm">Consulted Expert</span>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={marketProgress} className="h-2" />
            <div className="text-sm text-center">Market Confidence: {marketProgress}%</div>
          </div>
        </div>
      ),
      isActive: false
    },
    {
      id: 5,
      title: "Oracle Verification",
      description: "Independent oracles verify outcome achievement through evidence",
      actor: "Oracle Network",
      motivation: "Maintain reputation and earn verification fees",
      action: "Evaluate evidence, consensus mechanism determines resolution",
      outcome: "Market settles based on verified outcome",
      visual: (
        <div className="flex items-center justify-center space-x-4 p-6">
          <div className="text-center">
            <Scale className="w-12 h-12 mx-auto text-orange-500 mb-2" />
            <div className="text-sm font-medium">Oracle Consensus</div>
            <div className="text-xs text-muted-foreground">3 of 5 oracles confirm</div>
          </div>
          <ChevronRight className="text-muted-foreground" />
          <div className="text-center">
            <Award className="w-12 h-12 mx-auto text-green-500 mb-2" />
            <div className="text-sm font-medium">Outcome Verified</div>
            <div className="text-xs text-muted-foreground">Goal achieved!</div>
          </div>
        </div>
      ),
      isActive: false
    },
    {
      id: 6,
      title: "Resolution & Reputation",
      description: "Market settles, participants are rewarded, reputation scores updated",
      actor: "All Participants",
      motivation: "Build reputation for future opportunities",
      action: "Successful agents receive payouts, reputation scores increase",
      outcome: "Network grows stronger with proven track records",
      visual: (
        <div className="grid grid-cols-3 gap-4 p-6">
          <div className="text-center">
            <DollarSign className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <div className="text-sm">Payouts</div>
            <div className="text-xs text-muted-foreground">To YES holders</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <div className="text-sm">Reputation</div>
            <div className="text-xs text-muted-foreground">Scores updated</div>
          </div>
          <div className="text-center">
            <Target className="w-8 h-8 mx-auto text-purple-500 mb-2" />
            <div className="text-sm">Goal</div>
            <div className="text-xs text-muted-foreground">Achieved!</div>
          </div>
        </div>
      ),
      isActive: false
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = (prev + 1) % storySteps.length;
        if (next === 0) setIsAutoPlaying(false); // Stop at end
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, storySteps.length]);

  // Simulate market progress
  useEffect(() => {
    if (currentStep >= 4) {
      const interval = setInterval(() => {
        setMarketProgress(prev => Math.min(100, prev + Math.random() * 10));
        setParticipantCount(prev => Math.min(12, prev + (Math.random() > 0.8 ? 1 : 0)));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const currentStoryStep = storySteps[currentStep];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Eye className="w-3 h-3 mr-1" />
            Visual Story
          </Badge>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            How ARLOS Markets Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Follow the complete journey from sponsor motivation to outcome achievement. 
            See how economic incentives align different actors to achieve shared goals.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={isAutoPlaying ? "default" : "outline"}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? 'Pause Story' : 'Play Story'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep(0);
                setMarketProgress(0);
                setParticipantCount(1);
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Story Progress</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {storySteps.length}
            </span>
          </div>
          <Progress value={(currentStep + 1) / storySteps.length * 100} className="h-2" />
        </div>

        {/* Main story card */}
        <Card className="mb-8 bg-gradient-to-br from-card to-card/80 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                {currentStoryStep.title}
              </CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {currentStoryStep.actor}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg">{currentStoryStep.description}</p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-1">💭 Motivation</h4>
                    <p className="text-blue-800 text-sm">{currentStoryStep.motivation}</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-1">⚡ Action</h4>
                    <p className="text-green-800 text-sm">{currentStoryStep.action}</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-1">🎯 Outcome</h4>
                    <p className="text-purple-800 text-sm">{currentStoryStep.outcome}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm border-2 border-dashed border-muted-foreground/20 rounded-lg">
                  {currentStoryStep.visual}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {storySteps.map((step, index) => (
            <Button
              key={step.id}
              variant={index === currentStep ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentStep(index)}
              className={`p-2 h-auto flex-col ${index === currentStep ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <div className="text-xs font-bold mb-1">{index + 1}</div>
              <div className="text-xs text-center leading-tight">
                {step.title.split(' ').slice(0, 2).join(' ')}
              </div>
            </Button>
          ))}
        </div>

        {/* Key insights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <DollarSign className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="font-bold mb-2">Economic Alignment</h3>
            <p className="text-sm text-muted-foreground">
              All participants are economically incentivized to achieve the shared outcome
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="font-bold mb-2">Decentralized Execution</h3>
            <p className="text-sm text-muted-foreground">
              No central authority needed - market mechanisms coordinate action
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Award className="w-12 h-12 mx-auto text-purple-500 mb-4" />
            <h3 className="font-bold mb-2">Reputation Building</h3>
            <p className="text-sm text-muted-foreground">
              Successful participation builds verifiable reputation for future opportunities
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ARLOSStoryFlow;