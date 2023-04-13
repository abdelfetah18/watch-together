import Features from "@/components/landing_page/Features"
import Footer from "@/components/landing_page/Footer"
import GetStarted from "@/components/landing_page/GetStarted"
import Header from "@/components/landing_page/Header"
import SupportedList from "@/components/landing_page/SupportedList"

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center bg-gray-900">
      <Header />
      <div className="flex flex-col w-11/12">
        <GetStarted />
        <Features />
        <SupportedList />
      </div>

      <Footer />
    </div>
  )
}
