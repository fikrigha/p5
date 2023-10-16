import { Component } from "/lib/p5.js";

customElements.define(
  "simple-list",
  class SimpleList extends Component {
    constructor() {
      super();
      this.data.celticsPlayers = [
        { firstName: "Rajon", lastName: "Rondo" },
        { firstName: "Kevin", lastName: "Garnett" },
        { firstName: "Ray", lastName: "Allen" },
      ];
    }

    render() {
      return `
        <ul>
          ${this.data.celticsPlayers
            .map(
              (player) =>
                `<list-item component-props='${JSON.stringify(player)}'>
                </list-item>`
            )
            .join("")}
        </ul>
    `;
    }
  }
);

customElements.define(
  "list-item",
  class ListItem extends Component {
    constructor() {
      super();
    }

    render() {
      return `<li>${this.props.firstName} ${this.props.lastName}</li>`;
    }
  }
);
