import React, { Component } from 'react'
import HelloWorld from './HelloWorld.js'

class App extends Component {
  handleLinkClick() {
    alert('Events are supported!')
  }
  render() {
    return (
      <HelloWorld
        style={{ '--special-background-color': 'lightblue' }}
        onLinkClick={ this.handleLinkClick }
      >
        <div style={{ backgroundColor: 'lightgreen' }}>
          I am a React Component being rendered as a child via slots!
        </div>
      </HelloWorld>
    );
  }
}

export default App;
