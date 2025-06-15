"use client"

import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, Search, ArrowUpRight, ArrowDownRight, Minus, Eye, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTrades } from "@/hooks/use-trades"
import { TradeDetailsDialog } from "@/components/trade-details-dialog"

export default function HistoryPage() {
  const { trades, isLoading } = useTrades()
  const [searchTerm, setSearchTerm] = useState("")
  const [outcomeFilter, setOutcomeFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [selectedTrade, setSelectedTrade] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (isLoading) {
    return <div className="container py-10">Loading...</div>
  }

  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.strategy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.notes?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOutcome = outcomeFilter === "all" || trade.outcome === outcomeFilter
    const matchesType = typeFilter === "all" || trade.type === typeFilter

    return matchesSearch && matchesOutcome && matchesType
  })

  const sortedTrades = [...filteredTrades].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "symbol") {
      return sortOrder === "asc" ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol)
    } else if (sortBy === "profitLoss") {
      return sortOrder === "asc" ? a.profitLoss - b.profitLoss : b.profitLoss - a.profitLoss
    }
    return 0
  })

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const viewTradeDetails = (trade: any) => {
    setSelectedTrade(trade)
    setIsDialogOpen(true)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Trade History</h1>
          <p className="text-muted-foreground mt-1">View and analyze your past trades</p>
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search your trading history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Symbol, strategy, notes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Outcome</label>
              <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="win">Wins</SelectItem>
                  <SelectItem value="loss">Losses</SelectItem>
                  <SelectItem value="break-even">Break Even</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="option">Option</SelectItem>
                  <SelectItem value="future">Future</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Sort</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Sort by {sortBy} ({sortOrder})
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "date" && sortOrder === "desc"}
                    onCheckedChange={() => {
                      setSortBy("date")
                      setSortOrder("desc")
                    }}
                  >
                    Date (newest first)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "date" && sortOrder === "asc"}
                    onCheckedChange={() => {
                      setSortBy("date")
                      setSortOrder("asc")
                    }}
                  >
                    Date (oldest first)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "symbol" && sortOrder === "asc"}
                    onCheckedChange={() => {
                      setSortBy("symbol")
                      setSortOrder("asc")
                    }}
                  >
                    Symbol (A-Z)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "symbol" && sortOrder === "desc"}
                    onCheckedChange={() => {
                      setSortBy("symbol")
                      setSortOrder("desc")
                    }}
                  >
                    Symbol (Z-A)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "profitLoss" && sortOrder === "desc"}
                    onCheckedChange={() => {
                      setSortBy("profitLoss")
                      setSortOrder("desc")
                    }}
                  >
                    P/L (highest first)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "profitLoss" && sortOrder === "asc"}
                    onCheckedChange={() => {
                      setSortBy("profitLoss")
                      setSortOrder("asc")
                    }}
                  >
                    P/L (lowest first)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
          <CardDescription>{filteredTrades.length} trades found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("date")}>
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("symbol")}>
                    Symbol
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead>Exit</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("profitLoss")}>
                    P/L
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  </TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTrades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No trades found.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTrades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-medium">{format(new Date(trade.date), "MM/dd/yyyy")}</TableCell>
                      <TableCell>{trade.symbol}</TableCell>
                      <TableCell>{trade.type}</TableCell>
                      <TableCell>{trade.direction}</TableCell>
                      <TableCell>₹{trade.entryPrice.toFixed(2)}</TableCell>
                      <TableCell>₹{trade.exitPrice.toFixed(2)}</TableCell>
                      <TableCell>{trade.quantity}</TableCell>
                      <TableCell
                        className={trade.profitLoss > 0 ? "text-green-500" : trade.profitLoss < 0 ? "text-red-500" : ""}
                      >
                        ₹{trade.profitLoss.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {trade.outcome === "win" && <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />}
                          {trade.outcome === "loss" && <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
                          {trade.outcome === "break-even" && <Minus className="mr-1 h-4 w-4 text-yellow-500" />}
                          {trade.outcome}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => viewTradeDetails(trade)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedTrade && <TradeDetailsDialog trade={selectedTrade} open={isDialogOpen} onOpenChange={setIsDialogOpen} />}
    </div>
  )
}
