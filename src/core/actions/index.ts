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
import { fetchInformations } from './fetchInformations'
import { setBlueNavigationBar } from './setBlueNavigationBar'

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
  fetchInformations,
  setBlueNavigationBar,
  setWhiteNavigationBar: () => ({ theme: 'white', textTheme: 'blue-text text-darken-3' }),
}