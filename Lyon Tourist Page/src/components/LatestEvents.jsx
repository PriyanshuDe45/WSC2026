import '../styles/LatestEvents.css'
import { events } from '../data/latestEvents'

export default function LatestEvents() {
  return (
    <section className="events-section" id="events" aria-labelledby="events-heading">
      <h2 id="events-heading" className="section-title">Latest Events</h2>
      <div className="events-scroll" role="list">
        {events.map(event => (
          <article
            key={event.id}
            className="event-card attraction-card"
            role="listitem"
            aria-label={event.title}
          >
            <img src={event.image} alt={event.title} />
            <span className="card-label">{event.title}</span>
            <span className="card-light" aria-hidden="true"></span>
          </article>
        ))}
      </div>
    </section>
  )
}