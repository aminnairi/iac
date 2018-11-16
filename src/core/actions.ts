import M from 'materialize-css'

const actions = {
  createHandler: () => M.Sidenav.init(document.querySelectorAll('.sidenav'), {}),
  setInformations: (informations) => ({ informations }),
  setIp: ({ target: { value } }) => ({ ip: value }),
  preventDefault: event => event.preventDefault(),
  notification: input => ({ toast }) =>  {
    if (toast && toast.timeRemaining > 0) {
      toast.dismiss()
    }

    toast = M.toast({ html: input, classes: 'blue darken-3' })
    return { toast }
  },
  fetchInformations: event => ({ ip }, actions) => {
    event.preventDefault()
    actions.notification('Fetching your IP informations...') 
    fetch(`https://ipapi.co/${ip}/json/`, { mode: 'cors' }).then(response => response.json()).then(actions.setInformations).catch(error => M.toast({ html: error, classes: 'red' }))
  },
  setBlueNavigationBar: () => ({ theme: 'blue darken-3', textTheme: 'white-text' }),
  setWhiteNavigationBar: () => ({ theme: 'white', textTheme: 'blue-text text-darken-3' }),
}

export { actions }