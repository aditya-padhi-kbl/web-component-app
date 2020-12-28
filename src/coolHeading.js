class CoolHeading extends HTMLElement {
  connectedCallback() {
    console.log('cool heading connected!');
  }
}

customElements.define('cool-heading', CoolHeading);
