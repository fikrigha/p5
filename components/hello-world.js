import { Component } from "/lib/p5.js";

class HelloWorld extends Component {
  render() {
    return `<div>Hello World</div>`;
  }
}

customElements.define("hello-world", HelloWorld);
