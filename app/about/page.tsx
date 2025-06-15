import Link from "next/link"
import { ArrowLeft, Github, Twitter, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">About Trading Journal</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>About the Project</CardTitle>
            <CardDescription>A comprehensive tool for traders to track and analyze their performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Trading Journal is a web application designed to help traders track their trades, analyze their
              performance, and improve their trading strategies. Whether you're a day trader, swing trader, or long-term
              investor, this tool provides valuable insights into your trading habits and results.
            </p>
            <p>
              The application is built with modern web technologies including Next.js, React, and Tailwind CSS,
              providing a responsive and intuitive user interface that works on desktop and mobile devices.
            </p>
            <div className="flex space-x-4 pt-2">
              <Button variant="outline" className="flex items-center">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="flex items-center">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Website
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Key capabilities of the Trading Journal</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <span className="font-medium">Trade Tracking:</span> Record detailed information about each trade,
                including symbol, entry/exit prices, quantity, and outcome.
              </li>
              <li>
                <span className="font-medium">Performance Analytics:</span> View key metrics like win rate, profit
                factor, and average win/loss to understand your trading performance.
              </li>
              <li>
                <span className="font-medium">Visual Charts:</span> Visualize your daily profit/loss and other metrics
                with interactive charts.
              </li>
              <li>
                <span className="font-medium">Trade History:</span> Browse, filter, and search through your past trades
                to identify patterns.
              </li>
              <li>
                <span className="font-medium">Calendar View:</span> See your trading activity organized by date for a
                chronological perspective.
              </li>
              <li>
                <span className="font-medium">Image Uploads:</span> Attach screenshots of charts or setups to your
                trades for future reference.
              </li>
              <li>
                <span className="font-medium">Notes:</span> Add detailed notes about your thought process, emotions, and
                lessons learned from each trade.
              </li>
              <li>
                <span className="font-medium">Quick Add:</span> Quickly record basic trade details from the home page.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Built with modern web technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <h3 className="font-medium">Next.js</h3>
                <p className="text-sm text-muted-foreground">React framework</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <h3 className="font-medium">React</h3>
                <p className="text-sm text-muted-foreground">UI library</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <h3 className="font-medium">TypeScript</h3>
                <p className="text-sm text-muted-foreground">Type safety</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <h3 className="font-medium">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">Styling</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <h3 className="font-medium">shadcn/ui</h3>
                <p className="text-sm text-muted-foreground">UI components</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <h3 className="font-medium">Recharts</h3>
                <p className="text-sm text-muted-foreground">Data visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Future Plans</CardTitle>
            <CardDescription>Upcoming features and improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Database integration for secure and persistent storage</li>
              <li>User authentication and multi-user support</li>
              <li>Advanced analytics and reporting</li>
              <li>Export functionality (CSV, PDF, JSON)</li>
              <li>Trade templates for quick entry</li>
              <li>Mobile app for on-the-go trading journal</li>
              <li>Integration with popular trading platforms</li>
              <li>Risk management tools and position sizing calculator</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
