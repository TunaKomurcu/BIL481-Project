"use client"

import { useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InvestmentPage() {
  const [amount, setAmount] = useState("")
  const [risk, setRisk] = useState("low")
  const [term, setTerm] = useState("1")
  const [chartData, setChartData] = useState([])
  const [activeTab, setActiveTab] = useState("chart")

  const handleAnalyze = () => {
    // Mock data for visualization
    const data = [
      { month: "Oca", profit: 100 },
      { month: "Şub", profit: 150 },
      { month: "Mar", profit: 200 },
      { month: "Nis", profit: 180 },
      { month: "May", profit: 220 },
      { month: "Haz", profit: 250 },
      { month: "Tem", profit: 280 },
      { month: "Ağu", profit: 310 },
      { month: "Eyl", profit: 340 },
      { month: "Eki", profit: 370 },
      { month: "Kas", profit: 400 },
      { month: "Ara", profit: 430 },
    ]
    setChartData(data)
  }

  // Mock portfolio distribution data
  const portfolioDistribution = [
    { name: "Hisse Senetleri", value: 40 },
    { name: "Tahviller", value: 30 },
    { name: "Gayrimenkul", value: 20 },
    { name: "Nakit", value: 10 },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Yatırım Analizi</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="dark:border-slate-800 dark:bg-slate-900/50">
              <CardHeader>
                <CardTitle>Yatırım Parametreleri</CardTitle>
                <CardDescription>Yatırım miktarı, risk seviyesi ve vade süresini belirleyin.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Yatırım Miktarı (₺)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Örn: 10000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="risk" className="text-sm font-medium">
                    Risk Seviyesi
                  </label>
                  <Select value={risk} onValueChange={setRisk}>
                    <SelectTrigger id="risk">
                      <SelectValue placeholder="Risk seviyesi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Düşük Risk</SelectItem>
                      <SelectItem value="medium">Orta Risk</SelectItem>
                      <SelectItem value="high">Yüksek Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="term" className="text-sm font-medium">
                    Vade Süresi (Yıl)
                  </label>
                  <Input
                    id="term"
                    type="number"
                    placeholder="Örn: 5"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all hover:from-blue-700 hover:to-blue-600"
                >
                  Analiz Et
                </Button>
              </CardContent>
            </Card>

            {chartData.length > 0 ? (
              <Card className="dark:border-slate-800 dark:bg-slate-900/50">
                <CardHeader className="pb-2">
                  <CardTitle>Yatırım Analizi Sonuçları</CardTitle>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="chart">Getiri Grafiği</TabsTrigger>
                      <TabsTrigger value="distribution">Portföy Dağılımı</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <TabsContent value="chart" className="mt-0">
                    <div className="h-[300px] w-full pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                          <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis
                            stroke="#6B7280"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}₺`}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}₺`, "Getiri"]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "6px",
                              border: "none",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="profit"
                            name="Aylık Getiri"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="distribution" className="mt-0">
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Önerilen Portföy Dağılımı</h3>
                      <div className="space-y-2">
                        {portfolioDistribution.map((item) => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{item.name}</span>
                              <span className="text-sm font-medium">{item.value}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                              <div className="h-full rounded-full bg-blue-500" style={{ width: `${item.value}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/50">
                        <h4 className="mb-2 font-medium text-blue-700 dark:text-blue-400">Tahmini Yıllık Getiri</h4>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                          {risk === "low" ? "8-12%" : risk === "medium" ? "12-18%" : "18-25%"}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center dark:border-slate-800 dark:bg-slate-900/50">
                <CardContent className="py-12 text-center">
                  <p className="text-slate-500 dark:text-slate-400">Yatırım parametrelerini girin ve analiz edin.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

