import M from 'materialize-css'

export const error = (error = 'Network not available or adblocker in use') => ({ toast }) => {
  if (toast && toast.timeRemaining > 0) {
    toast.dismiss()
  }

  toast = M.toast({
    html: `<i class='material-icons'>warning</i> &nbsp;${ error }`,
    classes: 'red darken-3'
  })

  return { toast }
}