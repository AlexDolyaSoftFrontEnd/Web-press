const body = document.querySelector('body');
const navComponent = document.createElement('vallek-shower-nav');
body.appendChild(navComponent);
const template = document.createElement("template");
template.innerHTML = `
<style>
/* ==================================================
Navigation
================================================== */
.nav {
--nav-gap: 0.5em;
--nav-size: 2.5em;

font-size: revert;
display: flex;
flex-wrap: wrap;
gap: var(--nav-gap);

margin: 0.6em 0.6em 0.4em;

opacity: 0.6;
transition: opacity 0.2s ease;
}

/* Hover / focus */
.nav:hover,
.nav:focus-within {
opacity: 1;
}

/* ==================================================
Shower modes
================================================== */
.shower.list .nav {
display: none;
}

.shower.full .nav {
display: flex;
}

/* ==================================================
Buttons
================================================== */
.nav__btn {
width: var(--nav-size);
height: var(--nav-size);

display: inline-flex;
align-items: center;
justify-content: center;

cursor: pointer;
user-select: none;

background: transparent;
border: none;

font-size: 1em;
line-height: 1;
}

/* Keyboard accessibility */
.nav__btn:focus-visible {
outline: 2px solid currentColor;
outline-offset: 2px;
}

/* ==================================================
Reduced motion
================================================== */
@media (prefers-reduced-motion: reduce) {
.nav {
transition: none;
}
}
</style>
<nav class="nav">
<button class="nav__btn nav__btn_back" type="button" aria-label="Предыдущий слайд (стрелка влево)" title="Предыдущий слайд (стрелка влево)">&#10094;</button>
<button class="nav__btn nav__btn_all" type="button" aria-label="Все слайды (Esc)" title="Все слайды (Esc)">&#10006;</button>
<button class="nav__btn nav__btn_forward" type="button" aria-label="Следующий слайд (стрелка вправо)" title="Следующий слайд (стрелка вправо)">&#10095;</button>
</nav>
`;

class vallekShowerNav extends HTMLElement {
constructor() {
super();
this.attachShadow({ mode: 'open' });	
this.shadowRoot.appendChild(template.content.cloneNode(true));
}

connectedCallback() {
let script = document.createElement('script');
script.textContent = /*js*/`
  customElements.whenDefined('vallek-shower-nav').then(() => {
    const body = document.querySelector('body');
    const vallekNav = document.querySelector('vallek-shower-nav');
    const vallekNavDOM = vallekNav.shadowRoot;
    const navBack = vallekNavDOM.querySelector('.nav__btn_back');
    const navForward = vallekNavDOM.querySelector('.nav__btn_forward');
    const navAll = vallekNavDOM.querySelector('.nav__btn_all');

    const backEvent = new KeyboardEvent("keydown", {
      key: "ArrowLeft",
      keyCode: 37,
      which: 37
    });
    navBack.addEventListener('click', (el) => {
      document.dispatchEvent(backEvent);
    });

    const forwardEvent = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      keyCode: 39,
      which: 39
    });
    navForward.addEventListener('click', (el) => {
      document.dispatchEvent(forwardEvent);
    });

    const allEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
      which: 27
    });
    navAll.addEventListener('click', (el) => {
      document.dispatchEvent(allEvent);
    });
  });
`;
this.shadowRoot.appendChild(script);
}
}

customElements.define('vallek-shower-nav', vallekShowerNav);


