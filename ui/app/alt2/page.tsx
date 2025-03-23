import { ArrowRight, BarChart3, FileText, PieChart, TrendingUp } from "lucide-react"
import Link from "next/link"

import { LayoutAlt2 } from "@/components/layout-alt2"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomeAlt2() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-gray-900 dark:text-white" />,
      title: "Yatırım Analizi",
      description: "Yatırım stratejilerinizi analiz edin ve optimize edin.",
      link: "/investment",
    },
    {
      icon: <PieChart className="h-10 w-10 text-gray-900 dark:text-white" />,
      title: "Portföy Yönetimi",
      description: "Yatırım portföyünüzü yönetin ve takip edin.",
      link: "/portfolio",
    },
    {
      icon: <FileText className="h-10 w-10 text-gray-900 dark:text-white" />,
      title: "Raporlar",
      description: "Detaylı finansal raporlar oluşturun ve görüntüleyin.",
      link: "/reports",
    },
  ]

  return (
    <LayoutAlt2>
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Yatırım Asistanı
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Finansal hedeflerinize ulaşmanıza yardımcı olacak akıllı yatırım çözümleri.
        </p>
      </div>

      <div className="mb-12 grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-md dark:bg-gray-800">
            <CardHeader className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-gray-200 p-2 dark:bg-gray-700">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="mb-4 text-base">{feature.description}</CardDescription>
              <Link href={feature.link}>
                <Button variant="outline" className="w-full">
                  Görüntüle <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-0 shadow-md dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Piyasa Özeti</CardTitle>
            <CardDescription>Güncel piyasa durumu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <span className="font-medium">BIST 100</span>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>8,450.32 (+1.2%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <span className="font-medium">USD/TRY</span>
                <span>32.45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Altın (Gram)</span>
                <span>2,345.67 TL</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Hızlı Erişim</CardTitle>
            <CardDescription>Sık kullanılan işlemler</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button variant="outline" className="justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Yeni Yatırım Analizi
            </Button>
            <Button variant="outline" className="justify-start">
              <PieChart className="mr-2 h-4 w-4" />
              Portföy Güncelleme
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Rapor Oluştur
            </Button>
          </CardContent>
        </Card>
      </div>
    </LayoutAlt2>
  )
}

