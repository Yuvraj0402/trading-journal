"use client"

import { useState, useEffect } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTrades } from "@/hooks/use-trades"
import { TradeDetailsDialog } from "@/components/trade-details-dialog"

export default function CalendarPage() {
  const { trades, isLoading } = useTrades()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedTrade, setSelectedTrade] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [tradesByDay, setTradesByDay] = useState<Record<string, any[]>>({})

  useEffect(() => {
    // Get all days in the current month
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start, end })
    setCalendarDays(days)

    // Group trades by day
    if (trades.length > 0) {
      const grouped = trades.reduce(
        (acc, trade) => {
          const dateStr = format(new Date(trade.date), "yyyy-MM-dd")
          if (!acc[dateStr]) {
            acc[dateStr] = []
          }
          acc[dateStr].push(trade)
          return acc
        },
        {} as Record<string, any[]>,
      )
      setTradesByDay(grouped)
    }
  }, [currentMonth, trades])

  const previousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() - 1)
      return newDate
    })
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + 1)
      return newDate
    })
  }

  const viewTradeDetails = (trade: any) => {
    setSelectedTrade(trade)
    setIsDialogOpen(true)
  }

  const getDayProfitLoss = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const dayTrades = tradesByDay[dateStr] || []
    return dayTrades.reduce((sum, trade) => sum + trade.profitLoss, 0)
  }

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
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Trade Calendar</h1>
          <p className="text-muted-foreground mt-1">View your trades by date</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium px-2">{format(currentMonth, "MMMM yyyy")}</div>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Today
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-sky-900/20">
          <CardTitle>Trading Calendar</CardTitle>
          <CardDescription>View your trading activity for {format(currentMonth, "MMMM yyyy")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              const dateStr = format(day, "yyyy-MM-dd")
              const dayTrades = tradesByDay[dateStr] || []
              const hasTrades = dayTrades.length > 0
              const profitLoss = getDayProfitLoss(day)
              const isProfit = profitLoss > 0
              const isLoss = profitLoss < 0

              return (
                <div
                  key={i}
                  className={cn(
                    "h-24 md:h-32 p-1 border rounded-md overflow-hidden",
                    isToday(day) && "bg-sky-950/50 border-sky-700",
                    hasTrades && isProfit && "border-green-900",
                    hasTrades && isLoss && "border-red-900",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className={cn("text-sm font-medium", isToday(day) && "text-sky-400 font-bold")}>
                      {format(day, "d")}
                    </span>
                    {hasTrades && (
                      <span
                        className={cn(
                          "text-xs font-medium px-1.5 py-0.5 rounded-full",
                          isProfit && "bg-green-900/30 text-green-400",
                          isLoss && "bg-red-900/30 text-red-400",
                          !isProfit && !isLoss && "bg-slate-800 text-slate-400",
                        )}
                      >
                        {profitLoss > 0 ? "+" : ""}₹{profitLoss.toFixed(0)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-1.5rem)]">
                    {dayTrades.slice(0, 3).map((trade) => (
                      <button
                        key={trade.id}
                        onClick={() => viewTradeDetails(trade)}
                        className={cn(
                          "text-xs w-full text-left px-1 py-0.5 rounded truncate block",
                          trade.outcome === "win" && "bg-green-900/20 text-green-400",
                          trade.outcome === "loss" && "bg-red-900/20 text-red-400",
                          trade.outcome === "break-even" && "bg-slate-800 text-slate-400",
                        )}
                      >
                        {trade.symbol} ({trade.direction})
                      </button>
                    ))}
                    {dayTrades.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">+{dayTrades.length - 3} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedTrade && <TradeDetailsDialog trade={selectedTrade} open={isDialogOpen} onOpenChange={setIsDialogOpen} />}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
