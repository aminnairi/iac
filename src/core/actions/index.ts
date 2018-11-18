import M from 'materialize-css'

import { emptyIp } from './emptyIp'
import { goTopOrReload } from './goTopOrReload'
import { createHandler } from './createHandler'

export const actions = {
  emptyIp,
  goTopOrReload,
  createHandler,
  setInformations: (informations) => ({ informations }),
  setIp: ({ target: { value } }) => ({ ip: value.trim().replace('?', '') }),
  preventDefault: event => event.preventDefault(),
  error: (error = 'Network not available or adblocker in use') => ({ toast }) => {
    if (toast && toast.timeRemaining > 0) {
      toast.dismiss()
    }

    toast = M.toast({
      html: `<i class='material-icons'>warning</i> &nbsp;${ error }`,
      classes: 'red darken-3'
    })

    return { toast }
  },

  fetching: () => ({ fetching: true }),
  fetched: () => ({ fetching: false }),
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