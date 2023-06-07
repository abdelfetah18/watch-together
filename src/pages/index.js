import Features from "@/components/landing_page/Features"
import Footer from "@/components/landing_page/Footer"
import GetStarted from "@/components/landing_page/GetStarted"
import Header from "@/components/landing_page/Header"
import SupportedList from "@/components/landing_page/SupportedList"

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center bg-gray-900">
      {
        //style={{ background: "url(/background.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "contain" }}
      }
      <div className="w-full h-screen flex flex-col items-center " style={{ background: "url(/background.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <Header />
        <GetStarted />
      </div>
      <div className="flex flex-col w-11/12 py-20">
        <Features />
        <SupportedList />
      </div>
      <Footer />
    </div>
  )
}
