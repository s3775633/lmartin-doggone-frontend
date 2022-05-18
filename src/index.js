import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-dog'
import './components/va-my-dog'
import './components/va-message-content'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})