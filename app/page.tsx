"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowUpRight, ArrowDownRight, Minus, PlusCircle, BarChart3, History, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTrades } from "@/hooks/use-trades"
import { DailyProfitLossChart } from "@/components/daily-profit-loss-chart"
import { RecentTrades } from "@/components/recent-trades"
import { QuickAddTrade } from "@/components/quick-add-trade"

export default function HomePage() {
  const { trades, isLoading } = useTrades()
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,
    todayProfit: 0,
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

      // Calculate today's profit
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayTrades = trades.filter((trade) => {
        const tradeDate = new Date(trade.date)
        tradeDate.setHours(0, 0, 0, 0)
        return tradeDate.getTime() === today.getTime()
      })
      const todayProfit = todayTrades.reduce((sum, trade) => sum + trade.profitLoss, 0)

      setStats({
        totalTrades: trades.length,
        winRate: trades.length > 0 ? (wins / trades.length) * 100 : 0,
        totalProfit,
        todayProfit,
        wins,
        losses,
        breakEven,
      })
    }
  }, [trades])

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Trading Journal</h1>
          <p className="text-muted-foreground mt-1">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" onClick={() => setShowQuickAdd(!showQuickAdd)} className="flex items-center">
            {showQuickAdd ? "Cancel" : "Quick Add"}
            {!showQuickAdd && <PlusCircle className="ml-2 h-4 w-4" />}
          </Button>
          <Link href="/add-trade">
            <Button className="bg-sky-700 hover:bg-sky-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Detailed Trade
            </Button>
          </Link>
        </div>
      </div>

      {showQuickAdd && (
        <Card className="mb-6 border-2 border-sky-900/50">
          <CardHeader className="bg-sky-900/20">
            <CardTitle>Quick Add Trade</CardTitle>
            <CardDescription>Add a basic trade entry quickly</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <QuickAddTrade onComplete={() => setShowQuickAdd(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-gradient-to-br from-sky-900/10 to-slate-800 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Total Profit/Loss</CardDescription>
            <CardTitle className="text-2xl font-bold">₹{stats.totalProfit.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">Across {stats.totalTrades} trades</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sky-900/10 to-slate-800 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Today's Profit/Loss</CardDescription>
            <CardTitle
              className={`text-2xl font-bold ${
                stats.todayProfit > 0 ? "text-green-400" : stats.todayProfit < 0 ? "text-red-400" : ""
              }`}
            >
              ₹{stats.todayProfit.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">{format(new Date(), "MMMM d, yyyy")}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sky-900/10 to-slate-800 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Win Rate</CardDescription>
            <CardTitle className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">
              {stats.wins}W / {stats.losses}L / {stats.breakEven}BE
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sky-900/10 to-slate-800 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Trade Outcomes</CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center">
              {stats.totalTrades}
              <div className="flex space-x-1 ml-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <ArrowDownRight className="h-4 w-4 text-red-500" />
                <Minus className="h-4 w-4 text-yellow-500" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">Total trades recorded</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 mb-6">
        <Card className="md:col-span-4 shadow-md border-sky-900/30">
          <CardHeader className="bg-sky-900/10">
            <div className="flex items-center justify-between">
              <CardTitle>Daily Profit/Loss</CardTitle>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-sky-400">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Your trading performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <DailyProfitLossChart trades={trades} />
          </CardContent>
        </Card>

        <Card className="md:col-span-3 shadow-md border-sky-900/30">
          <CardHeader className="bg-sky-900/10">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Trades</CardTitle>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-sky-400">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Your most recent trading activity</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTrades trades={trades.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/add-trade" className="w-full">
          <Card className="h-full hover:border-sky-700 hover:shadow-md transition-all cursor-pointer">
            <CardHeader>
              <PlusCircle className="h-8 w-8 text-sky-400 mb-2" />
              <CardTitle>Add New Trade</CardTitle>
              <CardDescription>Record a new trade with detailed information</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard" className="w-full">
          <Card className="h-full hover:border-sky-700 hover:shadow-md transition-all cursor-pointer">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-sky-400 mb-2" />
              <CardTitle>View Dashboard</CardTitle>
              <CardDescription>See detailed statistics and analytics</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/history" className="w-full">
          <Card className="h-full hover:border-sky-700 hover:shadow-md transition-all cursor-pointer">
            <CardHeader>
              <History className="h-8 w-8 text-sky-400 mb-2" />
              <CardTitle>Trade History</CardTitle>
              <CardDescription>Browse and search your past trades</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
