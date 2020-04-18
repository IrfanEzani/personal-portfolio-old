const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return ; //to lock board
  if (this === firstCard) return; //to avoid double click by holding the first card
  this.classList.add('flip')

  if (!hasFlippedCard) {

    //first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second click
    secondCard = this;


  checkForMatch();
  }
}

function checkForMatch() {
  //check cards match
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
    isMatch ? disableCards() : unflipCards()
}


function disableCards() {
  //if cards match
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  reset();
}

function unflipCards() {
  //if cards dont match
  lockBoard = true;
  setTimeout(() =>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

  reset();
  }, 500);
}

function reset() {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
};

(function shuffle() {
  cards.forEach(card  => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
