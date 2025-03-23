"use client"

import { useEffect, useState } from "react"
import { jsPDF } from "jspdf"
import { Calendar, Download, FileText, Filter, Search } from "lucide-react"

import { Layout } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // Mock data for reports
    const mockReports = [
      {
        id: 1,
        title: "Aylık Portföy Raporu",
        date: "2023-07-15",
        type: "portfolio",
        details: "Bu rapor, portföyünüzün aylık performansını ve varlık dağılımını detaylı olarak gösterir.",
        tags: ["Aylık", "Portföy", "Performans"],
      },
      {
        id: 2,
        title: "Yıllık Finansal Özet",
        date: "2023-06-30",
        type: "financial",
        details: "Yıllık finansal performansınızın özeti, kazanç ve kayıpların analizi ve gelecek yıl için tahminler.",
        tags: ["Yıllık", "Finansal", "Özet"],
      },
      {
        id: 3,
        title: "Vergi Raporu",
        date: "2023-04-10",
        type: "tax",
        details: "Yatırımlarınızla ilgili vergi yükümlülüklerinizi ve potansiyel vergi avantajlarını gösteren rapor.",
        tags: ["Vergi", "Yükümlülük", "Finansal"],
      },
      {
        id: 4,
        title: "Risk Analizi",
        date: "2023-05-22",
        type: "risk",
        details: "Portföyünüzün risk profilini analiz eden ve risk azaltma stratejileri öneren detaylı rapor.",
        tags: ["Risk", "Analiz", "Strateji"],
      },
      {
        id: 5,
        title: "Piyasa Trendleri",
        date: "2023-07-05",
        type: "market",
        details:
          "Güncel piyasa trendlerini ve bunların yatırımlarınız üzerindeki potansiyel etkilerini analiz eden rapor.",
        tags: ["Piyasa", "Trend", "Analiz"],
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setReports(mockReports)
      setLoading(false)
    }, 500)
  }, [])

  const generatePDF = (report) => {
    const doc = new jsPDF()
    doc.setFontSize(22)
    doc.text(`${report.title}`, 20, 20)

    doc.setFontSize(12)
    doc.text(`Tarih: ${new Date(report.date).toLocaleDateString("tr-TR")}`, 20, 30)

    doc.setFontSize(14)
    doc.text("Rapor Detayları:", 20, 40)

    doc.setFontSize(12)
    const splitText = doc.splitTextToSize(report.details, 170)
    doc.text(splitText, 20, 50)

    doc.save(`${report.title}.pdf`)
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || report.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Finansal Raporlar</h1>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Raporlarda ara..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tüm Raporlar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Raporlar</SelectItem>
                  <SelectItem value="portfolio">Portföy Raporları</SelectItem>
                  <SelectItem value="financial">Finansal Raporlar</SelectItem>
                  <SelectItem value="tax">Vergi Raporları</SelectItem>
                  <SelectItem value="risk">Risk Analizleri</SelectItem>
                  <SelectItem value="market">Piyasa Raporları</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="dark:border-slate-800 dark:bg-slate-900/50">
                  <CardHeader>
                    <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredReports.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredReports.map((report) => (
                <Card key={report.id} className="dark:border-slate-800 dark:bg-slate-900/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{report.title}</CardTitle>
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(report.date).toLocaleDateString("tr-TR")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{report.details}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {report.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => generatePDF(report)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all hover:from-blue-700 hover:to-blue-600"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PDF İndir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="dark:border-slate-800 dark:bg-slate-900/50">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="mb-4 h-12 w-12 text-slate-400" />
                <p className="text-slate-600 dark:text-slate-400">Arama kriterlerinize uygun rapor bulunamadı.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  )
}

