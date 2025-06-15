"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useTrades } from "@/hooks/use-trades"
import { useToast } from "@/components/use-toast"
import { Card, CardContent } from "@/components/ui/card"

interface QuickAddTradeProps {
  onComplete: () => void
}

export function QuickAddTrade({ onComplete }: QuickAddTradeProps) {
  const { addTrade } = useTrades()
  const { toast } = useToast()

  const [date, setDate] = useState<Date>(new Date())
  const [symbol, setSymbol] = useState("")
  const [type, setType] = useState("stock")
  const [direction, setDirection] = useState("long")
  const [entryPrice, setEntryPrice] = useState<string>("")
  const [exitPrice, setExitPrice] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [profitLoss, setProfitLoss] = useState<number>(0)

  // Calculate profit/loss whenever inputs change
  useEffect(() => {
    if (entryPrice && exitPrice && quantity) {
      const entry = Number.parseFloat(entryPrice)
      const exit = Number.parseFloat(exitPrice)
      const qty = Number.parseFloat(quantity)

      if (!isNaN(entry) && !isNaN(exit) && !isNaN(qty) && qty > 0) {
        let calculatedPL = 0
        if (direction === "long") {
          calculatedPL = (exit - entry) * qty
        } else {
          calculatedPL = (entry - exit) * qty
        }
        setProfitLoss(calculatedPL)
      }
    }
  }, [entryPrice, exitPrice, quantity, direction])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!symbol || !entryPrice || !exitPrice || !quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const entry = Number.parseFloat(entryPrice)
    const exit = Number.parseFloat(exitPrice)
    const qty = Number.parseFloat(quantity)

    if (isNaN(entry) || isNaN(exit) || isNaN(qty) || qty <= 0) {
      toast({
        title: "Error",
        description: "Please enter valid numbers for price and quantity",
        variant: "destructive",
      })
      return
    }

    // Determine outcome based on profit/loss
    let outcome = "break-even"
    if (profitLoss > 0) {
      outcome = "win"
    } else if (profitLoss < 0) {
      outcome = "loss"
    }

    const newTrade = {
      id: Date.now().toString(),
      date,
      symbol: symbol.toUpperCase(),
      type,
      direction,
      entryPrice: entry,
      exitPrice: exit,
      quantity: qty,
      profitLoss,
      outcome,
      strategy: "",
      notes: "",
      images: [],
      timestamp: new Date().toISOString(),
    }

    addTrade(newTrade)
    toast({
      title: "Trade Added Successfully",
      description: `${symbol.toUpperCase()} trade has been recorded.`,
    })

    // Reset form
    setSymbol("")
    setEntryPrice("")
    setExitPrice("")
    setQuantity("")
    setProfitLoss(0)

    onComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="date" className="text-sm font-medium">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full pl-3 text-left font-normal", !date && "text-muted-foreground")}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border border-slate-700 bg-slate-950 shadow-md" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="symbol" className="text-sm font-medium">
            Symbol *
          </label>
          <Input
            id="symbol"
            placeholder="NIFTY, RELIANCE, etc."
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="uppercase focus:border-sky-700 focus:ring-sky-700"
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="type" className="text-sm font-medium">
            Type
          </label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type" className="focus:ring-sky-700">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stock">Stock</SelectItem>
              <SelectItem value="option">Option</SelectItem>
              <SelectItem value="future">Future</SelectItem>
              <SelectItem value="forex">Forex</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="direction" className="text-sm font-medium">
            Direction
          </label>
          <Select value={direction} onValueChange={setDirection}>
            <SelectTrigger id="direction" className="flex items-center focus:ring-sky-700">
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long">Long (Buy)</SelectItem>
              <SelectItem value="short">Short (Sell)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="entryPrice" className="text-sm font-medium">
            Entry Price (₹) *
          </label>
          <Input
            id="entryPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            required
            className="font-mono focus:border-sky-700 focus:ring-sky-700"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="exitPrice" className="text-sm font-medium">
            Exit Price (₹) *
          </label>
          <Input
            id="exitPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
            required
            className="font-mono focus:border-sky-700 focus:ring-sky-700"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity *
          </label>
          <Input
            id="quantity"
            type="number"
            min="1"
            placeholder="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="font-mono focus:border-sky-700 focus:ring-sky-700"
          />
        </div>
      </div>

      <Card
        className={cn(
          "border-2",
          profitLoss > 0
            ? "border-green-900 bg-green-900/20"
            : profitLoss < 0
              ? "border-red-900 bg-red-900/20"
              : "border-sky-900/30 bg-sky-900/10",
        )}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <ArrowRightLeft className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="font-medium">Calculated P/L:</span>
          </div>
          <span
            className={cn(
              "text-xl font-bold font-mono",
              profitLoss > 0 ? "text-green-400" : profitLoss < 0 ? "text-red-400" : "",
            )}
          >
            ₹{profitLoss.toFixed(2)}
          </span>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          className={cn(
            profitLoss > 0
              ? "bg-green-700 hover:bg-green-600"
              : profitLoss < 0
                ? "bg-red-700 hover:bg-red-600"
                : "bg-sky-700 hover:bg-sky-600",
          )}
        >
          Add Trade
        </Button>
      </div>
    </form>
  )
}
