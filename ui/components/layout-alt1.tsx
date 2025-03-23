"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, Menu, Moon, PieChart, Settings, Sun, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LayoutAlt1({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Set dark theme by default for this layout
    document.documentElement.classList.add("dark")
    setTheme("dark")
  }, [])

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
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-slate-800 bg-slate-900 md:flex">
        <div className="flex h-16 items-center border-b border-slate-800 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-500 p-1 text-white">
              <BarChart3 className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-white">Yatırım Asistanı</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === route.path
                  ? "bg-slate-800 text-emerald-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
              )}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-slate-800 p-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-emerald-500 text-white">YA</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-white">Kullanıcı</p>
              <p className="truncate text-xs text-slate-400">kullanici@ornek.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-slate-900 text-white">
                <DropdownMenuItem className="hover:bg-slate-800 hover:text-white focus:bg-slate-800">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-slate-800 hover:text-white focus:bg-slate-800"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  <span>{theme === "light" ? "Karanlık Mod" : "Aydınlık Mod"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 md:hidden">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-r border-slate-800 bg-slate-900 p-0">
              <div className="flex h-16 items-center border-b border-slate-800 px-6">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-emerald-500 p-1 text-white">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <span className="text-xl font-bold text-white">Yatırım Asistanı</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto text-slate-400" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === route.path
                        ? "bg-slate-800 text-emerald-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white",
                    )}
                  >
                    {route.icon}
                    {route.name}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-slate-800 p-4">
                <div className="flex items-center gap-3 rounded-lg bg-slate-800 p-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-emerald-500 text-white">YA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium text-white">Kullanıcı</p>
                    <p className="truncate text-xs text-slate-400">kullanici@ornek.com</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-500 p-1 text-white">
              <BarChart3 className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-white">Yatırım Asistanı</span>
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="text-white" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        <div className="pt-16 md:pt-0">{children}</div>
      </main>
    </div>
  )
}

