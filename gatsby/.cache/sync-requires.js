const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-wp-page-jsx": hot(preferDefault(require("/home/vavra/Projects/project-paradise/gatsby/src/templates/wp-page.jsx"))),
  "component---src-templates-wp-post-jsx": hot(preferDefault(require("/home/vavra/Projects/project-paradise/gatsby/src/templates/wp-post.jsx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/vavra/Projects/project-paradise/gatsby/.cache/dev-404-page.js"))),
  "component---src-pages-404-jsx": hot(preferDefault(require("/home/vavra/Projects/project-paradise/gatsby/src/pages/404.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("/home/vavra/Projects/project-paradise/gatsby/src/pages/index.jsx"))),
  "component---src-pages-test-jsx": hot(preferDefault(require("/home/vavra/Projects/project-paradise/gatsby/src/pages/test.jsx"))),
  "component---src-pages-test-2-jsx": hot(preferDefault(require("/home/vavra/Projects/project-paradise/gatsby/src/pages/test2.jsx")))
}

