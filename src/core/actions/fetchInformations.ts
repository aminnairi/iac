export const fetchInformations = event => async ({ ip }, actions) => {
  event.preventDefault()
  actions.fetching()

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, { mode: 'cors' })

    if (response.status === 400) {
      throw 'Bad request'
    } else if (response.status === 404) {
      throw 'URL not found'
    } else if (response.status === 405) {
      throw 'Method not allowed'
    } else if (response.status === 429) {
      throw 'Too many requests'
    }

    const json = await response.json()

    if (json.error) {
      actions.error(json.reason)
    } else if (json.reserved) {
      actions.error('Reserved IP adress')
    } else {
      actions.setInformations(json)
    }
  } catch (e) {
    if (e instanceof TypeError) {
      actions.error()
    } else {
      actions.error(e)
    }
  } finally {
    actions.fetched()
  }
}