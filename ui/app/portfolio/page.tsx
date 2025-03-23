"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, DollarSign, Percent, TrendingUp } from "lucide-react"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for portfolios
    const mockPortfolios = [
      {
        id: 1,
        name: "Büyüme Portföyü",
        description: "Yüksek büyüme potansiyeli olan hisse senetleri",
        value: 25000,
        change: 12.5,
        assets: [
          { name: "Teknoloji Hisseleri", allocation: 40, performance: 15.2 },
          { name: "Sağlık Hisseleri", allocation: 30, performance: 8.7 },
          { name: "Yenilenebilir Enerji", allocation: 20, performance: 22.3 },
          { name: "Nakit", allocation: 10, performance: 0.5 },
        ],
      },
      {
        id: 2,
        name: "Dengeli Portföy",
        description: "Orta risk seviyesi ile dengeli getiri",
        value: 50000,
        change: 8.2,
        assets: [
          { name: "Hisse Senetleri", allocation: 50, performance: 10.5 },
          { name: "Tahviller", allocation: 30, performance: 5.2 },
          { name: "Gayrimenkul", allocation: 15, performance: 7.8 },
          { name: "Nakit", allocation: 5, performance: 0.5 },
        ],
      },
      {
        id: 3,
        name: "Emeklilik Portföyü",
        description: "Uzun vadeli istikrarlı büyüme",
        value: 75000,
        change: 6.8,
        assets: [
          { name: "Tahviller", allocation: 40, performance: 4.5 },
          { name: "Hisse Senetleri", allocation: 30, performance: 9.2 },
          { name: "Gayrimenkul", allocation: 20, performance: 6.8 },
          { name: "Altın", allocation: 10, performance: 7.5 },
        ],
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setPortfolios(mockPortfolios)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Portföy Yönetimi</h1>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card className="dark:border-slate-800 dark:bg-slate-900/50">
              <CardHeader className="pb-2">
                <CardDescription>Toplam Değer</CardDescription>
                <CardTitle className="text-2xl">
                  ₺{loading ? "..." : portfolios.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>
                    {loading
                      ? "..."
                      : (
                          portfolios.reduce((sum, p) => sum + p.value * p.change, 0) /
                          portfolios.reduce((sum, p) => sum + p.value, 0)
                        ).toFixed(2)}
                    % Artış
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:border-slate-800 dark:bg-slate-900/50">
              <CardHeader className="pb-2">
                <CardDescription>Portföy Sayısı</CardDescription>
                <CardTitle className="text-2xl">{loading ? "..." : portfolios.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <DollarSign className="mr-1 h-4 w-4" />
                  <span>
                    Ortalama Değer: ₺
                    {loading
                      ? "..."
                      : (portfolios.reduce((sum, p) => sum + p.value, 0) / portfolios.length).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:border-slate-800 dark:bg-slate-900/50">
              <CardHeader className="pb-2">
                <CardDescription>Ortalama Getiri</CardDescription>
                <CardTitle className="text-2xl">
                  {loading ? "..." : (portfolios.reduce((sum, p) => sum + p.change, 0) / portfolios.length).toFixed(2)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <Percent className="mr-1 h-4 w-4" />
                  <span>Yıllık Bazda</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="dark:border-slate-800 dark:bg-slate-900/50">
                  <CardHeader>
                    <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((portfolio) => (
                <Card key={portfolio.id} className="dark:border-slate-800 dark:bg-slate-900/50">
                  <CardHeader>
                    <CardTitle>{portfolio.name}</CardTitle>
                    <CardDescription>{portfolio.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-2xl font-bold">₺{portfolio.value.toLocaleString()}</span>
                      <div
                        className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          portfolio.change >= 0
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {portfolio.change >= 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="mr-1 h-3 w-3" />
                        )}
                        {Math.abs(portfolio.change)}%
                      </div>
                    </div>

                    <Tabs defaultValue="allocation">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="allocation">Dağılım</TabsTrigger>
                        <TabsTrigger value="performance">Performans</TabsTrigger>
                      </TabsList>
                      <TabsContent value="allocation" className="space-y-4 pt-4">
                        {portfolio.assets.map((asset) => (
                          <div key={asset.name} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{asset.name}</span>
                              <span className="text-sm font-medium">{asset.allocation}%</span>
                            </div>
                            <Progress value={asset.allocation} className="h-2" />
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="performance" className="space-y-4 pt-4">
                        {portfolio.assets.map((asset) => (
                          <div key={asset.name} className="flex items-center justify-between">
                            <span className="text-sm">{asset.name}</span>
                            <span
                              className={`text-sm font-medium ${
                                asset.performance >= 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {asset.performance >= 0 ? "+" : ""}
                              {asset.performance}%
                            </span>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

