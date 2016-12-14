import style from './Raffle.css';

type State = {
  participants?: string[],
  winners?: string[],
}

export class Raffle extends HTMLElement {
  static get is() { return 'ng-party-raffle' }

  static get template() {
    return (`
      <style>${style}</style>
      <form id="${Raffle.refIds.participantsForm}">
        <fieldset class="o-fieldset">
          <div class="o-form-element">
            <label class="c-label" for="participants">Add participants</label>
            <textarea id="${Raffle.refIds.participants}" class="c-field" placeholder="insert attendees here" rows="5"></textarea>
          </div>
          <div class="o-form-element">
            <button class="c-button">Add participants</button>
          </div>
        </fieldset>
      </form>
      <hr>
      <div class="text-center" style="padding-bottom: 8rem">
        <div>            
          <div id="${Raffle.refIds.participantsCount}" class="c-alert c-alert--info" hidden>            
          </div>
          <button id="${Raffle.refIds.startRaffle}" class="c-button c-button--success c-button--block u-super">Get winner</button>
        </div>
        <h2>Winners:</h2>
        <ul id="${Raffle.refIds.raffleWinners}" class="c-list c-list--unstyled u-super">     
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

  private state: State;

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

    this.state = {
      participants: [],
      winners: []
    };

    this.handleParticipantsAddition = this.handleParticipantsAddition.bind(this);
    this.handleStartRaffleWinner = this.handleStartRaffleWinner.bind(this);

    this.refs.participantsForm.addEventListener( 'submit', this.handleParticipantsAddition );
    this.refs.startRaffle.addEventListener('click', this.handleStartRaffleWinner);
  }

  private handleStartRaffleWinner( event: Event ) {
    setTimeout( () => {
      this.pickWinner();
      this.render();
    }, 3000 )
  }

  private pickWinner(){

    if(!Array.isArray(this.state.participants)){
      throw new Error('you have to provide participants');
    }
    if(!Array.isArray(this.state.winners)){
      throw new Error('you have to provide winners');
    }

    const participantsCount = this.state.participants.length;
    const winner = this.state.participants[ Math.floor( Math.random() * participantsCount ) ];
    console.log( 'before:', this.state.participants, this.state.winners );
    this.setState( {
      winners: [...this.state.winners,winner],
      participants: this.state.participants.filter( participant => participant !== winner )
    } );
    console.log( 'after:', this.state.participants, this.state.winners );

  }
  private handleParticipantsAddition( event: Event ) {
    event.preventDefault();
    const participants = processTextarea( this.refs.participants.value );
    this.setState( { participants } );
    this.refs.participants.value = '';

    this.render();

    function processTextarea( value: string ): string[] {
      return value.split( '\n' ).map( participant => participant.trim() ).filter(participant=>participant.length)
    }
  }

  private setState( newState: State ) {
    this.state = Object.assign( {}, this.state, newState )
  }

  private render(){
    this.refs.participantsCount.innerText = `${this.state.participants!.length} participants added !`;
    this.refs.participantsCount.hidden = false;

    if ( this.state.winners!.length !== this.refs.raffleWinners.childElementCount ) {
      this.refs.raffleWinners.appendChild( renderWinner( this.state.winners![ this.state.winners!.length - 1 ] ) )
    }

    function renderWinner( name: string ): HTMLLIElement {
      const li = document.createElement( 'li' );
      li.classList.add( 'c-list__item' );
      li.textContent = name;
      return li;
    }
  }
}

customElements.define( Raffle.is, Raffle );
