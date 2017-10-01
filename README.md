# ReWebComponent v0.1 (not production ready)

It turns out that using Web Components in React projects is pretty tricky due to the way React works, but the idea of framework-independent UI components is awesome, so if only we could do better...

* A wild ReWebComponent appears!
* It uses "Easily Wrap Web Components In A Couple Of Lines"
* It's super effective!

![Screenshot of a Web Component being rendered inside a React component](https://i.imgur.com/mgEi6B4.png)

With ReWebComponent, writing a HelloWorld React component that corresponds to a 'hello-world' Web Component is as simple as:

```
import React from 'react'
import ReWebComponent from './ReWebComponent.js'
// Import the Web Component!
import './hello-world.js'

export default (props) => {
  return <ReWebComponent tag='hello-world' {...props} />
}
```

Supports:
* Events
* CSS custom properties
* Nesting children via slots

Known issues:
* When using ReWebComponent in create-react-app, web components can only be loaded via the import approach if they do not use ES6 class syntax ([CRA Issue 3225 ](https://github.com/facebookincubator/create-react-app/issues/3225)). This means supported elements must use the `let MyElemProto = Object.create(HTMLElement.prototype)` style and `document.registerElement` instead of `customElements.define`, or be loaded via HTML Imports by using the `importHref` prop.

TODO:
* Run prettify, tidy up semicolons etc
* Manually test with more use cases involving both React and the Web Component attempting to mutate itself or it's children
* Write tests
* Determine whether a smarter method is required for supporting HTML imports
