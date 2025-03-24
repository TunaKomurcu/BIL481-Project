"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, FileText, Home, Menu, Moon, PieChart, Sun, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function LayoutAlt3({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const routes = [
    {
      name: "Ana Sayfa",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Yatırım Analizi",
      path: "/investment",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Portföy Yönetimi",
      path: "/portfolio",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      name: "Raporlar",
      path: "/reports",
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-950 dark:to-purple-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex items-center gap-2 pb-6">
                  <div className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-1 text-white">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                    Yatırım Asistanı
                  </span>
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-2">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        pathname === route.path
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                      )}
                    >
                      {route.icon}
                      {route.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-1 text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="hidden bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent sm:inline-block">
                Yatırım Asistanı
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:gap-1">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  pathname === route.path
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-0">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">YA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

