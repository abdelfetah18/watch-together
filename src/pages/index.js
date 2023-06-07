import FAQ from "@/components/landing_page/FAQ"
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
      <div className="flex flex-col items-center w-11/12">
        <Features />
        <SupportedList />
        <FAQ />
        <a  href="/user/sign_up" className="font-mono font-bold px-16 py-2 rounded-lg bg-sky-600 w-fit text-white my-8 cursor-pointer">Create Account</a>
      </div>
      <Footer />
    </div>
  )
}
