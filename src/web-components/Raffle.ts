import style from './Raffle.css';

export class Raffle extends HTMLElement {
  static get is() { return 'ng-party-raffle' }

  static get template() {
    return (`
      <style>${style}</style>
      <div>Hello custom element</div>
      <form id="participants-form">
        <fieldset class="o-fieldset">
          <div class="o-form-element">
            <label class="c-label" for="participants">Address line 1:</label>
            <textarea id="participants" class="c-field" placeholder="insert attendes here" rows="5"></textarea>
          </div>
          <div class="o-form-element">
            <button class="c-button">Add participants</button>
          </div>
        </fieldset>
      </form>
      <hr>
      <div class="text-center">
        <div>            
          <div id="participants-count" class="c-alert c-alert--info">            
            42 participants added !
          </div>
          <button id="start-raffle" class="c-button c-button--success c-button--block u-super">Get winner</button>
        </div>
        <h2>Winners:</h2>
        <ul id="raffle-winners" class="c-list c-list--unstyled u-super">
          <li class="c-list__item">Lorem ipsum dolor sit amet</li>
          <li class="c-list__item">Consectetur adipiscing elit</li>
          <li class="c-list__item">Nulla volutpat aliquam velit</li>
         </ul>  
      </div>
    `)
  }

  constructor(){
    super();
    const shadowRoot = this.attachShadow( { mode: 'open' } );
    shadowRoot.innerHTML = Raffle.template;
  }
}

customElements.define( Raffle.is, Raffle );
