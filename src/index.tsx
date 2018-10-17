import './index.sass'

import M from 'materialize-css'
import { app, h } from 'hyperapp'

const state = {
  ip: '8.8.8.8',
  informations: {}
}

const actions = {
  setInformations: (informations) => ({ informations }),
  fetchInformations: event => (state, actions) => {
    event.preventDefault()
    fetch('https://ipapi.co/json/', { mode: 'cors' }).then(response => response.json()).then(actions.setInformations).catch(error => M.toast({ html: error, classes: 'red' }))
  }
}

const view = ({ ip, informations }, { fetchInformations }) => (
  <div>
    <header>
      <nav class='blue darken-3'>
        <div class='nav-wrapper container'>
          <a href='' class='brand-logo'>IP API Client</a>

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
    </header>

    <main>
      <div class='container'>
        <div class='row'>
          <div class='col s12'>
            <h1 class='center-align'>My IP Informations</h1>
          </div>
        </div>

        <form onsubmit={fetchInformations}>
          <div class='row'>
            <div class='col s12'>
              <input value={ip} />
            </div>
          </div>

          <div class='row'>
            <div class='col s12 center'>
              <button class='btn'>Search</button>
            </div>
          </div>
        </form>

        <div class='row'>
          <div class='row'>
            <table>
              <tbody>
                {Object.entries(informations).map(([ key, value ]) => <tr><td>{key}</td><td>{value}</td></tr>)}
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
