import "./css/index.css"

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccbgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

function setCardType(type) {
  const colors = {
    visa: [ '#436d99', '#2d57f2' ],
    mastercard: [ '#df6f29', '#c69347' ],
    default: [ '#000', '#ccc' ],
  }
  
  ccBgColor01.setAttribute('fill', colors[type][0]);
  ccbgColor02.setAttribute('fill', colors[type][1]);
  ccLogo.setAttribute('src', `cc-${type}.svg`);
}

setCardType('default');

globalThis.setCardType = setCardType;