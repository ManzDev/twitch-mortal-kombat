class BlockStone extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        width: var(--stone-width);
        height: var(--stone-height);
        background-image: url(assets/stone.png);

        display: grid;
        grid-template-columns: 1.3fr 0.7fr;
        justify-content: center;
        align-items: center;
      }

      .data {
        width: 100%;
        height: 100%;
        font-family: EnterCommand;
        font-weight: bold;
        font-size: 22px;
        text-shadow: 2px 2px 0 #000;
        color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .picture-container {
        width: 100%;
        height: 100%;

        display: grid;
        justify-content: center;
        align-items: center;
      }

      .picture {
        --width: 45px;
        --height: 45px;

        width: var(--width);
        height: var(--height);

        transform: translate(-6px, 2px);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  setUser(user) {
    this.name = user.name;
    this.picture = user.picture;
  }

  getName(size = 10) {
    return this.name.length > size ? this.name.substring(0, size) + "..." : this.name;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BlockStone.styles}</style>
    <div class="container">
      <div class="data">
        <span>${this.getName()}</span>
      </div>
      <div class="picture-container">
        <img class="picture" src="${this.picture}" alt="${this.name}">
      </div>
    </div>`;
  }
}

customElements.define("block-stone", BlockStone);
