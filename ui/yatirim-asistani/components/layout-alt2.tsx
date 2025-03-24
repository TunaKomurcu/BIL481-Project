"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, Menu, Moon, PieChart, Search, Sun, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function LayoutAlt2({ children }: { children: React.ReactNode }) {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex items-center gap-2 pb-4">
                  <div className="rounded-lg bg-gray-900 p-1 text-white dark:bg-white dark:text-gray-900">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <span className="text-xl font-bold">Yatırım Asistanı</span>
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === route.path
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
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
              <div className="rounded-lg bg-gray-900 p-1 text-white dark:bg-white dark:text-gray-900">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold dark:text-white">Yatırım Asistanı</span>
            </Link>
          </div>

          <div className="hidden flex-1 px-8 md:block">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Ara..." className="w-full border-gray-200 pl-9 dark:border-gray-700" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gray-900 text-white dark:bg-white dark:text-gray-900">YA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b bg-white dark:border-gray-800 dark:bg-gray-900">
        <nav className="mx-auto hidden max-w-7xl px-4 sm:px-6 md:flex lg:px-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                pathname === route.path
                  ? "border-gray-900 text-gray-900 dark:border-white dark:text-white"
                  : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white",
              )}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}

