"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TradeStats({ trades }) {
  const stats = useMemo(() => {
    if (!trades.length) return null

    const wins = trades.filter((trade) => trade.outcome === "win").length
    const losses = trades.filter((trade) => trade.outcome === "loss").length
    const breakEven = trades.filter((trade) => trade.outcome === "break-even").length

    const winRate = (wins / trades.length) * 100

    const totalProfit = trades.reduce((sum, trade) => {
      if (trade.outcome === "win") return sum + trade.profitLoss
      return sum
    }, 0)

    const totalLoss = Math.abs(
      trades.reduce((sum, trade) => {
        if (trade.outcome === "loss") return sum + trade.profitLoss
        return sum
      }, 0),
    )

    const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit

    const averageWin =
      wins > 0
        ? trades.filter((trade) => trade.outcome === "win").reduce((sum, trade) => sum + trade.profitLoss, 0) / wins
        : 0

    const averageLoss =
      losses > 0
        ? Math.abs(
            trades.filter((trade) => trade.outcome === "loss").reduce((sum, trade) => sum + trade.profitLoss, 0) /
              losses,
          )
        : 0

    const riskRewardRatio = averageLoss > 0 ? averageWin / averageLoss : averageWin

    // Group trades by type
    const tradesByType = trades.reduce((acc, trade) => {
      if (!acc[trade.type]) acc[trade.type] = []
      acc[trade.type].push(trade)
      return acc
    }, {})

    // Calculate win rate by type
    const winRateByType = Object.entries(tradesByType).map(([type, typeTrades]) => {
      const typeWins = typeTrades.filter((trade) => trade.outcome === "win").length
      return {
        type,
        winRate: (typeWins / typeTrades.length) * 100,
        count: typeTrades.length,
      }
    })

    return {
      winRate,
      profitFactor,
      averageWin,
      averageLoss,
      riskRewardRatio,
      winRateByType,
    }
  }, [trades])

  if (!stats) return <div>No trade data available</div>

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
            <Progress className="mt-2" value={stats.winRate} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.profitFactor.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Profit Factor</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">₹{stats.averageWin.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Average Win</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">₹{stats.averageLoss.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Average Loss</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">Risk/Reward Ratio</h3>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">{stats.riskRewardRatio.toFixed(2)}</div>
            <div className="flex-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Poor</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${Math.min(stats.riskRewardRatio * 33.3, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">Win Rate by Trade Type</h3>
          <div className="space-y-4">
            {stats.winRateByType.map(({ type, winRate, count }) => (
              <div key={type}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    {type} ({count} trades)
                  </span>
                  <span className="text-sm">{winRate.toFixed(1)}%</span>
                </div>
                <Progress value={winRate} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
