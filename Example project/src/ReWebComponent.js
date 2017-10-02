import React, { Component } from "react";
import PropTypes from "prop-types";

const isNameOfEventHandler = propName => /^on[A-Z]/.test(propName);
const isCustomProperty = propertyName => /^--.*/.test(propertyName);

const getAttrsToPass = props => {
  const propsToNotPassDirectly = [
    "children",
    "className",
    "extends",
    "importHref",
    "tag",
    "ref",
    "style"
  ];

  let attrs = {};

  Object.keys(props).forEach(propName => {
    if (
      propsToNotPassDirectly.indexOf(propName) < 0 &&
      !isNameOfEventHandler(propName)
    ) {
      const propRawValue = props[propName];

      if (typeof propRawValue === "object") {
        attrs[propName] = JSON.stringify(propRawValue);
      } else {
        attrs[propName] = propRawValue;
      }
    }
  });

  return attrs;
};

class WebComponent extends Component {
  static defaultProps = {
    className: "",
    style: {},
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    extends: PropTypes.string,
    importHref: PropTypes.string,
    tag: PropTypes.string.isRequired
  };

  constructor() {
    super();

    this._wcEventListeners = {};
  }

  componentDidMount() {
    Object.keys(this.props).forEach(propName => {
      if (isNameOfEventHandler(propName)) {
        const handler = (...args) => {
          this.props[propName].apply(null, args);
        };

        const eventName = propName.substr(2).toLowerCase();
        this._wcEventListeners[eventName] = handler;
        this._wcEl.addEventListener(eventName, handler);

        // Some events are fired with hyphens, e.g. 'selected-changed' so listen for these too
        const eventNameWithHyphens = propName.substr(2).split(/(?=[A-Z])/).join('-').toLowerCase();
        // Don't double listen if this would be the same listener
        if (eventNameWithHyphens !== eventName) {
          this._wcEl.addEventListener[eventNameWithHyphens] = handler;
          this._wcEl.addEventListener(eventNameWithHyphens, handler);
        }
      }
    });

    Object.keys(this.props.style).forEach(property => {
      if (isCustomProperty(property)) {
        this._wcEl.style.setProperty(property, this.props.style[property]);
      }
    });
  }

  componentWillUnmount() {
    Object.keys(this._wcEventListeners).forEach(eventName => {
      this._wcEl.removeEventListener(
        eventName,
        this._wcEventListeners[eventName]
      );
    });
  }

  render() {
    const attrsToPass = getAttrsToPass(this.props);

    const TagName = this.props.extends ? this.props.extends : this.props.tag;

    const WebComponent = (
      <TagName
        class={this.props.className}
        ref={wcEl => (this._wcEl = wcEl)}
        style={this.props.style}
        {...attrsToPass}
      >
        {this.props.children}
      </TagName>
    );

    if (this.props.importHref !== undefined) {
      return [<link rel="import" href={this.props.importHref} />, WebComponent];
    }

    return WebComponent;
  }
}

const ReactComponentForWebComponent = ({ tag, importHref }) => {
  return (props) => {
    return (
      <WebComponent
        tag={tag}
        importHref={importHref}
        {...props}
      >
        {props.children}
      </WebComponent>
    )
  }
}

// Export a builder function that either the web components tag as a string, or an object containing the tag and the HTML import HREF
export default (...args) => {
  if (typeof args[0] === 'string') {
    return ReactComponentForWebComponent({ tag: args[0] })
  } else {
    return ReactComponentForWebComponent(args[0])
  }
}
