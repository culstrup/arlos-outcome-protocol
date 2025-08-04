import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
}

interface Trade {
  id: string;
  marketId: string;
  user: string;
  type: 'yes' | 'no';
  amount: number;
  price: number;
  timestamp: Date;
}

const MarketSimulation = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [userBalance] = useState(1000); // Mock balance
  const [currentUser] = useState('Agent1'); // Mock user

  // AMM pricing function (simplified constant product formula)
  const calculatePrice = (yesShares: number, noShares: number, type: 'yes' | 'no') => {
    const k = yesShares * noShares;
    if (type === 'yes') {
      const newYesShares = yesShares + 1;
      const newNoShares = k / newYesShares;
      return noShares - newNoShares;
    } else {
      const newNoShares = noShares + 1;
      const newYesShares = k / newNoShares;
      return yesShares - newYesShares;
    }
  };

  const createMarket = useCallback((title: string, description: string, sponsorStake: number) => {
    const newMarket: Market = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      sponsor: 'Sponsor',
      sponsorStake,
      yesShares: 100, // Initial liquidity
      noShares: 100 + sponsorStake, // Sponsor's stake goes to 'no'
      yesPrice: calculatePrice(100, 100 + sponsorStake, 'yes'),
      noPrice: calculatePrice(100, 100 + sponsorStake, 'no'),
      totalVolume: sponsorStake,
      participants: ['Sponsor']
    };

    setMarkets(prev => [...prev, newMarket]);
    
    // Record sponsor's initial trade
    const sponsorTrade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      marketId: newMarket.id,
      user: 'Sponsor',
      type: 'no',
      amount: sponsorStake,
      price: newMarket.noPrice,
      timestamp: new Date()
    };
    
    setTrades(prev => [...prev, sponsorTrade]);
  }, []);

  const placeTrade = useCallback((marketId: string, type: 'yes' | 'no', amount: number) => {
    setMarkets(prev => prev.map(market => {
      if (market.id !== marketId) return market;

      const newYesShares = type === 'yes' ? market.yesShares + amount : market.yesShares;
      const newNoShares = type === 'no' ? market.noShares + amount : market.noShares;
      
      const updatedMarket = {
        ...market,
        yesShares: newYesShares,
        noShares: newNoShares,
        yesPrice: calculatePrice(newYesShares, newNoShares, 'yes'),
        noPrice: calculatePrice(newYesShares, newNoShares, 'no'),
        totalVolume: market.totalVolume + amount,
        participants: market.participants.includes(currentUser) 
          ? market.participants 
          : [...market.participants, currentUser]
      };

      // Record the trade
      const newTrade: Trade = {
        id: Math.random().toString(36).substr(2, 9),
        marketId,
        user: currentUser,
        type,
        amount,
        price: type === 'yes' ? market.yesPrice : market.noPrice,
        timestamp: new Date()
      };
      
      setTrades(prev => [...prev, newTrade]);

      return updatedMarket;
    }));
  }, [currentUser]);

  const [newMarketTitle, setNewMarketTitle] = useState('');
  const [newMarketDescription, setNewMarketDescription] = useState('');
  const [sponsorStake, setSponsorStake] = useState(100);
  const [tradeAmount, setTradeAmount] = useState(10);

  const handleCreateMarket = () => {
    if (newMarketTitle && newMarketDescription && sponsorStake > 0) {
      createMarket(newMarketTitle, newMarketDescription, sponsorStake);
      setNewMarketTitle('');
      setNewMarketDescription('');
      setSponsorStake(100);
    }
  };

  const selectedMarketData = markets.find(m => m.id === selectedMarket);
  const marketTrades = trades.filter(t => t.marketId === selectedMarket).slice(-5);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            ARLOS Market Simulation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience how sponsors create outcome markets and agents participate through prediction trading
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Creation */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Market (Sponsor)</CardTitle>
              <CardDescription>
                Set your maximum willingness to pay for the outcome
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Market title (e.g., 'Reach 10K LinkedIn followers in 10 weeks')"
                value={newMarketTitle}
                onChange={(e) => setNewMarketTitle(e.target.value)}
              />
              <Input
                placeholder="Market description"
                value={newMarketDescription}
                onChange={(e) => setNewMarketDescription(e.target.value)}
              />
              <div>
                <label className="text-sm font-medium">Your maximum stake (betting on NO):</label>
                <Input
                  type="number"
                  value={sponsorStake}
                  onChange={(e) => setSponsorStake(Number(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This makes YES shares cheaper for agents
                </p>
              </div>
              <Button onClick={handleCreateMarket} className="w-full">
                Create Market
              </Button>
            </CardContent>
          </Card>

          {/* Market Trading */}
          <Card>
            <CardHeader>
              <CardTitle>Active Markets</CardTitle>
              <CardDescription>
                Balance: ${userBalance} | User: {currentUser}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {markets.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No markets created yet. Create one to start trading!
                </p>
              ) : (
                <div className="space-y-4">
                  {markets.map(market => (
                    <div key={market.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{market.title}</h3>
                        <Badge variant="outline">
                          ${market.totalVolume} volume
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {market.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-sm font-medium text-green-700">YES</div>
                          <div className="text-lg font-bold text-green-600">
                            ${market.yesPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <div className="text-sm font-medium text-red-700">NO</div>
                          <div className="text-lg font-bold text-red-600">
                            ${market.noPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={tradeAmount}
                          onChange={(e) => setTradeAmount(Number(e.target.value))}
                          className="flex-1"
                          placeholder="Amount"
                        />
                        <Button
                          size="sm"
                          onClick={() => placeTrade(market.id, 'yes', tradeAmount)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Buy YES
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => placeTrade(market.id, 'no', tradeAmount)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Buy NO
                        </Button>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMarket(market.id)}
                        className="w-full mt-2"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Market Details */}
        {selectedMarketData && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{selectedMarketData.title}</CardTitle>
              <CardDescription>Market Details & Recent Activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Market Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sponsor Stake:</span>
                      <span className="font-medium">${selectedMarketData.sponsorStake}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Volume:</span>
                      <span className="font-medium">${selectedMarketData.totalVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span className="font-medium">{selectedMarketData.participants.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YES Probability:</span>
                      <span className="font-medium">
                        {(selectedMarketData.yesShares / (selectedMarketData.yesShares + selectedMarketData.noShares) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Recent Trades</h4>
                  {marketTrades.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No trades yet</p>
                  ) : (
                    <div className="space-y-2">
                      {marketTrades.map(trade => (
                        <div key={trade.id} className="flex justify-between items-center text-sm">
                          <span>{trade.user}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={trade.type === 'yes' ? 'default' : 'secondary'}>
                              {trade.type.toUpperCase()}
                            </Badge>
                            <span>${trade.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-semibold text-primary mb-2">1. Sponsor Stakes</div>
                <p>Sponsor bets their maximum willingness to pay on "NO", making "YES" shares cheaper</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-semibold text-primary mb-2">2. Agents Trade</div>
                <p>Agents buy cheap "YES" shares if they believe they can help achieve the outcome</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-semibold text-primary mb-2">3. Market Resolves</div>
                <p>If outcome succeeds, sponsor "loses" money but gains the valued outcome</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketSimulation;