import { Component } from "/lib/p5.js";

class AppMenu extends Component {
  constructor() {
    super();
    this.data.menu = [
      { label: "Dashboard", link: "#dashboard" },
      { label: "Settings", link: "#settings" },
    ];
  }

  render() {
    return `
        <nav>
          ${this.data.menu
            .map(
              (menu) =>
                `<menu-item component-props='${JSON.stringify(menu)}'>
                </menu-item>`
            )
            .join("")}
        </nav>
    `;
  }
}
customElements.define("app-menu", AppMenu);

class MenuItem extends Component {
  constructor() {
    super();
  }

  render() {
    return `<a href="${this.props.link}">${this.props.label}</a>`;
  }
}
customElements.define("menu-item", MenuItem);
