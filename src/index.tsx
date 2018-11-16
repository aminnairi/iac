import './index.sass'

import { app } from 'hyperapp'
import { state, actions } from './core'
import { home } from './core/views'


window.addEventListener('load', () => {
  const googleIcons = document.createElement('link')
  googleIcons.rel = 'stylesheet'
  googleIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
  document.getElementsByTagName('head')[0].appendChild(googleIcons)
  const main = app(state, actions, home, document.body)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 64) {
      // @ts-ignore
      main.setBlueNavigationBar()
    } else {
      // @ts-ignore
      main.setWhiteNavigationBar()
    }
  })
})
