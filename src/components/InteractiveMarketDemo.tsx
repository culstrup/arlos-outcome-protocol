import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Target, Zap, Clock, Award, Eye, Scale, MessageSquare, Link as LinkIcon } from 'lucide-react';

interface PricePoint {
  timestamp: number;
  yesPrice: number;
  noPrice: number;
  volume: number;
  probability: number;
  event?: string;
}

interface Market {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  sponsorStake: number;
  yesPrice: number;
  noPrice: number;
  yesShares: number;
  noShares: number;
  totalVolume: number;
  participants: string[];
  createdAt: Date;
  deadline: Date;
  priceHistory: PricePoint[];
  status: 'private' | 'public' | 'active' | 'resolved';
  resolution?: 'yes' | 'no';
  linkedContent: ContentItem[];
  accessRequests: AccessRequest[];
  phase: 'creation' | 'private' | 'public' | 'execution' | 'verification' | 'resolved';
}

interface ContentItem {
  id: string;
  title: string;
  type: 'document' | 'strategy' | 'contact' | 'resource';
  sensitivity: 'public' | 'restricted' | 'confidential';
  description: string;
}

interface AccessRequest {
  id: string;
  requester: string;
  contentId: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  timestamp: Date;
}

interface Trade {
  id: string;
  marketId: string;
  user: string;
  userRole: 'sponsor' | 'responsible' | 'accountable' | 'consulted' | 'informed' | 'oracle';
  type: 'yes' | 'no';
  amount: number;
  price: number;
  timestamp: Date;
  confidence: number;
  reasoning: string;
}

interface Agent {
  id: string;
  name: string;
  role: 'responsible' | 'accountable' | 'consulted' | 'informed' | 'oracle';
  avatar: string;
  balance: number;
  expertise: string[];
  reputation: number;
  reputationHistory: number[];
  confidence: number;
  color: string;
  isActive: boolean;
}

const MOCK_AGENTS: Agent[] = [
  {
    id: 'alex',
    name: 'Alex Chen',
    role: 'responsible',
    avatar: '👨‍💼',
    balance: 500,
    expertise: ['LinkedIn Growth', 'Content Strategy', 'B2B Marketing'],
    reputation: 85,
    reputationHistory: [80, 82, 85],
    confidence: 0.92,
    color: 'hsl(217, 91%, 60%)',
    isActive: true
  },
  {
    id: 'sarah',
    name: 'Sarah Kim',
    role: 'accountable',
    avatar: '👩‍💼',
    balance: 750,
    expertise: ['Analytics', 'Growth Metrics', 'Performance Tracking'],
    reputation: 92,
    reputationHistory: [88, 90, 92],
    confidence: 0.88,
    color: 'hsl(142, 76%, 36%)',
    isActive: true
  },
  {
    id: 'mike',
    name: 'Mike Torres',
    role: 'consulted',
    avatar: '👨‍🎓',
    balance: 300,
    expertise: ['Visual Design', 'Brand Strategy', 'Content Creation'],
    reputation: 78,
    reputationHistory: [75, 76, 78],
    confidence: 0.85,
    color: 'hsl(262, 83%, 58%)',
    isActive: false
  },
  {
    id: 'oracle1',
    name: 'Oracle Network',
    role: 'oracle',
    avatar: '⚖️',
    balance: 1000,
    expertise: ['Verification', 'Data Validation', 'Outcome Assessment'],
    reputation: 96,
    reputationHistory: [94, 95, 96],
    confidence: 0.98,
    color: 'hsl(25, 95%, 53%)',
    isActive: true
  }
];

const MOCK_CONTENT: ContentItem[] = [
  {
    id: 'strategy',
    title: 'LinkedIn Growth Strategy Document',
    type: 'strategy',
    sensitivity: 'restricted',
    description: 'Detailed 10-week plan with target demographics and content calendar'
  },
  {
    id: 'contacts',
    title: 'Industry Influencer Contact List',
    type: 'contact',
    sensitivity: 'confidential',
    description: 'Key contacts for collaboration and cross-promotion opportunities'
  },
  {
    id: 'budget',
    title: 'Marketing Budget Allocation',
    type: 'document',
    sensitivity: 'restricted',
    description: 'Approved budget breakdown for content promotion and advertising'
  },
  {
    id: 'guidelines',
    title: 'Brand Guidelines & Voice',
    type: 'resource',
    sensitivity: 'public',
    description: 'Public brand guidelines for consistent messaging'
  }
];

