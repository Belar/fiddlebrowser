module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'fiddleBrowser',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "jsFiddle public profile browser" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  build: {
    vendor: ['jsonp'] // Add jsonp in the vendor.bundle.js
  },
  /*
  ** Global CSS
  */
  css: [
    { src: 'bulma', lang: 'sass' },
    '~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
