import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Target, Zap, Clock, Award, Lightbulb } from 'lucide-react';

interface PricePoint {
  timestamp: number;
  yesPrice: number;
  noPrice: number;
  volume: number;
  probability: number;
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
  category: 'growth' | 'revenue' | 'users' | 'product';
  deadline: Date;
  priceHistory: PricePoint[];
  status: 'active' | 'resolved' | 'expired';
  resolution?: 'yes' | 'no';
}

interface Trade {
  id: string;
  marketId: string;
  user: string;
  userRole: 'sponsor' | 'responsible' | 'accountable' | 'consulted' | 'informed';
  type: 'yes' | 'no';
  amount: number;
  price: number;
  timestamp: Date;
  confidence: number;
}

interface Agent {
  id: string;
  name: string;
  role: 'responsible' | 'accountable' | 'consulted' | 'informed';
  avatar: string;
  balance: number;
  expertise: string[];
  confidence: number;
  color: string;
}

const MOCK_AGENTS: Agent[] = [
  {
    id: 'alex',
    name: 'Alex Chen',
    role: 'responsible',
    avatar: '👨‍💼',
    balance: 500,
    expertise: ['LinkedIn', 'Social Media', 'Content Marketing'],
    confidence: 0.85,
    color: 'hsl(var(--primary))'
  },
  {
    id: 'sarah',
    name: 'Sarah Kim',
    role: 'accountable',
    avatar: '👩‍💼',
    balance: 750,
    expertise: ['Analytics', 'Growth Hacking', 'SEO'],
    confidence: 0.92,
    color: 'hsl(142, 76%, 36%)'
  },
  {
    id: 'mike',
    name: 'Mike Torres',
    role: 'consulted',
    avatar: '👨‍🎓',
    balance: 300,
    expertise: ['Design', 'UX', 'Brand Strategy'],
    confidence: 0.78,
    color: 'hsl(217, 91%, 60%)'
  }
];

