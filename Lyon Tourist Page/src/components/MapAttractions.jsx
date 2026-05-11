import '../styles/MapAttractions.css'
import mapImg from '../assets/images/lyon-map.jpg'
import attractionB from '../assets/images/attraction-b.jpg'
import attractionC from '../assets/images/attraction-c.jpg'

const spots = [
  { id: 'a', label: 'A', top: '20%', left: '78%' },
  { id: 'b', label: 'B', top: '58%', left: '62%' },
  { id: 'c', label: 'C', top: '15%', left: '48%' },
]

const cards = [
  { id: 'a', title: "Parc de la Tête d'Or", img: attractionB },
  { id: 'b', title: 'Street',               img: attractionC },
  { id: 'c', title: 'River',                img: attractionB },
]

export default function MapAttractions() {
  const handleCardHover = (spotId, active) => {
    const card = document.querySelector(`[data-card="${spotId}"]`)
    if (card) card.classList.toggle('focused', active)
  }

  return (
    <section className="map-section" id="attractions" aria-labelledby="map-title">
      <h2 id="map-title" className="section-title">Map Attractions</h2>
      <div className="map-container">

        {/* LEFT: 2x2 grid */}
        <div className="cards-grid" role="list">
          {cards.map(card => (
            <a                                         
              key={card.id}
              href="#"
              className="attraction-card"
              data-card={card.id}
              role="listitem"
              aria-label={`View ${card.title}`}
              onMouseEnter={() => handleCardHover(card.id, true)}
              onMouseLeave={() => handleCardHover(card.id, false)}
            >
              <img src={card.img} alt={card.title} />
              <span className="card-label">{card.title}</span>
              <span className="card-light" aria-hidden="true"></span>
            </a>
          ))}
          <a href="#" className="attraction-card all-attractions" aria-label="View all attractions">
            <span>All Attractions</span>
          </a>
        </div>

        {/* RIGHT: Map */}
        <div className="map-image-wrapper">
          <img src={mapImg} alt="Map of Lyon attractions" className="map-img" />
          {spots.map(spot => (
            <button
              key={spot.id}
              className="map-spot"
              style={{ top: spot.top, left: spot.left }}
              aria-label={`Attraction ${spot.label} location on map`}
              onMouseEnter={() => handleCardHover(spot.id, true)}
              onMouseLeave={() => handleCardHover(spot.id, false)}
            >
              {spot.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}