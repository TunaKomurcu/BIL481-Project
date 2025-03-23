import { BarChart3, FileText, PieChart } from "lucide-react"
import Link from "next/link"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
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
      icon: <FileText className="h-10 w-10 text-blue-500" />,
      title: "Raporlar",
      description: "Detaylı finansal raporlar oluşturun ve görüntüleyin.",
      link: "/reports",
    },
  ]

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Finansal Geleceğinizi{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Planlayın</span>
          </h1>
          <p className="mb-8 text-xl text-slate-600 dark:text-slate-400">
            Yapay zeka destekli finansal asistanımız ile yatırımlarınızı optimize edin ve finansal hedeflerinize ulaşın.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Link key={index} href={feature.link} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

