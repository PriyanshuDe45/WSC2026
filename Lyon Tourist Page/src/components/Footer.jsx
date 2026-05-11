import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">

        <nav className="footer-col" aria-label="About">
          <h3>About Us</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Getting Here</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Places">
          <h3>Places to Stay</h3>
          <ul>
            <li><a href="#">Things to Do</a></li>
            <li><a href="#">Events Calendar</a></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Dining">
          <h3>Restaurants</h3>
          <ul>
            <li><a href="#">Nightlife</a></li>
            <li><a href="#">Shopping</a></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Plan">
          <h3>Plan Your Trip</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Newsletter Signup</a></li>
          </ul>
        </nav>

      </div>
      <p className="footer-copy">© 2024. All Rights Reserved.</p>
    </footer>
  )
}