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
      <div className="w-11/12 max-w-[1200px] flex flex-col items-center gap-32">
        <div className="w-full flex flex-col items-center gap-16">
          <Header />
          <GetStarted />
        </div>
        <div className="w-full flex flex-col items-center gap-32">
          <Features />
          <FeaturesDescription />
          <SupportedList />
          {/* <FAQ /> */}
          <div className="w-full flex flex-col items-center gap-4 border dark:border-none rounded-lg p-8 bg-gradient-to-t from-black to-primary-color">
            <div className="text-xl text-center text-white dark:text-white whitespace-pre-line">{"Say goodbye to watching videos alone and\nhello to interactive entertainment!"}</div>
            <a href="/user/sign_up" className="px-20 py-2 rounded-lg bg-indigo-600 w-fit text-indigo-50 cursor-pointer active:scale-110 duration-300">Get Started</a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
