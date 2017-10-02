# ReWebComponent v0.2 (not production ready)

Using Web Components in React is tricky due to the way React works, but the idea of framework-independent UI components is awesome, so if only we could do better...

* A wild ReWebComponent appears!
* It uses "Easily Wrap Web Components In A Couple Of Lines"
* It's super effective!

![Screenshot of a Web Component being rendered inside a React component](https://i.imgur.com/mgEi6B4.png)

With ReWebComponent, writing a `HelloWorld` React component that corresponds to a `<hello-world />` Web Component is as simple as:

```
import ReWebComponent from './ReWebComponent.js'
// Import your web component so it's bundled correctly
import './hello-world.js'

const HelloWorld = ReWebComponent('hello-world')
export default HelloWorld
```

If you prefer HTML imports to ES6 imports, you can do the following:

```
import ReWebComponent from './ReWebComponent.js'
const HelloWorld = ReWebComponent({tag: 'hello-world', importHref: './bower-components/link/to/hello-world.html' }))
export default HelloWorld
```

ReWebComponent supports:
* Events
* CSS custom properties
* Nesting children via slots
* HTML imports or ES6 imports
* Polymer components

Known issues:
* When using ReWebComponent in create-react-app, web components can only be loaded via the import approach if they do not use ES6 class syntax ([CRA Issue 3225 ](https://github.com/facebookincubator/create-react-app/issues/3225)). This means supported elements must use the `let MyElemProto = Object.create(HTMLElement.prototype)` style and `document.registerElement` instead of `customElements.define`, or be loaded via HTML Imports by using the `importHref` prop.

Usage with Polymer:
* Using the HTML imports flow shown above should work with Polymer out of the box.
* If using with create-react-app, a easy way to get started (that would be insecure for use in production) is to simply install bower components straight into your `/public` directory and then simply set `importHref` correctly when calling `ReWebComponent`

Credit:
* This project is, frankly, a very minor continuation of the work started by rnicholus as [react-web-component-wrapper](https://github.com/rnicholus/react-web-component-wrapper). It finishes many of the pieces they did not originally complete, but retains much of the earlier work. This project is certainly not complete, but hopefully it provides one more step in the journey or making the Web Components vision come true.

TODO:
* Cleanup: run Prettier, tidy up semicolon usage, add comments etc
* Publish to NPM
* More examples
* Manually test with more use cases involving both React and the Web Component attempting to mutate itself or it's children
* Write tests
* Determine whether a smarter method is required for supporting HTML imports
