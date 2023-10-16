export class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    throw new Error("Render method must be implemented by the component.");
  }
}
