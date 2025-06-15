"use client"

import { format } from "date-fns"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export function RecentTrades({ trades }) {
  if (!trades.length) {
    return <div className="text-center py-4 text-muted-foreground">No trades recorded yet.</div>
  }

  return (
    <div className="space-y-4">
      {trades.map((trade) => (
        <div key={trade.id} className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                trade.outcome === "win"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : trade.outcome === "loss"
                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
              }`}
            >
              {trade.outcome === "win" && <ArrowUpRight className="h-4 w-4" />}
              {trade.outcome === "loss" && <ArrowDownRight className="h-4 w-4" />}
              {trade.outcome === "break-even" && <Minus className="h-4 w-4" />}
            </div>
            <div>
              <div className="font-medium">{trade.symbol}</div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(trade.date), "MMM d, yyyy")} • {trade.type} • {trade.direction}
              </div>
            </div>
          </div>
          <div
            className={`text-right ${
              trade.profitLoss > 0
                ? "text-green-600 dark:text-green-400"
                : trade.profitLoss < 0
                  ? "text-red-600 dark:text-red-400"
                  : ""
            }`}
          >
            <div className="font-medium">₹{trade.profitLoss.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              {trade.quantity} @ ₹{trade.exitPrice.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
