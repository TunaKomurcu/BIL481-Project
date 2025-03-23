"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, Menu, PieChart, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-slate-900">
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-1 text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="hidden text-xl font-bold text-blue-600 dark:text-blue-400 sm:inline-block">
                Yatırım Asistanı
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                  pathname === route.path ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400",
                )}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex items-center gap-2 pb-4">
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-1 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Yatırım Asistanı</span>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-50 dark:hover:bg-blue-950",
                      pathname === route.path
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400",
                    )}
                  >
                    {route.icon}
                    {route.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

