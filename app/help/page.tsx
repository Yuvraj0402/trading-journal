import Link from "next/link"
import { ArrowLeft, BookOpen, HelpCircle, FileText, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HelpPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <BookOpen className="h-8 w-8 text-slate-700 dark:text-slate-300 mb-2" />
            <CardTitle>User Guide</CardTitle>
            <CardDescription>Learn how to use the Trading Journal effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our comprehensive user guide covers everything from adding trades to analyzing your performance.
            </p>
            <Button className="w-full">Read User Guide</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <HelpCircle className="h-8 w-8 text-slate-700 dark:text-slate-300 mb-2" />
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our FAQ section for quick answers to the most common questions about the Trading Journal.
            </p>
            <Button className="w-full">View FAQ</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-slate-700 dark:text-slate-300 mb-2" />
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get help from our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need personalized help? Contact our support team and we'll get back to you as soon as possible.
            </p>
            <Button className="w-full">Contact Support</Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Adding Your First Trade
              </h3>
              <p className="text-muted-foreground">
                To add your first trade, click on the "Add Trade" button in the navigation bar or on the home page. Fill
                in the required information such as symbol, entry and exit prices, and quantity. The profit/loss will be
                calculated automatically.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Viewing Your Dashboard
              </h3>
              <p className="text-muted-foreground">
                The dashboard provides an overview of your trading performance. You can see your total profit/loss, win
                rate, and other key metrics. Use the charts to visualize your performance over time.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Using the Calendar View
              </h3>
              <p className="text-muted-foreground">
                The calendar view allows you to see your trades organized by date. Each day with trades is highlighted,
                and you can click on a trade to view its details.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Tips for Effective Trading Journaling</h2>
          <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
            <li>Be consistent in recording all your trades, not just the winning ones</li>
            <li>Add detailed notes about your thought process and emotions during the trade</li>
            <li>Include screenshots of charts to review your entry and exit points</li>
            <li>Regularly review your journal to identify patterns and areas for improvement</li>
            <li>Track your progress over time to see how your trading is evolving</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
