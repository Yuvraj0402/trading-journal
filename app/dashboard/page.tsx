"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Minus, DollarSign, PercentIcon, BarChart, PlusCircle } from "lucide-react"
import { TradeStats } from "@/components/trade-stats"
import { DailyProfitLossChart } from "@/components/daily-profit-loss-chart"
import { RecentTrades } from "@/components/recent-trades"
import { useTrades } from "@/hooks/use-trades"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { trades, isLoading } = useTrades()
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,
    averageProfit: 0,
    wins: 0,
    losses: 0,
    breakEven: 0,
  })

  useEffect(() => {
    if (trades.length > 0) {
      const wins = trades.filter((trade) => trade.outcome === "win").length
      const losses = trades.filter((trade) => trade.outcome === "loss").length
      const breakEven = trades.filter((trade) => trade.outcome === "break-even").length

      const totalProfit = trades.reduce((sum, trade) => sum + trade.profitLoss, 0)

      setStats({
        totalTrades: trades.length,
        winRate: trades.length > 0 ? (wins / trades.length) * 100 : 0,
        totalProfit,
        averageProfit: trades.length > 0 ? totalProfit / trades.length : 0,
        wins,
        losses,
        breakEven,
      })
    }
  }, [trades])

  if (isLoading) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track and analyze your trading performance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/add-trade">
            <Button className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Trade
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across {stats.totalTrades} trades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.wins} wins, {stats.losses} losses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Trade</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.averageProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per completed trade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trade Outcomes</CardTitle>
            <div className="flex space-x-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              <Minus className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrades}</div>
            <p className="text-xs text-muted-foreground">
              {stats.wins}W / {stats.losses}L / {stats.breakEven}BE
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="recent">Recent Trades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Daily Profit/Loss</CardTitle>
                <CardDescription>Your trading performance over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DailyProfitLossChart trades={trades} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Your most recent trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTrades trades={trades.slice(0, 5)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Statistics</CardTitle>
              <CardDescription>Detailed breakdown of your trading performance</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <TradeStats trades={trades} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Your most recent trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTrades trades={trades} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
