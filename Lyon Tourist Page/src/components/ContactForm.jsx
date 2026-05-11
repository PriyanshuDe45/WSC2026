import '../styles/ContactForm.css'

export default function ContactForm() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-box">
        <h2 id="contact-title" className="contact-title">Contact Us</h2>
        <form action="" method="post" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                autoComplete="given-name"
                tabIndex={1}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                autoComplete="family-name"
                tabIndex={2}
                required
                aria-required="true"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                tabIndex={3}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                tabIndex={4}
              />
            </div>
          </div>
          <button type="submit" tabIndex={5} aria-label="Submit contact form">Submit</button>
        </form>
      </div>
    </section>
  )
}