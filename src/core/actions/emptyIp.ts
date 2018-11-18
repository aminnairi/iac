import M from 'materialize-css'

export const emptyIp = () => {
  setTimeout(() => M.updateTextFields(), 1)
  return { ip: '' }
}