// import FAQ from "@/components/landing_page/FAQ"
import Features from "@/components/landing_page/Features"
import FeaturesDescription from "@/components/landing_page/FeaturesDescription"
import Footer from "@/components/landing_page/Footer"
import GetStarted from "@/components/landing_page/GetStarted"
import Header from "@/components/landing_page/Header"
import SupportedList from "@/components/landing_page/SupportedList"

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center  dark:bg-dark-gray">
      <div className="w-11/12 max-w-[1200px] flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <Header />
          <GetStarted />
        </div>
        <div className="w-full flex flex-col items-center">
          <Features />
          <FeaturesDescription />
          <SupportedList />
          {/* <FAQ /> */}
          <div className="text-xl text-center text-gray-800 dark:text-gray-100 whitespace-pre-line">{"Say goodbye to watching videos alone and\nhello to interactive entertainment!"}</div>
          <a href="/user/sign_up" className="font-semibold px-20 py-1 rounded-full bg-indigo-600 w-fit text-indigo-50 my-8 cursor-pointer uppercase active:scale-110 duration-300">Sign Up</a>
        </div>
        <Footer />
      </div>
    </div>
  )
}
