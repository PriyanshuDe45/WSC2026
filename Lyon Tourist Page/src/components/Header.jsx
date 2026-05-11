import '../styles/Header.css'

export default function Header() {
  return (
    <header className="header" role="banner">
      <nav className="nav" aria-label="Main navigation">
        <a href="#" className="nav-logo">WELCOME Lyon</a>
        <ul className="nav-links" role="list">
          <li><a href="#attractions">Attractions</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}