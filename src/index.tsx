import './index.sass'

import M from 'materialize-css'
import { app, h } from 'hyperapp'

const state = {
  ip: '8.8.8.8'
}

const actions = {
  fetchIpInformations: event => {
    event.preventDefault()
    fetch('https://ipapi.co/json/').then(response => response.json()).then(console.log).catch(error => M.toast({ html: error, classes: 'red' }))
  }
}

const view = ({ ip }, { fetchIpInformations }) => (
  <div>
    <header>
      <nav class='blue darken-3'>
        <div class='nav-wrapper container'>
          <a href='' class='brand-logo'>IP API Client</a>

          <ul class='right hide-on-med-and-down'>
            <li>
              <a href='https://ipapi.co/' target='blank'>IP API</a>
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

        <form onsubmit={fetchIpInformations}>
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
      </div>
    </main>
  </div>
)

window.addEventListener('load', () => app(state, actions, view, document.body))
