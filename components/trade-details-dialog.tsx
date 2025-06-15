"use client"

import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export function TradeDetailsDialog({ trade, open, onOpenChange }) {
  if (!trade) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 p-0">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-t-lg border-b">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <span className="mr-2">{trade.symbol} Trade Details</span>
              {trade.outcome === "win" && <ArrowUpRight className="h-5 w-5 text-green-500" />}
              {trade.outcome === "loss" && <ArrowDownRight className="h-5 w-5 text-red-500" />}
              {trade.outcome === "break-even" && <Minus className="h-5 w-5 text-yellow-500" />}
            </DialogTitle>
            <DialogDescription>{format(new Date(trade.date), "MMMM d, yyyy")}</DialogDescription>
          </DialogHeader>
        </div>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Symbol</h4>
                <p className="text-lg font-semibold">{trade.symbol}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                <p className="text-lg font-semibold">{trade.type}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Direction</h4>
                <p className="text-lg font-semibold">{trade.direction}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Entry Price</h4>
                <p className="text-lg font-semibold">₹{trade.entryPrice.toFixed(2)}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Exit Price</h4>
                <p className="text-lg font-semibold">₹{trade.exitPrice.toFixed(2)}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Quantity</h4>
                <p className="text-lg font-semibold">{trade.quantity}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Profit/Loss</h4>
                <p
                  className={`text-lg font-semibold ${
                    trade.profitLoss > 0 ? "text-green-500" : trade.profitLoss < 0 ? "text-red-500" : ""
                  }`}
                >
                  ₹{trade.profitLoss.toFixed(2)}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Outcome</h4>
                <p className="text-lg font-semibold flex items-center">
                  {trade.outcome === "win" && <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />}
                  {trade.outcome === "loss" && <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
                  {trade.outcome === "break-even" && <Minus className="mr-1 h-4 w-4 text-yellow-500" />}
                  {trade.outcome}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Strategy</h4>
                <p className="text-lg font-semibold">{trade.strategy || "N/A"}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images">
            {trade.images && trade.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trade.images.map((image, index) => (
                  <div key={index} className="rounded-md overflow-hidden border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Trade screenshot ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No images available for this trade.</p>
            )}
          </TabsContent>

          <TabsContent value="notes">
            {trade.notes ? (
              <div className="p-4 rounded-md border">
                <p className="whitespace-pre-wrap">{trade.notes}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">No notes available for this trade.</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
