import './polyfills';
import './style.css'

const mountPoint = document.getElementById('app');

const App = () => (
  `<div>
    <header>
      <nav class="c-nav c-nav--inline c-nav--high">
        <span class="c-nav__item" onclick="history.back()">Home</span>
        <span class="c-nav__item c-nav__item--right">About</span>
      </nav>
      <div class="c-hero u-letter-box--super u-centered">
        <h1 class="c-heading c-heading--xlarge u-window-box--none">Welcome</h1>
        <h2 class="c-heading c-heading--small u-window-box--none c-text--quiet">ngParty </h2>
      </div>
    </header>
    <main class="o-container o-container--large u-pillar-box--small">
     <h1 class="u-centered">Raffle time!</h1>
    </main>
   </div>`
);


render( App, mountPoint );


function render( root: Function, where: HTMLElement | null ) {
  if ( where == null ) {
    throw new Error( 'no mount point found' );
  }
  where.innerHTML = root();
}