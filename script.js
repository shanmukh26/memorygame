class Matchthecard{
    constructor(totalTime, cards){
        this.cardsarray = cards;
        this.totalTime = totalTime;
        this.currenttime = totalTime
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }

    startgame(){
        this.cardtocheck = null;
        this.totalclicks = 0;
        this.currenttime = this.totalTime;
        this.matchedcards = [];
        this.busy = true;
        setTimeout(() => {
           this.shufflecards();
           this.time = this.starttimer();
           this.busy = false;     
        }, 1000);
        this.hidecards();
        this.timer.innerText = this.currenttime;
        this.ticker.innerText = this.totalclicks;

    }
    hidecards(){
        this.cardsarray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    getcard(card){
        return card.getElementsByClassName('card-value')[0].src;
    }
   checkformatch(card)
   {
       if(this.getcard(card) === this.getcard(this.cardtocheck))
       this.cardmatch(card, this.cardtocheck);
       else
       this.cardmis(card, this.cardtocheck);

       this.cardtocheck = null;
   }
   cardmatch(card1, card2){
       this.matchedcards.push(card1);
       this.matchedcards.push(card2);
       card1.classList.add('matched');
       card2.classList.add('matched');

if(this.matchedcards.length === this.cardsarray.length)
this.gameover();

   }
   cardmis(card1,card2)
   {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove('visible');
      card2.classList.remove('visible');
      this.busy = false;  
    }, 1000);
   }
   gameover(){
       clearInterval(this.time);
       document.getElementById('victory-text').classList.add('visible');
       document.getElementById('demo').innerHTML = this.currenttime*this.totalclicks;

   }
   shufflecards(){
       for(let i=this.cardsarray.length-1;i>0;i--){
           let rand = Math.floor(Math.random()*(i+1));
           this.cardsarray[rand].style.order = i;
           this.cardsarray[i].style.order = rand;
       }
   }

   canflip(card){
       return !this.busy && !this.matchedcards.includes(card) && card !== this.cardtocheck
   }
   flipcard(card){
       if(this.canflip(card)){
       this.totalclicks++;
       this.ticker.innerText = this.totalclicks;
       card.classList.add('visible');
       
       if(this.cardtocheck)
       this.checkformatch(card);
       else
       this.cardtocheck = card;
    }

   }
   starttimer(){
       return setInterval(() => {
           this.currenttime++;
           this.timer.innerText = this.currenttime;
       }, 1000);
   }



}


















function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Matchthecard(0, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click',() => {
            overlay.classList.remove('visible');
            game.startgame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', ()  => {
            game.flipcard(card);
        });
    } );
}




















if(document.readyState === 'loading'){
document.addEventListener('DOMContentLoaded', ready());
}else{
    ready();
}

