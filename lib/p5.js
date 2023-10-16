export class Component extends HTMLElement {
  constructor() {
    super();

    // To keep track of elements bound to specific properties
    this._bindings = {};

    this._reactiveData = new Proxy(
      {},
      {
        set: (target, property, value) => {
          target[property] = value;
          this.updateBoundElement(property, value);
          return true;
        },
      }
    );
  }

  // Web element API: Invoked when the custom element is appended to the DOM
  connectedCallback() {
    this.parseProps();

    this.innerHTML = this.render();
    this.bindDataElements();
    this.bindActions();

    console.log("end: connectedCallback");
  }

  // Use this.data within the custom component to access this._reactiveData which is internal
  get data() {
    return this._reactiveData;
  }

  parseProps() {
    const propValue = this.getAttribute("component-props");
    if (propValue) {
      try {
        if (propValue.startsWith("{") || propValue.startsWith("[")) {
          // Attempt to parse as JSON
          this.props = JSON.parse(propValue);
        } else if (propValue === "true" || propValue === "false") {
          // Parse as boolean
          this.props = propValue === "true";
        } else if (!isNaN(propValue)) {
          // Parse as number if it's a valid number
          this.props = Number(propValue);
        } else {
          // Assume string type if none of the above
          this.props = propValue;
        }
      } catch (err) {
        console.error(
          `Error parsing props from component-props attribute: ${err}`
        );
      }
    }
  }

  bindDataElements = () => {
    const dataElements = this.querySelectorAll("[component-data]");

    console.log("bindDataElements:", dataElements);

    dataElements.forEach((el) => {
      const prop = el.getAttribute("component-data").split(".").pop();
      this._bindings[prop] = el;
      this.updateBoundElement(prop, this._reactiveData[prop]);
    });

    console.log("end: bindDataElements");
  };
  updateBoundElement = (prop, value) => {
    const boundEl = this._bindings[prop];
    if (boundEl) {
      boundEl.textContent = value;
    }
  };

  bindActions = () => {
    const actionElements = this.querySelectorAll("[component-action]");

    console.log("bindActions:", actionElements);

    actionElements.forEach((el) => {
      const actionValue = el.getAttribute("component-action");
      const [eventName, action] = actionValue.split("->");

      // Dynamically bind this to ensure methods have the correct context
      const method = this[action].bind(this);
      if (typeof method === "function") {
        el.addEventListener(eventName, method);
      } else {
        console.error(`Method ${action} not found in component`);
      }
    });

    console.log("end: bindActions");
  };

  render() {
    throw new Error("Render method must be implemented by the component.");
  }
}
