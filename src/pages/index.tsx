import FAQ from "@/components/landing_page/FAQ"
import Features from "@/components/landing_page/Features"
import Footer from "@/components/landing_page/Footer"
import GetStarted from "@/components/landing_page/GetStarted"
import Header from "@/components/landing_page/Header"
import SupportedList from "@/components/landing_page/SupportedList"

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center  dark:bg-gray-900">
      <div className="w-11/12 max-w-[1200px] flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <Header />
          <GetStarted />
        </div>
        <div className="w-full flex flex-col items-center">
          <Features />
          <SupportedList />
          <FAQ />
          <div className="font-semibold text-indigo-800 dark:text-gray-100">Say goodbye to watching videos alone and hello to interactive entertainment!</div>
          <a href="/user/sign_up" className="font-semibold px-16 py-2 rounded-lg bg-indigo-600 w-fit text-indigo-50 my-8 cursor-pointer uppercase">Create Account</a>
        </div>
        <Footer />
      </div>
    </div>
  )
}
