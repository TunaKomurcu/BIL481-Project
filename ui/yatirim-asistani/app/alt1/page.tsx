import { ArrowRight, BarChart3, FileText, PieChart, TrendingUp } from "lucide-react"
import Link from "next/link"

import { LayoutAlt1 } from "@/components/layout-alt1"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomeAlt1() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-emerald-400" />,
      title: "Yatırım Analizi",
      description: "Yatırım stratejilerinizi analiz edin ve optimize edin.",
      link: "/investment",
    },
    {
      icon: <PieChart className="h-10 w-10 text-emerald-400" />,
      title: "Portföy Yönetimi",
      description: "Yatırım portföyünüzü yönetin ve takip edin.",
      link: "/portfolio",
    },
    {
      icon: <FileText className="h-10 w-10 text-emerald-400" />,
      title: "Raporlar",
      description: "Detaylı finansal raporlar oluşturun ve görüntüleyin.",
      link: "/reports",
    },
  ]

  return (
    <LayoutAlt1>
      <div className="p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Yatırımlarınızı Akıllı Şekilde Yönetin
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Yapay zeka destekli yatırım asistanımız ile finansal hedeflerinize daha hızlı ulaşın.
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-slate-800 bg-slate-900 transition-all duration-300 hover:border-emerald-900 hover:bg-slate-800"
              >
                <CardContent className="p-6">
                  <div className="mb-4 rounded-lg bg-slate-800 p-2 w-fit">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                  <p className="mb-4 text-slate-400">{feature.description}</p>
                  <Link href={feature.link}>
                    <Button
                      variant="ghost"
                      className="p-0 text-emerald-400 hover:bg-transparent hover:text-emerald-300"
                    >
                      Keşfet <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-bold text-white">Piyasa Özeti</h2>
                <p className="mb-4 text-slate-400">Güncel piyasa durumu ve yatırım fırsatları</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">BIST 100</span>
                    <div className="flex items-center text-emerald-400">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      <span>8,450.32 (+1.2%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">USD/TRY</span>
                    <span className="text-slate-300">32.45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Altın (Gram)</span>
                    <span className="text-slate-300">2,345.67 TL</span>
                  </div>
                </div>
              </div>
              <div className="h-40 w-full flex-1 rounded-lg bg-slate-800 md:h-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAlt1>
  )
}

