export const stylesheet = url => {
  const stylesheetElement = document.createElement('link')
  stylesheetElement.rel = 'stylesheet'
  stylesheetElement.href = url
  return stylesheetElement
}