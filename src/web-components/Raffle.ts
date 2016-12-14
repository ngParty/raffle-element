export class Raffle extends HTMLElement {
  static get is() { return 'ng-party-raffle' }

  static get template() {
    return (`
      <div>Hello custom element</div> 
    `)
  }

  constructor(){
    super();
    this.innerHTML = Raffle.template;
  }
}

customElements.define( Raffle.is, Raffle );
