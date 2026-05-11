import './styles/global.css'
import Header from './components/Header'
import Hero from './components/Hero'
import MapAttractions from './components/MapAttractions'
import VideoSection from './components/VideoSection'
import EssentialInfo from './components/EssentialInfo'
import LatestEvents from './components/LatestEvents'
import OtherInfoTabs from './components/OtherInfoTabs'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MapAttractions />
        <VideoSection />
        <EssentialInfo />
        <LatestEvents />
        <OtherInfoTabs />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

export default App