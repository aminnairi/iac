import { h } from 'hyperapp'
import { Enter, Exit } from '@hyperapp/transitions'
import { underscoreToSpace, capitalize } from '../../utils'
// @ts-ignore
import { version } from '../../../package.json'

export const home = ({ ip, informations, theme, textTheme, fetching }, { fetchInformations, setIp, preventDefault, createHandler, goTopOrReload, emptyIp }) => (
  <div oncreate={createHandler}>
    <ul class='sidenav' id='mobile'>
      <li class='center-align'>Version { version }</li>
      <li class='divider'></li>

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
            <a href='' class={ `brand-logo ${ textTheme }` } onclick={ goTopOrReload }>IP API Client</a>

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

              <li class='grey-text'>v{ version }</li>
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
            <div class='col s12 input-field'>
              <i class={ `material-icons prefix ${ textTheme }` } onclick={ emptyIp }>close</i>
              <input id='ip' type='text' value={ip} oninput={setIp} />
              <label for='ip' class='active'>Empty for current network</label>
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