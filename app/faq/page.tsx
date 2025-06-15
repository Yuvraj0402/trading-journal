import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I add a new trade?</AccordionTrigger>
            <AccordionContent>
              You can add a new trade in two ways:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Use the "Quick Add" button on the home page for basic trade details</li>
                <li>
                  Click on "Add Trade" in the navigation bar for a more detailed trade entry with images and notes
                </li>
              </ol>
              Both methods will calculate your profit/loss automatically based on your entry price, exit price, and
              quantity.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How is profit/loss calculated?</AccordionTrigger>
            <AccordionContent>
              Profit/loss is calculated based on your trade direction, entry price, exit price, and quantity:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>For long positions: (Exit Price - Entry Price) × Quantity</li>
                <li>For short positions: (Entry Price - Exit Price) × Quantity</li>
              </ul>
              The result is displayed in INR (₹) and is used to determine if the trade was a win, loss, or break-even.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I edit or delete a trade after adding it?</AccordionTrigger>
            <AccordionContent>
              Currently, the ability to edit or delete trades is not implemented in this version of the Trading Journal.
              We recommend being careful when entering trade details. In a future update, we plan to add the ability to
              edit and delete trades.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              In the current implementation, your trade data is stored in your browser's local storage. This means:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Your data stays on your device and is not sent to any server</li>
                <li>Your data will persist between sessions on the same browser</li>
                <li>Clearing your browser data will erase your trading journal data</li>
                <li>Your data is not accessible from other devices or browsers</li>
              </ul>
              For a more secure and accessible solution, we recommend implementing a database and authentication system.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How can I analyze my trading performance?</AccordionTrigger>
            <AccordionContent>
              The Trading Journal provides several ways to analyze your performance:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Dashboard: View key metrics like win rate, profit factor, and average win/loss</li>
                <li>Charts: Visualize your daily profit/loss over time</li>
                <li>History: Filter and search through your past trades</li>
                <li>Calendar: See your trading activity organized by date</li>
              </ul>
              Regularly reviewing these metrics can help you identify patterns and improve your trading strategy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Can I export my trading data?</AccordionTrigger>
            <AccordionContent>
              Currently, there is no built-in export functionality in this version of the Trading Journal. In a future
              update, we plan to add the ability to export your trading data in various formats such as CSV, JSON, and
              PDF for further analysis or backup purposes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>What types of trades can I record?</AccordionTrigger>
            <AccordionContent>
              The Trading Journal supports various types of trades:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Stocks</li>
                <li>Options</li>
                <li>Futures</li>
                <li>Forex</li>
                <li>Cryptocurrencies</li>
              </ul>
              For each type, you can specify whether it's a long (buy) or short (sell) position.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>How can I add images to my trades?</AccordionTrigger>
            <AccordionContent>
              You can add images to your trades when using the detailed "Add Trade" form:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Navigate to the "Images & Notes" tab in the Add Trade form</li>
                <li>Click on the upload area or drag and drop your images</li>
                <li>You can add multiple images for each trade</li>
                <li>Images are stored locally in your browser</li>
              </ol>
              Adding chart screenshots can be very helpful for reviewing your trades later.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
