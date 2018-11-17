import { app } from 'hyperapp'
import { state, actions } from '../core'
import { home } from '../core/views'
import { scroll } from './'

export const load = () => {
  const googleIcons = document.createElement('link')
  googleIcons.rel = 'stylesheet'
  googleIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
  document.getElementsByTagName('head')[0].appendChild(googleIcons)
  const main = app(state, actions, home, document.body)

  window.addEventListener('scroll', scroll(main), false)
}