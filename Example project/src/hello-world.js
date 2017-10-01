var template = `
<style>
  .custom-property-demo {
    background-color: var(--special-background-color);
  }
  .container {
    background-color: #eee;
    padding: 10px;
  }
  .children-container {
    margin: 10px;
  }
</style>
<div class='container'>
  <p>This is a Web Component being rendered inside a React app built with Create React App!</p>
  <p>It supports events (<a href='#'>click me!</a>), styling with <span class='custom-property-demo'>CSS custom properties</span>, and slots for children:</p>
  <div class='children-container'>
    <slot></slot>
  </div>
</div>
`

let Proto = Object.create(HTMLElement.prototype)

Proto.createdCallback = function() {
  const shadowRoot = this.attachShadow({ mode: 'open' })
  shadowRoot.innerHTML = template
  shadowRoot.querySelector('a').addEventListener('click', () => {
    this.dispatchEvent(new Event('linkclick'));
  })
}

document.registerElement('hello-world', { prototype: Proto })
