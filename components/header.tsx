"use client"

import Link from "next/link"
import { LineChart, PlusCircle, BarChart3, History, Calendar, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: LineChart },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/add-trade", label: "Add Trade", icon: PlusCircle },
    { href: "/history", label: "History", icon: History },
    { href: "/calendar", label: "Calendar", icon: Calendar },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <div className="bg-sky-950 p-1.5 rounded-md">
              <LineChart className="h-5 w-5 text-sky-400" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">Trading Journal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sky-900/30 text-sky-100 hover:bg-sky-900/50"
                        : "text-muted-foreground hover:text-sky-300",
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="bg-sky-950 p-1.5 rounded-md">
                    <LineChart className="h-5 w-5 text-sky-400" />
                  </div>
                  <span className="font-bold text-lg">Trading Journal</span>
                </Link>
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start text-sm font-medium transition-colors",
                            isActive
                              ? "bg-sky-900/30 text-sky-100 hover:bg-sky-900/50"
                              : "text-muted-foreground hover:text-sky-300",
                          )}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Help & Resources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/help" className="flex w-full">
                  User Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/faq" className="flex w-full">
                  FAQ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about" className="flex w-full">
                  About
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