const MarketSimulation = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [currentAgent, setCurrentAgent] = useState<Agent>(MOCK_AGENTS[0]);
  const [autoTrading, setAutoTrading] = useState(false);

  // Enhanced AMM pricing using logarithmic market scoring rule
  const calculatePrice = useCallback((yesShares: number, noShares: number, type: 'yes' | 'no'): number => {
    const total = yesShares + noShares;
    const basePrice = type === 'yes' ? yesShares / total : noShares / total;
    
    // Add liquidity sensitivity
    const liquidityFactor = Math.max(0.1, Math.min(10, total / 100));
    const adjustedPrice = Math.max(0.01, Math.min(0.99, basePrice * liquidityFactor));
    
    return adjustedPrice;
  }, []);

  const calculateProbability = useCallback((yesShares: number, noShares: number): number => {
    return (yesShares / (yesShares + noShares)) * 100;
  }, []);

  const createMarket = useCallback((title: string, description: string, sponsorStake: number, category: Market['category']) => {
    const now = new Date();
    const initialYesShares = 100;
    const initialNoShares = 100 + sponsorStake * 2; // Sponsor's stake amplifies NO shares
    
    const newMarket: Market = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      sponsor: 'Sponsor Co.',
      sponsorStake,
      yesShares: initialYesShares,
      noShares: initialNoShares,
      yesPrice: calculatePrice(initialYesShares, initialNoShares, 'yes'),
      noPrice: calculatePrice(initialYesShares, initialNoShares, 'no'),
      totalVolume: sponsorStake,
      participants: ['Sponsor Co.'],
      createdAt: now,
      category,
      deadline: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
      priceHistory: [{
        timestamp: now.getTime(),
        yesPrice: calculatePrice(initialYesShares, initialNoShares, 'yes'),
        noPrice: calculatePrice(initialYesShares, initialNoShares, 'no'),
        volume: sponsorStake,
        probability: calculateProbability(initialYesShares, initialNoShares)
      }],
      status: 'active'
    };

    setMarkets(prev => [...prev, newMarket]);
    
    // Record sponsor's initial trade
    const sponsorTrade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      marketId: newMarket.id,
      user: 'Sponsor Co.',
      userRole: 'sponsor',
      type: 'no',
      amount: sponsorStake,
      price: newMarket.noPrice,
      timestamp: now,
      confidence: 1.0
    };
    
    setTrades(prev => [...prev, sponsorTrade]);
  }, [calculatePrice, calculateProbability]);

  const placeTrade = useCallback((marketId: string, type: 'yes' | 'no', amount: number, agent: Agent) => {
    const now = new Date();
    
    setMarkets(prev => prev.map(market => {
      if (market.id !== marketId) return market;

      const sharesChange = amount * 10; // Convert dollar amount to shares
      const newYesShares = type === 'yes' ? market.yesShares + sharesChange : market.yesShares;
      const newNoShares = type === 'no' ? market.noShares + sharesChange : market.noShares;
      
      const newYesPrice = calculatePrice(newYesShares, newNoShares, 'yes');
      const newNoPrice = calculatePrice(newYesShares, newNoShares, 'no');
      const newProbability = calculateProbability(newYesShares, newNoShares);
      
      const updatedMarket = {
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
          probability: newProbability
        }]
      };

      return updatedMarket;
    }));

    // Record the trade
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
      confidence: agent.confidence
    };
    
    setTrades(prev => [...prev, newTrade]);
  }, [calculatePrice, calculateProbability, markets]);

  // Auto-trading simulation
  useEffect(() => {
    if (!autoTrading || markets.length === 0) return;

    const interval = setInterval(() => {
      const randomMarket = markets[Math.floor(Math.random() * markets.length)];
      const randomAgent = MOCK_AGENTS[Math.floor(Math.random() * MOCK_AGENTS.length)];
      const randomType = Math.random() > 0.6 ? 'yes' : 'no'; // Bias towards yes
      const randomAmount = Math.floor(Math.random() * 50) + 10;
      
      placeTrade(randomMarket.id, randomType, randomAmount, randomAgent);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoTrading, markets, placeTrade]);

  const [newMarketTitle, setNewMarketTitle] = useState('');
  const [newMarketDescription, setNewMarketDescription] = useState('');
  const [sponsorStake, setSponsorStake] = useState(1000);
  const [marketCategory, setMarketCategory] = useState<Market['category']>('growth');
  const [tradeAmount, setTradeAmount] = useState(25);

  const handleCreateMarket = () => {
    if (newMarketTitle && newMarketDescription && sponsorStake > 0) {
      createMarket(newMarketTitle, newMarketDescription, sponsorStake, marketCategory);
      setNewMarketTitle('');
      setNewMarketDescription('');
      setSponsorStake(1000);
    }
  };

  const selectedMarketData = markets.find(m => m.id === selectedMarket);
  const marketTrades = trades.filter(t => t.marketId === selectedMarket).slice(-10);

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

  const getCategoryIcon = (category: Market['category']) => {
    switch (category) {
      case 'growth': return <TrendingUp className="w-4 h-4" />;
      case 'revenue': return <DollarSign className="w-4 h-4" />;
      case 'users': return <Users className="w-4 h-4" />;
      case 'product': return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'responsible': return 'bg-blue-500';
      case 'accountable': return 'bg-green-500';
      case 'consulted': return 'bg-purple-500';
      case 'informed': return 'bg-orange-500';
      case 'sponsor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Live Demo
          </Badge>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            ARLOS Market Simulation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience how sponsors create outcome markets and agents participate through prediction trading. 
            Watch real-time price discovery as different ARLOS roles contribute their expertise.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={autoTrading ? "default" : "outline"}
              onClick={() => setAutoTrading(!autoTrading)}
              className="animate-pulse"
            >
              <Activity className="w-4 h-4 mr-2" />
              {autoTrading ? 'Auto Trading ON' : 'Enable Auto Trading'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="create">Create Market</TabsTrigger>
            <TabsTrigger value="trade">Active Markets</TabsTrigger>
            <TabsTrigger value="analyze">Market Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Create New Market (Sponsor)
                  </CardTitle>
                  <CardDescription>
                    Set your maximum willingness to pay for the outcome. This creates initial market conditions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Market title (e.g., 'Reach 10K LinkedIn followers in 10 weeks')"
                    value={newMarketTitle}
                    onChange={(e) => setNewMarketTitle(e.target.value)}
                    className="text-base"
                  />
                  <Input
                    placeholder="Market description and success criteria"
                    value={newMarketDescription}
                    onChange={(e) => setNewMarketDescription(e.target.value)}
                    className="text-base"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <select 
                        value={marketCategory}
                        onChange={(e) => setMarketCategory(e.target.value as Market['category'])}
                        className="w-full p-2 border rounded-md bg-background"
                      >
                        <option value="growth">Growth</option>
                        <option value="revenue">Revenue</option>
                        <option value="users">Users</option>
                        <option value="product">Product</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your maximum stake:</label>
                      <Input
                        type="number"
                        value={sponsorStake}
                        onChange={(e) => setSponsorStake(Number(e.target.value))}
                        className="text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>How it works:</strong> Your stake goes to betting on "NO", which makes "YES" shares cheaper. 
                      Agents who believe they can help achieve the outcome will buy these cheap "YES" shares.
                    </p>
                  </div>
                  
                  <Button onClick={handleCreateMarket} className="w-full hover-scale">
                    Create Market
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    ARLOS Agents
                  </CardTitle>
                  <CardDescription>
                    Select your role and agent persona for trading
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {MOCK_AGENTS.map(agent => (
                    <div 
                      key={agent.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        currentAgent.id === agent.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setCurrentAgent(agent)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{agent.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{agent.name}</h3>
                            <Badge variant="outline" className={`text-xs ${getRoleColor(agent.role)} text-white`}>
                              {agent.role}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${agent.balance} • {agent.expertise.join(', ')}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="text-xs">Confidence:</div>
                            <Progress value={agent.confidence * 100} className="w-16 h-2" />
                            <div className="text-xs">{Math.round(agent.confidence * 100)}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trade" className="space-y-6">
            {markets.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No markets created yet</h3>
                  <p className="text-muted-foreground">Create your first market to start trading!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {markets.map(market => {
                  const probability = calculateProbability(market.yesShares, market.noShares);
                  const isHot = market.totalVolume > 500;
                  
                  return (
                    <Card 
                      key={market.id} 
                      className={`hover-scale transition-all ${isHot ? 'ring-2 ring-primary/20 shadow-lg' : ''}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(market.category)}
                            <Badge variant="outline" className="text-xs">
                              {market.category}
                            </Badge>
                            {isHot && <Badge className="text-xs animate-pulse">🔥 Hot</Badge>}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">${market.totalVolume}</div>
                            <div className="text-xs text-muted-foreground">volume</div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm leading-tight">{market.title}</h3>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Probability</span>
                            <span>{probability.toFixed(1)}%</span>
                          </div>
                          <Progress value={probability} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border">
                            <div className="text-xs font-medium text-green-700 dark:text-green-400">YES</div>
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              ${(market.yesPrice * 100).toFixed(0)}¢
                            </div>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border">
                            <div className="text-xs font-medium text-red-700 dark:text-red-400">NO</div>
                            <div className="text-lg font-bold text-red-600 dark:text-red-400">
                              ${(market.noPrice * 100).toFixed(0)}¢
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={tradeAmount}
                            onChange={(e) => setTradeAmount(Number(e.target.value))}
                            className="flex-1 text-sm"
                            placeholder="$"
                          />
                          <Button
                            size="sm"
                            onClick={() => placeTrade(market.id, 'yes', tradeAmount, currentAgent)}
                            className="bg-green-600 hover:bg-green-700 text-xs px-3"
                          >
                            YES
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => placeTrade(market.id, 'no', tradeAmount, currentAgent)}
                            className="bg-red-600 hover:bg-red-700 text-xs px-3"
                          >
                            NO
                          </Button>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMarket(market.id)}
                          className="w-full text-xs"
                        >
                          <Activity className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analyze" className="space-y-6">
            {selectedMarketData ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        {selectedMarketData.title}
                      </CardTitle>
                      <CardDescription>Price Movement & Probability Over Time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {chartData.length > 1 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: any, name: string) => [
                                `${value.toFixed(1)}${name === 'probability' ? '%' : '¢'}`, 
                                name === 'probability' ? 'Probability' : name === 'yesPrice' ? 'YES Price' : 'NO Price'
                              ]}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="probability" 
                              stroke="hsl(var(--primary))" 
                              fill="hsl(var(--primary)/0.2)"
                              strokeWidth={2}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="yesPrice" 
                              stroke="#10b981" 
                              strokeWidth={2}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="noPrice" 
                              stroke="#ef4444" 
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-300 flex items-center justify-center text-muted-foreground">
                          Not enough data for chart. Make some trades to see price movements!
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Trading Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {marketTrades.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No trades yet</p>
                      ) : (
                        <div className="space-y-3">
                          {marketTrades.reverse().map(trade => (
                            <div key={trade.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full ${getRoleColor(trade.userRole)} flex items-center justify-center text-white text-xs font-bold`}>
                                  {trade.userRole[0].toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{trade.user}</div>
                                  <div className="text-xs text-muted-foreground">{trade.userRole}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <Badge variant={trade.type === 'yes' ? 'default' : 'secondary'} className="text-xs">
                                    {trade.type.toUpperCase()}
                                  </Badge>
                                  <span className="font-medium">${trade.amount}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {trade.timestamp.toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Market Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Sponsor Stake</div>
                          <div className="font-semibold text-lg">${selectedMarketData.sponsorStake}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Total Volume</div>
                          <div className="font-semibold text-lg">${selectedMarketData.totalVolume}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Participants</div>
                          <div className="font-semibold text-lg">{selectedMarketData.participants.length}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Trades</div>
                          <div className="font-semibold text-lg">{marketTrades.length}</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="text-muted-foreground text-sm mb-2">Current Probability</div>
                        <div className="text-2xl font-bold text-primary">
                          {calculateProbability(selectedMarketData.yesShares, selectedMarketData.noShares).toFixed(1)}%
                        </div>
                        <Progress 
                          value={calculateProbability(selectedMarketData.yesShares, selectedMarketData.noShares)} 
                          className="mt-2" 
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Participants by Role</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {['responsible', 'accountable', 'consulted', 'informed', 'sponsor'].map(role => {
                          const roleTrades = marketTrades.filter(t => t.userRole === role);
                          const roleVolume = roleTrades.reduce((sum, t) => sum + t.amount, 0);
                          
                          return (
                            <div key={role} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${getRoleColor(role)}`} />
                                <span className="text-sm capitalize">{role}</span>
                              </div>
                              <div className="text-sm font-medium">${roleVolume}</div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Activity className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a market to analyze</h3>
                  <p className="text-muted-foreground">Choose a market from the trading tab to see detailed analytics</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <Card className="mt-12 bg-gradient-to-r from-muted/50 to-muted/30">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4">How ARLOS Markets Work</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This simulation demonstrates how different roles in the ARLOS framework create value through market mechanisms
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-card rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">S</div>
                <h4 className="font-semibold text-primary mb-2">1. Sponsor Stakes</h4>
                <p className="text-sm text-muted-foreground">Sponsor bets on "NO" outcome, making "YES" shares cheaper for agents who can deliver</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">R</div>
                <h4 className="font-semibold text-primary mb-2">2. Responsible Acts</h4>
                <p className="text-sm text-muted-foreground">Agents with expertise buy cheap "YES" shares, signaling confidence in delivery</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">A</div>
                <h4 className="font-semibold text-primary mb-2">3. Market Discovers</h4>
                <p className="text-sm text-muted-foreground">Price movements reflect collective intelligence about outcome probability</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">$</div>
                <h4 className="font-semibold text-primary mb-2">4. Outcome Resolves</h4>
                <p className="text-sm text-muted-foreground">If successful, sponsor "loses" money but gains valued outcome</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MarketSimulation;