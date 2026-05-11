import '../styles/EssentialInfo.css'

export default function EssentialInfo() {
  const speakFrench = () => {
    const text = 'Mairie de Lyon, soixante-neuf mille deux cent cinq Lyon cedex zéro un'
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section className="essential-section" aria-labelledby="essential-title">
      <div className="essential-inner">
        <div className="essential-info">
          <h2 id="essential-title">Essential Information</h2>
          <address>
            <p>Contact: <a href="tel:0472103030">04 72 10 30 30</a></p>
            <p>Address: Mairie de Lyon, 69205 Lyon cedex 01</p>
          </address>
          <button
            className="speak-btn"
            onClick={speakFrench}
            aria-label="Read address aloud in French"
          >
            Read It Loud
          </button>
        </div>

        <div className="latest-events-preview" aria-labelledby="events-title">
          <h2 id="events-title">Latest Events</h2>
          {/* LatestEvents cards will be a separate component below */}
        </div>
      </div>
    </section>
  )
}