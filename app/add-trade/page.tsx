"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, PlusCircle, ArrowRight, Camera, Trash2, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useTrades } from "@/hooks/use-trades"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"

export default function AddTradePage() {
  const router = useRouter()
  const { addTrade } = useTrades()
  const { toast } = useToast()
  const [images, setImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("basic")

  // Form state
  const [date, setDate] = useState<Date>(new Date())
  const [symbol, setSymbol] = useState("")
  const [type, setType] = useState("stock")
  const [direction, setDirection] = useState("long")
  const [entryPrice, setEntryPrice] = useState<string>("")
  const [exitPrice, setExitPrice] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [profitLoss, setProfitLoss] = useState<number>(0)
  const [outcome, setOutcome] = useState("break-even")
  const [strategy, setStrategy] = useState("")
  const [notes, setNotes] = useState("")

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

        // Determine outcome based on profit/loss
        if (calculatedPL > 0) {
          setOutcome("win")
        } else if (calculatedPL < 0) {
          setOutcome("loss")
        } else {
          setOutcome("break-even")
        }
      }
    }
  }, [entryPrice, exitPrice, quantity, direction])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImages((prev) => [...prev, event.target.result as string])
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

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
      strategy,
      notes,
      images,
      timestamp: new Date().toISOString(),
    }

    addTrade(newTrade)
    toast({
      title: "Trade Added Successfully",
      description: `${symbol.toUpperCase()} trade has been recorded.`,
    })
    router.push("/dashboard")
  }

  const nextTab = () => {
    if (activeTab === "basic") {
      // Validate basic fields before proceeding
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

      setActiveTab("details")
    } else if (activeTab === "details") {
      setActiveTab("images")
    }
  }

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Add New Trade</h1>
          <p className="text-muted-foreground mt-1">Record your trade details and track your performance</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-sky-900/20 to-sky-900/5 rounded-t-lg border-b border-slate-800">
          <CardTitle>Trade Information</CardTitle>
          <CardDescription>Enter the details of your trade to track and analyze your performance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-sky-900/10">
              <TabsTrigger value="basic" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                Trade Details
              </TabsTrigger>
              <TabsTrigger value="images" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                Images & Notes
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-8">
              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="date"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
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
                      <PopoverContent
                        className="w-auto p-0 border border-slate-700 bg-slate-950 shadow-md"
                        align="start"
                      >
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
                    <label
                      htmlFor="symbol"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
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
                    <label
                      htmlFor="type"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Trade Type
                    </label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger id="type" className="focus:ring-sky-700">
                        <SelectValue placeholder="Select trade type" />
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
                    <label
                      htmlFor="direction"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Direction
                    </label>
                    <Select value={direction} onValueChange={setDirection}>
                      <SelectTrigger id="direction" className="focus:ring-sky-700">
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long">Long (Buy)</SelectItem>
                        <SelectItem value="short">Short (Sell)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-sky-900/10 p-4 rounded-lg border border-sky-900/30">
                  <h3 className="text-sm font-medium mb-3">Trade Values</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="entryPrice"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
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
                      <label
                        htmlFor="exitPrice"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
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
                      <label
                        htmlFor="quantity"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
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

                  <div className="mt-4 p-3 rounded-lg border flex items-center justify-between bg-slate-800 border-slate-700">
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
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextTab} className="w-full md:w-auto bg-sky-700 hover:bg-sky-600">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={cn(
                      "p-4 rounded-lg border",
                      profitLoss > 0
                        ? "bg-green-900/20 border-green-900"
                        : profitLoss < 0
                          ? "bg-red-900/20 border-red-900"
                          : "bg-sky-900/10 border-sky-900/30",
                    )}
                  >
                    <label
                      className={cn(
                        "text-sm font-medium",
                        profitLoss > 0 ? "text-green-400" : profitLoss < 0 ? "text-red-400" : "text-sky-400",
                      )}
                    >
                      Profit/Loss
                    </label>
                    <div
                      className={cn(
                        "text-2xl font-bold font-mono",
                        profitLoss > 0 ? "text-green-400" : profitLoss < 0 ? "text-red-400" : "text-sky-400",
                      )}
                    >
                      ₹{profitLoss.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Calculated automatically based on your trade details
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="outcome"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Outcome
                    </label>
                    <Select value={outcome} onValueChange={setOutcome}>
                      <SelectTrigger id="outcome" className="focus:ring-sky-700">
                        <SelectValue placeholder="Select outcome" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="win">Win</SelectItem>
                        <SelectItem value="loss">Loss</SelectItem>
                        <SelectItem value="break-even">Break Even</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Set automatically based on P/L</p>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="strategy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Strategy
                    </label>
                    <Input
                      id="strategy"
                      placeholder="e.g., Breakout, Swing, Gap & Go"
                      value={strategy}
                      onChange={(e) => setStrategy(e.target.value)}
                      className="focus:border-sky-700 focus:ring-sky-700"
                    />
                    <p className="text-xs text-muted-foreground">What strategy did you use for this trade?</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                    Back
                  </Button>
                  <Button type="button" onClick={nextTab} className="bg-sky-700 hover:bg-sky-600">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Trade Notes
                  </label>
                  <Textarea
                    id="notes"
                    placeholder="Add your trade notes, thoughts, and lessons learned..."
                    className="min-h-[120px] resize-y focus:border-sky-700 focus:ring-sky-700"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Document what you learned from this trade for future reference
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Trade Images
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Upload screenshots of your trade setup, execution, or charts
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-sky-900/10 hover:bg-sky-900/20 border-sky-800"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-10 h-10 mb-3 text-sky-400" />
                          <p className="mb-2 text-sm text-sky-300">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-sky-400">PNG, JPG or GIF</p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-3">Uploaded Images ({images.length})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-md overflow-hidden border border-slate-700">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Trade screenshot ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                                type="button"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <label
                            htmlFor="add-more-images"
                            className="aspect-square rounded-md border border-dashed flex items-center justify-center cursor-pointer bg-sky-900/10 hover:bg-sky-900/20 border-sky-800"
                          >
                            <div className="flex flex-col items-center justify-center">
                              <PlusCircle className="h-8 w-8 text-sky-400 mb-2" />
                              <span className="text-xs text-sky-400">Add More</span>
                            </div>
                            <input
                              id="add-more-images"
                              type="file"
                              className="hidden"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                    Back
                  </Button>
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
                    Save Trade
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
