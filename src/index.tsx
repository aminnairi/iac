import './index.sass'

import M from 'materialize-css'
import { app, h } from 'hyperapp'

const underscoreToSpace = input => input.replace(/_/g, ' ')
const capitalize = input => input.split(' ').map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

const state = {
  ip: '8.8.8.8',
  toast: undefined,
  informations: {}
}

const actions = {
  createHandler: () => M.Sidenav.init(document.querySelectorAll('.sidenav'), {}),
  setInformations: (informations) => ({ informations }),
  setIp: ({ target: { value } }) => ({ ip: value }),
  preventDefault: event => event.preventDefault(),
  notification: input => ({ toast }) =>  {
    if (toast) {
      toast.dismiss()
    }

    toast = M.toast({ html: input, classes: 'blue darken-3' })
    return { toast }
  },
  fetchInformations: event => ({ ip }, actions) => {
    event.preventDefault()
    actions.notification('Fetching your IP informations...') 
    fetch(`https://ipapi.co/${ip}/json/`, { mode: 'cors' }).then(response => response.json()).then(actions.setInformations).catch(error => M.toast({ html: error, classes: 'red' }))
  }
}

const view = ({ ip, informations }, { fetchInformations, setIp, preventDefault, createHandler }) => (
  <div oncreate={createHandler}>
    <ul class='sidenav' id='mobile'>
      <li>
        <a class='sidenav-close' href='https://ipapi.co/' target='blank'>IP API</a>
      </li>

      <li>
        <a class='sidenav-close' href='https://github.com/aminnairi/iac/' target='blank'>GitHub</a>
      </li>
    </ul>

    <header>
      <div class='navbar-fixed'>
        <nav class='blue darken-3'>
          <div class='nav-wrapper container'>
            <a href='' class='brand-logo'>IP API Client</a>

            <a href='#!' onclick={preventDefault} class='sidenav-trigger' data-target='mobile'>
              <i class='material-icons'>menu</i>
            </a>

            <ul class='right hide-on-med-and-down'>
              <li>
                <a href='https://ipapi.co/' target='blank'>IP API</a>
              </li>

              <li>
                <a href='https://github.com/aminnairi/iac/' target='blank'>GitHub</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <div class='container'>
        <div class='row'>
          <div class='col s12'>
            <h1 class='center-align flow-text'>IP Informations</h1>
          </div>
        </div>

        <form onsubmit={fetchInformations}>
          <div class='row'>
            <div class='col s12'>
              <div class='input-field'>
                <label for='ip' class='active'>Leave empty to search current network</label>
                <input id='ip' value={ip} oninput={setIp} />
              </div>
            </div>
          </div>

          <div class='row'>
            <div class='col s12 center'>
              <button class='btn blue darken-3'>Search</button>
            </div>
          </div>
        </form>

        <div class='row'>
          <div class='row'>
            <table>
              <tbody>
                {Object.entries(informations).map(([ key, value ]) => <tr><td>{capitalize(underscoreToSpace(key))}</td><td>{typeof value === 'boolean' ? value.toString() : value}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
)

console.log('henlo fren')

window.addEventListener('load', () => app(state, actions, view, document.body))
