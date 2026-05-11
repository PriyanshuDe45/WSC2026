// public/tabs-component.js
class InfoTabs extends HTMLElement {
  connectedCallback() {
    this.render()
    this.setupEvents()
  }

  render() {
    const tabs = this.querySelectorAll('[data-tab]')
    const panels = this.querySelectorAll('[data-panel]')

    // Build tab list
    const tabList = document.createElement('div')
    tabList.setAttribute('role', 'tablist')
    tabList.className = 'tab-list'

    tabs.forEach((tab, i) => {
      const btn = document.createElement('button')
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false')
      btn.setAttribute('aria-controls', `panel-${i}`)
      btn.setAttribute('id', `tab-${i}`)
      btn.setAttribute('tabindex', i === 0 ? '0' : '-1')
      btn.textContent = tab.getAttribute('data-tab')
      btn.className = i === 0 ? 'tab-btn active' : 'tab-btn'
      tabList.appendChild(btn)
    })

    this.insertBefore(tabList, this.firstChild)

    panels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('id', `panel-${i}`)
      panel.setAttribute('aria-labelledby', `tab-${i}`)
      panel.setAttribute('aria-hidden', i === 0 ? 'false' : 'true')
      panel.style.display = i === 0 ? 'block' : 'none'
      panel.setAttribute('tabindex', '0')
    })
  }

  setupEvents() {
    const tabList = this.querySelector('[role="tablist"]')
    const btns = [...tabList.querySelectorAll('[role="tab"]')]
    const panels = [...this.querySelectorAll('[role="tabpanel"]')]

    const activate = (index) => {
      btns.forEach((btn, i) => {
        const active = i === index
        btn.setAttribute('aria-selected', active)
        btn.setAttribute('tabindex', active ? '0' : '-1')
        btn.classList.toggle('active', active)
      })
      panels.forEach((panel, i) => {
        const active = i === index
        panel.setAttribute('aria-hidden', !active)
        panel.style.display = active ? 'block' : 'none'
      })
      btns[index].focus()
    }

    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => activate(i))
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % btns.length) }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); activate((i - 1 + btns.length) % btns.length) }
      })
    })
  }
}

customElements.define('info-tabs', InfoTabs)