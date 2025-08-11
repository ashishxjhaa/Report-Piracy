import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"


function LandingPage() {

  return (
    <div className="w-full min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

export default LandingPage