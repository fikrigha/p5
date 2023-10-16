import { Component } from "/lib/p5.js";

class CounterApp extends Component {
  constructor() {
    super();
    this.data.count = 0; // Use the reactive data here
  }

  increase = () => {
    console.log("increase");
    this.data.count++;
  };

  decrease = () => {
    console.log("decrease");
    this.data.count--;
  };

  render() {
    return `
        <div>
            <button component-action="click->decrease">-</button>
            <span component-data="count">${this.data.count}</span>
            <button component-action="click->increase">+</button>
        </div>
    `;
  }
}

customElements.define("counter-app", CounterApp);
