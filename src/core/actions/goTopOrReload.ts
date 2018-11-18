export const goTopOrReload = event => {
  if (window.scrollY !== 0) {
    event.preventDefault()
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }
}