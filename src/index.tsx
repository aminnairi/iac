import './index.sass'

import { app } from 'hyperapp'
import { state, actions } from './core'
import { home } from './core/views'

window.addEventListener('load', () => {
  const googleIcons = document.createElement('link')
  googleIcons.rel = 'stylesheet'
  googleIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
  document.getElementsByTagName('head')[0].appendChild(googleIcons)
  app(state, actions, home, document.body)
})
