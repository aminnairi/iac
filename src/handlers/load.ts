import { app } from 'hyperapp'
import { state, actions } from '../core'
import { home } from '../core/views'
import { scroll } from './'
import { stylesheet } from '../utils';

export const load = () => {
  const googleIcons = stylesheet('https://fonts.googleapis.com/icon?family=Material+Icons')
  document.getElementsByTagName('head')[0].appendChild(googleIcons)
  const main = app(state, actions, home, document.body)

  window.addEventListener('scroll', scroll(main), false)
}