import M from 'materialize-css'

export const actions = {
  createHandler: () => M.Sidenav.init(document.querySelectorAll('.sidenav'), {}),
  setInformations: (informations) => ({ informations }),
  setIp: ({ target: { value } }) => ({ ip: value.trim() }),
  preventDefault: event => event.preventDefault(),
  success: input => ({ toast }) =>  {
    if (toast && toast.timeRemaining > 0) {
      toast.dismiss()
    }

    toast = M.toast({
      html: `<i class='material-icons'>info</i> &nbsp;${ input }`,
      classes: 'blue darken-3'
    })

    return { toast }
  },
  error: () => ({ toast }) => {
    if (toast && toast.timeRemaining > 0) {
      toast.dismiss()
    }

    toast = M.toast({
      html: `<i class='material-icons'>warning</i> &nbsp;Unable to fetch IP informations. Disable your ad blocker or try again`,
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
      const json = await response.json()
      actions.setInformations(json)
      actions.success('Successfully retrieved your IP informations')
    } catch (e) {
      actions.error()
    } finally {
      actions.fetched()
    }
  },
  setBlueNavigationBar: () => ({ theme: 'blue darken-3', textTheme: 'white-text' }),
  setWhiteNavigationBar: () => ({ theme: 'white', textTheme: 'blue-text text-darken-3' }),
}