import { h } from 'hyperapp'
import { Enter, Exit } from '@hyperapp/transitions'
import { underscoreToSpace, capitalize } from '../../utils'

const home = ({ ip, informations, theme, textTheme, fetching }, { fetchInformations, setIp, preventDefault, createHandler }) => (
  <div oncreate={createHandler}>
    <ul class='sidenav' id='mobile'>
      <li>
        <a class='sidenav-close' href='https://ipapi.co/' target='blank'>IP API</a>
      </li>

      <li>
        <a class='sidenav-close' href='https://github.com/aminnairi/iac/' target='blank'>GitHub</a>
      </li>

      <li>
        <a class='sidenav-close' href='https://github.com/aminnairi/iac/issues/' target='blank'>Bug</a>
      </li>
    </ul>

    <header>
      <div class='navbar-fixed'>
        <nav class={ theme }>
          <div class='nav-wrapper container'>
            <a href='' class={ `brand-logo ${ textTheme }` }>IP API Client</a>

            <a href='#!' onclick={ preventDefault } class={ `sidenav-trigger ${ textTheme }` } data-target='mobile'>
              <i class='material-icons'>menu</i>
            </a>

            <ul class='right hide-on-med-and-down'>
              <li>
                <a href='https://ipapi.co/' class={ textTheme } target='blank'>IP API</a>
              </li>

              <li>
                <a href='https://github.com/aminnairi/iac/' class={ textTheme } target='blank'>GitHub</a>
              </li>

              <li>
                <a href='https://github.com/aminnairi/iac/issues/' class={ textTheme } target='blank'>Bug</a>
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
              <button class={`btn blue darken-3 ${ fetching ? 'disabled' : '' }`}>Search</button>
            </div>
          </div>
        </form>

        <div class='row'>
          <div class='row'>
            <table>
              <Enter css={{ opacity: '0', transform: 'translateX(100%)' }}>
                <Exit css={{ opacity: '0', transform: 'translateX(-100%)' }}>
                  <tbody key={informations.ip}>
                    {Object.entries(informations).map(([ key, value ]) => <tr><td class='blue-text text-darken-4'>{capitalize(underscoreToSpace(key))}</td><td>{typeof value === 'boolean' ? value.toString() : value}</td></tr>)}
                  </tbody>
                </Exit>
              </Enter>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
)

export { home }