const InteractiveMarketDemo = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [currentAgent, setCurrentAgent] = useState<Agent>(MOCK_AGENTS[0]);
  const [tradeAmount, setTradeAmount] = useState(50);
  const [tradeReasoning, setTradeReasoning] = useState('');
  const [accessReason, setAccessReason] = useState('');
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  // Enhanced AMM pricing
  const calculatePrice = useCallback((yesShares: number, noShares: number, type: 'yes' | 'no'): number => {
    const total = yesShares + noShares;
    if (total === 0) return 0.5;
    
    const basePrice = type === 'yes' ? yesShares / total : noShares / total;
    const liquidityFactor = Math.max(0.1, Math.min(2, total / 500));
    return Math.max(0.01, Math.min(0.99, basePrice * liquidityFactor));
  }, []);

  const calculateProbability = useCallback((yesShares: number, noShares: number): number => {
    const total = yesShares + noShares;
    return total > 0 ? (yesShares / total) * 100 : 50;
  }, []);

  // Create the LinkedIn example market
  const createLinkedInMarket = useCallback(() => {
    const now = new Date();
    const sponsorStake = 10000;
    const initialYesShares = 100;
    const initialNoShares = 100 + sponsorStake * 3; // Heavy bias toward NO
    
    const newMarket: Market = {
      id: 'linkedin-10k',
      title: 'Reach 10,000 LinkedIn Followers in 10 Weeks',
      description: 'Professional services company wants to grow their LinkedIn presence from 2,000 to 10,000 followers within 10 weeks to support lead generation efforts.',
      sponsor: 'TechCorp Solutions',
      sponsorStake,
      yesShares: initialYesShares,
      noShares: initialNoShares,
      yesPrice: calculatePrice(initialYesShares, initialNoShares, 'yes'),
      noPrice: calculatePrice(initialYesShares, initialNoShares, 'no'),
      totalVolume: sponsorStake,
      participants: ['TechCorp Solutions'],
      createdAt: now,
      deadline: new Date(now.getTime() + 10 * 7 * 24 * 60 * 60 * 1000),
      priceHistory: [{
        timestamp: now.getTime(),
        yesPrice: calculatePrice(initialYesShares, initialNoShares, 'yes'),
        noPrice: calculatePrice(initialYesShares, initialNoShares, 'no'),
        volume: sponsorStake,
        probability: calculateProbability(initialYesShares, initialNoShares),
        event: 'Market created'
      }],
      status: 'private',
      linkedContent: MOCK_CONTENT,
      accessRequests: [],
      phase: 'private'
    };

    setMarkets([newMarket]);
    setSelectedMarket(newMarket.id);
    
    // Add sponsor's initial trade
    const sponsorTrade: Trade = {
      id: 'sponsor-initial',
      marketId: newMarket.id,
      user: 'TechCorp Solutions',
      userRole: 'sponsor',
      type: 'no',
      amount: sponsorStake,
      price: newMarket.noPrice,
      timestamp: now,
      confidence: 1.0,
      reasoning: 'Betting against outcome to make YES shares cheap for capable agents'
    };
    
    setTrades([sponsorTrade]);
  }, [calculatePrice, calculateProbability]);

  // Initialize with LinkedIn example
  useEffect(() => {
    createLinkedInMarket();
  }, [createLinkedInMarket]);

  const placeTrade = useCallback((marketId: string, type: 'yes' | 'no', amount: number, agent: Agent, reasoning: string) => {
    const now = new Date();
    
    setMarkets(prev => prev.map(market => {
      if (market.id !== marketId) return market;

      const sharesChange = amount * 5; // Convert dollar amount to shares
      const newYesShares = type === 'yes' ? market.yesShares + sharesChange : market.yesShares;
      const newNoShares = type === 'no' ? market.noShares + sharesChange : market.noShares;
      
      const newYesPrice = calculatePrice(newYesShares, newNoShares, 'yes');
      const newNoPrice = calculatePrice(newYesShares, newNoShares, 'no');
      const newProbability = calculateProbability(newYesShares, newNoShares);
      
      return {
        ...market,
        yesShares: newYesShares,
        noShares: newNoShares,
        yesPrice: newYesPrice,
        noPrice: newNoPrice,
        totalVolume: market.totalVolume + amount,
        participants: market.participants.includes(agent.name) 
          ? market.participants 
          : [...market.participants, agent.name],
        priceHistory: [...market.priceHistory, {
          timestamp: now.getTime(),
          yesPrice: newYesPrice,
          noPrice: newNoPrice,
          volume: market.totalVolume + amount,
          probability: newProbability,
          event: `${agent.name} bought ${type.toUpperCase()} shares`
        }]
      };
    }));

    const newTrade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      marketId,
      user: agent.name,
      userRole: agent.role,
      type,
      amount,
      price: type === 'yes' ? 
        markets.find(m => m.id === marketId)?.yesPrice || 0 : 
        markets.find(m => m.id === marketId)?.noPrice || 0,
      timestamp: now,
      confidence: agent.confidence,
      reasoning
    };
    
    setTrades(prev => [...prev, newTrade]);
  }, [calculatePrice, calculateProbability, markets]);

  const requestContentAccess = useCallback((contentId: string, reason: string) => {
    const newRequest: AccessRequest = {
      id: Math.random().toString(36).substr(2, 9),
      requester: currentAgent.name,
      contentId,
      reason,
      status: 'pending',
      timestamp: new Date()
    };

    setMarkets(prev => prev.map(market => 
      market.id === selectedMarket 
        ? { ...market, accessRequests: [...market.accessRequests, newRequest] }
        : market
    ));
  }, [currentAgent.name, selectedMarket]);

  const advanceMarketPhase = useCallback(() => {
    setMarkets(prev => prev.map(market => {
      if (market.id !== selectedMarket) return market;

      const phases: Market['phase'][] = ['creation', 'private', 'public', 'execution', 'verification', 'resolved'];
      const currentIndex = phases.indexOf(market.phase);
      const nextPhase = phases[Math.min(currentIndex + 1, phases.length - 1)];
      
      let newStatus: Market['status'] = market.status;
      if (nextPhase === 'public' || nextPhase === 'execution') newStatus = 'public';
      if (nextPhase === 'resolved') newStatus = 'resolved';

      return {
        ...market,
        phase: nextPhase,
        status: newStatus
      };
    }));
  }, [selectedMarket]);

  const selectedMarketData = markets.find(m => m.id === selectedMarket);
  const marketTrades = trades.filter(t => t.marketId === selectedMarket).slice(-5);

  const chartData = useMemo(() => {
    if (!selectedMarketData) return [];
    return selectedMarketData.priceHistory.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString(),
      probability: point.probability,
      volume: point.volume,
      yesPrice: point.yesPrice * 100,
      noPrice: point.noPrice * 100
    }));
  }, [selectedMarketData]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'responsible': return 'bg-blue-500';
      case 'accountable': return 'bg-green-500';
      case 'consulted': return 'bg-purple-500';
      case 'informed': return 'bg-orange-500';
      case 'sponsor': return 'bg-red-500';
      case 'oracle': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
      case 'public': return 'bg-green-100 text-green-800 border-green-200';
      case 'restricted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confidential': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!selectedMarketData) {
    return (
      <div className="py-24">
        <div className="container mx-auto px-4 text-center">
          <Button onClick={createLinkedInMarket}>
            Create LinkedIn Growth Market
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Activity className="w-3 h-3 mr-1" />
            Interactive Demo
          </Badge>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            LinkedIn Growth Market Simulation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the complete ARLOS market lifecycle. Trade shares, request access to content, 
            and see how reputation builds through successful outcomes.
          </p>
        </div>

        {/* Market phase indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Market Phase</h3>
            <Button 
              onClick={advanceMarketPhase}
              variant="outline"
              disabled={selectedMarketData.phase === 'resolved'}
            >
              Advance Phase
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            {['private', 'public', 'execution', 'verification', 'resolved'].map((phase, index) => (
              <div 
                key={phase}
                className={`flex-1 p-3 rounded-lg text-center ${
                  selectedMarketData.phase === phase 
                    ? 'bg-primary text-primary-foreground' 
                    : index < ['private', 'public', 'execution', 'verification', 'resolved'].indexOf(selectedMarketData.phase)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                <div className="font-medium capitalize">{phase}</div>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="trade" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="trade">Trading</TabsTrigger>
            <TabsTrigger value="content">Linked Content</TabsTrigger>
            <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
            <TabsTrigger value="reputation">Reputation</TabsTrigger>
          </TabsList>

          <TabsContent value="trade" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Market overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{selectedMarketData.title}</CardTitle>
                  <CardDescription>{selectedMarketData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <div className="text-2xl font-bold text-green-600">YES</div>
                      <div className="text-lg">${(selectedMarketData.yesPrice * 100).toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">per share</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                      <div className="text-2xl font-bold text-red-600">NO</div>
                      <div className="text-lg">${(selectedMarketData.noPrice * 100).toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">per share</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Market Confidence</span>
                        <span>{calculateProbability(selectedMarketData.yesShares, selectedMarketData.noShares).toFixed(1)}%</span>
                      </div>
                      <Progress value={calculateProbability(selectedMarketData.yesShares, selectedMarketData.noShares)} />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold">${selectedMarketData.totalVolume.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Volume</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{selectedMarketData.participants.length}</div>
                        <div className="text-sm text-muted-foreground">Participants</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">
                          {Math.ceil((selectedMarketData.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}d
                        </div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trading interface */}
              <Card>
                <CardHeader>
                  <CardTitle>Place Trade</CardTitle>
                  <CardDescription>Buy shares based on your confidence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Agent</label>
                    <div className="space-y-2">
                      {MOCK_AGENTS.map(agent => (
                        <div 
                          key={agent.id}
                          className={`p-2 rounded border cursor-pointer ${
                            currentAgent.id === agent.id ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                          onClick={() => setCurrentAgent(agent)}
                        >
                          <div className="flex items-center gap-2">
                            <span>{agent.avatar}</span>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{agent.name}</div>
                              <div className="text-xs text-muted-foreground">{agent.role}</div>
                            </div>
                            <Badge variant="outline" className={`text-xs ${getRoleColor(agent.role)} text-white`}>
                              Rep: {agent.reputation}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Trade Amount ($)</label>
                    <Input
                      type="number"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(Number(e.target.value))}
                      min={1}
                      max={currentAgent.balance}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Reasoning</label>
                    <Input
                      placeholder="Why do you think this will succeed/fail?"
                      value={tradeReasoning}
                      onChange={(e) => setTradeReasoning(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => {
                        if (tradeReasoning) {
                          placeTrade(selectedMarketData.id, 'yes', tradeAmount, currentAgent, tradeReasoning);
                          setTradeReasoning('');
                        }
                      }}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!tradeReasoning}
                    >
                      Buy YES
                    </Button>
                    <Button 
                      onClick={() => {
                        if (tradeReasoning) {
                          placeTrade(selectedMarketData.id, 'no', tradeAmount, currentAgent, tradeReasoning);
                          setTradeReasoning('');
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!tradeReasoning}
                    >
                      Buy NO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent trades */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Trading Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketTrades.map(trade => (
                    <div key={trade.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={`${getRoleColor(trade.userRole)} text-white`}>
                          {trade.userRole}
                        </Badge>
                        <div>
                          <div className="font-medium">{trade.user}</div>
                          <div className="text-sm text-muted-foreground">{trade.reasoning}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${trade.type === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                          ${trade.amount} {trade.type.toUpperCase()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {trade.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Linked Content & Resources
                </CardTitle>
                <CardDescription>
                  Content linked to this market. Some may require access approval.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMarketData.linkedContent.map(content => (
                    <div key={content.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{content.title}</h4>
                        <Badge className={getSensitivityColor(content.sensitivity)}>
                          {content.sensitivity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                      
                      {content.sensitivity === 'public' ? (
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View Content
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Input
                            placeholder="Reason for access request..."
                            value={selectedContent === content.id ? accessReason : ''}
                            onChange={(e) => {
                              setSelectedContent(content.id);
                              setAccessReason(e.target.value);
                            }}
                          />
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              if (accessReason) {
                                requestContentAccess(content.id, accessReason);
                                setAccessReason('');
                                setSelectedContent(null);
                              }
                            }}
                            disabled={!accessReason || selectedContent !== content.id}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Request Access
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {selectedMarketData.accessRequests.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Access Requests</h4>
                    <div className="space-y-2">
                      {selectedMarketData.accessRequests.map(request => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">{request.requester}</div>
                            <div className="text-sm text-muted-foreground">{request.reason}</div>
                          </div>
                          <Badge variant={
                            request.status === 'approved' ? 'default' : 
                            request.status === 'denied' ? 'destructive' : 'secondary'
                          }>
                            {request.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price History & Market Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="probability" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary) / 0.2)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reputation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_AGENTS.map(agent => (
                <Card key={agent.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{agent.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge className={`${getRoleColor(agent.role)} text-white text-xs`}>
                          {agent.role}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Reputation</span>
                          <span>{agent.reputation}/100</span>
                        </div>
                        <Progress value={agent.reputation} />
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Expertise</div>
                        <div className="flex flex-wrap gap-1">
                          {agent.expertise.map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="text-muted-foreground">Balance: ${agent.balance}</div>
                        <div className="text-muted-foreground">
                          Status: {agent.isActive ? '🟢 Active' : '🔴 Inactive'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InteractiveMarketDemo;