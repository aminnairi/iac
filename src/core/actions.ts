import M from 'materialize-css'

export const actions = {
  createHandler: () => M.Sidenav.init(document.querySelectorAll('.sidenav'), {}),
  setInformations: (informations) => ({ informations }),
  setIp: ({ target: { value } }) => ({ ip: value.trim() }),
  preventDefault: event => event.preventDefault(),
  notification: input => ({ toast }) =>  {
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
  fetchInformations: event => ({ ip }, actions) => {
    event.preventDefault()
    actions.notification('Fetching your IP informations...') 

    fetch(`https://ipapi.co/${ip}/json/`, { mode: 'cors' })
      .then(response => response.json())
      .then(actions.setInformations)
      .catch(actions.error)
  },
  setBlueNavigationBar: () => ({ theme: 'blue darken-3', textTheme: 'white-text' }),
  setWhiteNavigationBar: () => ({ theme: 'white', textTheme: 'blue-text text-darken-3' }),
}