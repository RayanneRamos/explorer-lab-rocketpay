import "./css/index.css";
import IMask from 'imask';

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccbgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

function setCardType(type) {
  const colors = {
    visa: [ '#436d99', '#2d57f2' ],
    mastercard: [ '#df6f29', '#c69347' ],
    americanExpress: [ '#2e77bb', '#98d4f5' ],
    discover: [ '#000', '#e55c20' ],
    jcb:  [ '#e7c63d', '#009fe1' ],
    maestro: [ '#3a9bd9', '#cc2131' ],
    unionPay: [ '#01798a', '#fff' ],
    bmg: [ '#e5a430', '#fff' ],
    bancoDoBrasil: [ '#ffef38', '#ffef38' ],
    nubank: [ '#8a05be', '#8a05be' ],
    santander: ['#ea1d25', '#fff' ],
    elo: ['#ef4123', '#000'],
    hipercard: [ '#822124', '#fff' ],
    alelo: [ '#007858', '#7fbbab' ],
    citibank: [ '#cc2131', '#436d99' ],
    diners: [ '#2d4f9e', '#fff' ],
    itau: [ '#ff7200', '#f79c60' ],
    bradesco: [ '#cc2229', '#fff' ],
    caixa: [ '#0d6fab', '#fff' ],
    hsbc: [ '#d80011', '#436d99' ],
    crefisa: [ '#006437', '#fff' ],
    paypal: [ '#253b80', '#179bd7' ],
    c6bank: [ '#c5c5c5', '#c5c5c5' ],
    next: [ '#0cff8b', '#00a000' ],
    inter: [ '#ff4a00', '#fff' ],
    neon: [ '#00a5f0', '#00a5f0' ],
    default: [ '#000', '#ccc' ],
  }
  
  ccBgColor01.setAttribute('fill', colors[type][0]);
  ccbgColor02.setAttribute('fill', colors[type][1]);
  ccLogo.setAttribute('src', `cc-${type}.svg`);
}

setCardType('default');

globalThis.setCardType = setCardType;

const securityCode = document.querySelector('#security-code');
const securityCodePattern = {
  mask: '0000',
}
const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.querySelector('#expiration-date');
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector('#card-number');
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa',
    }, 
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: 'mastercard',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^3[47]\d{0,13}/,
      cardtype: 'americanExpress',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: 'discover', 
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: 'diners', 
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^3(?:35\d{0,2})\d{0,12}/,
      cardtype: 'jcb',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: 'maestro',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^62\d{0,14}/,
      cardtype: 'unionPay',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^1\d{0,15}/,
      cardtype: 'bmg',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^2\d{0,15}/,
      cardtype: 'bancoDoBrasil',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^3\d{0,15}/,
      cardtype: 'nubank',
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default',
    },
  ],
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
      return number.match(item.regex);
    });

   return foundMask;
  }
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

const addButton = document.querySelector('#add-card');
addButton.addEventListener('click', () => {
  alert('Cartão adicionado com sucesso!');
});

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
});

const cardHolder = document.querySelector('#card-holder');
cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value');
  ccHolder.innerText = cardHolder.value.length === 0 ? 'Fulano da Silva' : cardHolder.value; 
});

securityCodeMasked.on('accept', () => {
  updateSecurityCode(securityCodeMasked.value);
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector('.cc-security .value');
  ccSecurity.innerText = code.length === 0 ? '123' : code;
}

cardNumberMasked.on('accept', () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype;
  setCardType(cardType);
  updateCardNumber(cardNumberMasked.value);
});

function updateCardNumber(number) {
  const ccNumberCard = document.querySelector('.cc-number');
  ccNumberCard.innerText = number.length === 0 ? '1234 5678 9012 3456' : number;
}

expirationDateMasked.on('accept', () => {
  updateExpirationDate(expirationDateMasked.value);
})

function updateExpirationDate(date) {
  const ccExpirationDate = document.querySelector('.cc-extra .cc-expiration .value');
  ccExpirationDate.innerText = date.length === 0 ? '02/32' : date;
}