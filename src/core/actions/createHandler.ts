import M from 'materialize-css'

export const createHandler = () => {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), { edge: 'right' })
}