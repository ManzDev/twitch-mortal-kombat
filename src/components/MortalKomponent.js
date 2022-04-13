import "./BlockColumn.js";

class MortalKomponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 640px;
        --height: 407px;
        --stone-width: 192px;
        --stone-height: 95px;

        background-color: #000;
        display: inline-block;
        padding: 30px 0;
        position: relative;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background-image: url(backgrounds/vortex.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        overflow: hidden;

        display: flex;
        flex-direction: column;
      }

      .logo {
        --size: 45px;

        width: var(--size);
        height: var(--size);
        background: url(assets/mklogo.gif);
        background-size: cover;
        image-rendering: pixelated;
        position: absolute;
        right: 2%;
        bottom: 8%;
      }

      .title {
        font-family: "Mortal Kombat 3";
        font-weight: normal;
        font-size: 20px;
        text-transform: uppercase;
        font-style: italic;
        text-shadow: 3px 3px 5px #000;
        color: #fff;
        margin: 0;
        text-align: center;
        transform: translateY(2px);
      }

      .columns {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.fetchUsers();
  }

  fetchUsers() {
    fetch("http://localhost:9999/api/users")
      .then(response => response.json())
      .then(users => {
        const promises = users.map(name =>
          fetch(`http://localhost:9999/api/userinfo/${name}`)
            .then(response => response.json())
            .then(({ name, picture }) => ({ name, picture }))
        );
        Promise.all(promises).then(data => {
          this.addColumns(data);
        });
      });
  }

  addColumns(users) {
    const size = users.length;
    const columns = [
      users.slice(0, size / 3),
      users.slice(size / 3, size / 3 * 2),
      users.slice(size / 3 * 2, size)
    ];
    /*
    const columns = [
      users.slice(0, size / 6),
      users.slice(size / 6, size / 2),
      users.slice(size / 2, size)
    ]; */
    columns.forEach(users => {
      const blockColumn = document.createElement("block-column");
      blockColumn.setUsers(users);
      this.shadowRoot.querySelector(".columns").appendChild(blockColumn);
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${MortalKomponent.styles}</style>
    <div class="container">
      <h1 class="title">Choose your destiny</h1>
      <div class="columns"></div>
      <div class="logo"></div>
    </div>`;
  }
}

customElements.define("mortal-komponent", MortalKomponent);
