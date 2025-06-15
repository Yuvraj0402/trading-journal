"use client"

import { useMemo } from "react"
import { format, parseISO } from "date-fns"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function DailyProfitLossChart({ trades }) {
  const chartData = useMemo(() => {
    if (!trades.length) return []

    // Group trades by date
    const tradesByDate = trades.reduce((acc, trade) => {
      const dateStr = format(new Date(trade.date), "yyyy-MM-dd")
      if (!acc[dateStr]) {
        acc[dateStr] = {
          date: dateStr,
          profit: 0,
          loss: 0,
          total: 0,
        }
      }

      const profitLoss = trade.profitLoss
      acc[dateStr].total += profitLoss

      if (profitLoss > 0) {
        acc[dateStr].profit += profitLoss
      } else if (profitLoss < 0) {
        acc[dateStr].loss += profitLoss
      }

      return acc
    }, {})

    // Convert to array and sort by date
    return Object.values(tradesByDate)
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
      .map((item) => ({
        ...item,
        date: format(parseISO(item.date), "MMM dd"),
      }))
  }, [trades])

  if (!chartData.length) return <div>No trade data available</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
          labelFormatter={(label) => `Date: ${label}`}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#bae6fd",
            borderRadius: "6px",
            boxShadow: "0 2px 10px rgba(14, 165, 233, 0.1)",
          }}
        />
        <Bar dataKey="profit" fill="#0ea5e9" name="Profit" />
        <Bar dataKey="loss" fill="#ef4444" name="Loss" />
      </BarChart>
    </ResponsiveContainer>
  )
}
