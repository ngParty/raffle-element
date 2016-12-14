import style from './Raffle.css';

export class Raffle extends HTMLElement {
  static get is() { return 'ng-party-raffle' }

  static get template() {
    return (`
      <style>${style}</style>
      <div>Hello custom element</div>
      <form id="${Raffle.refIds.participantsForm}">
        <fieldset class="o-fieldset">
          <div class="o-form-element">
            <label class="c-label" for="participants">Address line 1:</label>
            <textarea id="${Raffle.refIds.participants}" class="c-field" placeholder="insert attendes here" rows="5"></textarea>
          </div>
          <div class="o-form-element">
            <button class="c-button">Add participants</button>
          </div>
        </fieldset>
      </form>
      <hr>
      <div class="text-center">
        <div>            
          <div id="${Raffle.refIds.participantsCount}" class="c-alert c-alert--info">            
            42 participants added !
          </div>
          <button id="${Raffle.refIds.startRaffle}" class="c-button c-button--success c-button--block u-super">Get winner</button>
        </div>
        <h2>Winners:</h2>
        <ul id="${Raffle.refIds.raffleWinners}" class="c-list c-list--unstyled u-super">
          <li class="c-list__item">Lorem ipsum dolor sit amet</li>         
        </ul>  
      </div>
    `)
  }
  static get refIds(){
    return {
      participantsForm: 'participants-form',
      participants: 'participants',
      participantsCount: 'participants-count',
      startRaffle: 'start-raffle',
      raffleWinners: 'raffle-winners',
    }
  }

  private refs: {
    participantsForm: HTMLFormElement,
    participants: HTMLTextAreaElement,
    participantsCount: HTMLDivElement,
    startRaffle: HTMLButtonElement,
    raffleWinners: HTMLUListElement,
  };

  constructor(){
    super();
    const shadowRoot = this.attachShadow( { mode: 'open' } );
    shadowRoot.innerHTML = Raffle.template;

    this.refs = {
      participantsForm: shadowRoot.querySelector(`#${Raffle.refIds.participantsForm}`) as HTMLFormElement,
      participants: shadowRoot.querySelector(`#${Raffle.refIds.participants}`) as HTMLTextAreaElement,
      participantsCount: shadowRoot.querySelector(`#${Raffle.refIds.participantsCount}`) as HTMLDivElement,
      startRaffle: shadowRoot.querySelector(`#${Raffle.refIds.startRaffle}`) as HTMLButtonElement,
      raffleWinners: shadowRoot.querySelector(`#${Raffle.refIds.raffleWinners}`) as HTMLUListElement,
    };
  }
}

customElements.define( Raffle.is, Raffle );
