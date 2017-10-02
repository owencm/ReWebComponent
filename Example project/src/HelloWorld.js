// For non HTML-imports usage, just import your component then use ReWebComponent
import ReWebComponent from './ReWebComponent.js'
import './hello-world.js'

export default ReWebComponent('hello-world')

// To use with HTML imports, skip importing the web component, but instead call ReWebComponent({ tag: 'hello-world', importHref: './bower-components/link/to/hello-world.html' })
