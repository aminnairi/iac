export const scroll = (hyperapp) => () => {
  if (window.scrollY > 39.2) {
    // @ts-ignore
    hyperapp.setBlueNavigationBar()
  } else {
    // @ts-ignore
    hyperapp.setWhiteNavigationBar()
  }
}