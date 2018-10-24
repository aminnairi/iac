self.addEventListener('install', event => {
  console.log('install')
})

self.addEventListener('fetch', event => {
  console.log('fetch')
})

self.addEventListener('activate', event => {
  console.log('activate')
})