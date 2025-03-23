import { ArrowRight, BarChart3, FileText, PieChart, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

import { LayoutAlt3 } from "@/components/layout-alt3"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomeAlt3() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-purple-500" />,
      title: "Yatırım Analizi",
      description: "Yatırım stratejilerinizi analiz edin ve optimize edin.",
      link: "/investment",
    },
    {
      icon: <PieChart className="h-10 w-10 text-blue-500" />,
      title: "Portföy Yönetimi",
      description: "Yatırım portföyünüzü yönetin ve takip edin.",
      link: "/portfolio",
    },
    {
      icon: <FileText className="h-10 w-10 text-indigo-500" />,
      title: "Raporlar",
      description: "Detaylı finansal raporlar oluşturun ve görüntüleyin.",
      link: "/reports",
    },
  ]

  return (
    <LayoutAlt3>
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              <Sparkles className="mr-1 h-4 w-4" />
              Yapay Zeka Destekli
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Yatırımlarınızı Akıllı Şekilde Yönetin
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Yapay zeka destekli yatırım asistanımız ile finansal hedeflerinize daha hızlı ulaşın.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 text-white hover:from-purple-700 hover:to-blue-700">
              Hemen Başlayın
            </Button>
            <Button variant="outline" className="rounded-full">
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80"
            >
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={feature.link} className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    <span>Keşfet</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle>Piyasa Özeti</CardTitle>
            <CardDescription>Güncel piyasa durumu ve yatırım fırsatları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 p-4 dark:from-purple-950/50 dark:to-purple-900/50">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-300">BIST 100</div>
                <div className="mt-2 flex items-center text-xl font-bold text-purple-900 dark:text-purple-100">
                  <TrendingUp className="mr-1 h-5 w-5 text-green-500" />
                  8,450.32
                </div>
                <div className="mt-1 text-sm text-green-600 dark:text-green-400">+1.2%</div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 dark:from-blue-950/50 dark:to-blue-900/50">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-300">USD/TRY</div>
                <div className="mt-2 text-xl font-bold text-blue-900 dark:text-blue-100">32.45</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Güncel Kur</div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 dark:from-indigo-950/50 dark:to-indigo-900/50">
                <div className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Altın (Gram)</div>
                <div className="mt-2 text-xl font-bold text-indigo-900 dark:text-indigo-100">2,345.67 TL</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Güncel Fiyat</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutAlt3>
  )
}

