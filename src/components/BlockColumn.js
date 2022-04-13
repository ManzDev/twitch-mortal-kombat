import { Howl } from "howler";
import "./BlockStone.js";

const sounds = {
  destiny: new Audio("sounds/destiny.mp3"),
  mkloop: new Howl({
    src: ["sounds/mk3loop.mp3"],
    loop: true
  }),
};

class BlockColumn extends HTMLElement {
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
        transform-origin: 50% 0%;
        scale: 0.5;
        translate: 0% 0%;
        transition:
          scale 1s linear,
          translate 30s linear 3s;
      }

      :host(.zoom) .container {
        scale: 1;
        translate: 0% calc(-100% + 380px);
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.renderUsers();
    const container = this.shadowRoot.querySelector(".container");
    container.addEventListener("click", () => this.init());
  }

  init() {
    const idMusic = sounds.mkloop.play();
    sounds.mkloop.fade(0, 0.5, 2000, idMusic);
    this.classList.toggle("zoom");
    setTimeout(() => sounds.destiny.play(), 1000);
  }

  setUsers(users) {
    this.users = users;
  }

  renderUsers() {
    const container = this.shadowRoot.querySelector(".container");
    this.users.forEach(user => {
      const stone = document.createElement("block-stone");
      stone.setUser(user);
      container.appendChild(stone);
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BlockColumn.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("block-column", BlockColumn);
