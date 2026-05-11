import '../styles/OtherInfoTabs.css'

export default function OtherInfoTabs() {
  return (
    <section className="tabs-section" aria-labelledby="other-info-title">
      <h2 id="other-info-title" className="section-title">Other Information</h2>
      <info-tabs>
        {/* These data-tab spans tell the web component what the button labels are */}
        <span data-tab="Tab 1"></span>
        <span data-tab="Tab 2"></span>
        <span data-tab="Tab 3"></span>

        <div data-panel>
          <p>This is the content for Tab 1.</p>
        </div>
        <div data-panel>
          <p>This is the content for Tab 2.</p>
        </div>
        <div data-panel>
          <p>This is the content for Tab 3.</p>
        </div>
      </info-tabs>
    </section>
  )
}