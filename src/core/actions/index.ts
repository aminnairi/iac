import M from 'materialize-css'

import { emptyIp } from './emptyIp'
import { goTopOrReload } from './goTopOrReload'
import { createHandler } from './createHandler'
import { setInformations } from './setInformations'
import { setIp } from './setIp'
import { preventDefault } from './preventDefault'
import { error } from './error'
import { fetching } from './fetching'
import { fetched } from './fetched'

export const actions = {
  emptyIp,
  goTopOrReload,
  createHandler,
  setInformations,
  setIp,
  preventDefault,
  error,
  fetching,
  fetched,
  fetchInformations: event => async ({ ip }, actions) => {
    event.preventDefault()
    actions.fetching()

    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`, { mode: 'cors' })

      if (response.status === 400) {
        throw 'Bad request'
      } else if (response.status === 404) {
        throw 'URL not found'
      } else if (response.status === 405) {
        throw 'Method not allowed'
      } else if (response.status === 429) {
        throw 'Too many requests'
      }

      const json = await response.json()

      if (json.error) {
        actions.error(json.reason)
      } else if (json.reserved) {
        actions.error('Reserved IP adress')
      } else {
        actions.setInformations(json)
      }
    } catch (e) {
      if (e instanceof TypeError) {
        actions.error()
      } else {
        actions.error(e)
      }
    } finally {
      actions.fetched()
    }
  },
  setBlueNavigationBar: () => ({ theme: 'blue darken-3', textTheme: 'white-text' }),
  setWhiteNavigationBar: () => ({ theme: 'white', textTheme: 'blue-text text-darken-3' }),
}