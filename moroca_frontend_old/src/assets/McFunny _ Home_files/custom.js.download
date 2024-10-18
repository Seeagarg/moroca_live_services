'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var cardsLength = allCards.length;
var divLength = 0;
var nope = document.getElementById('nope');
var love = document.getElementById('love');

var flag = false;
var divflage = false;
function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
	 if ($("#tin").hasClass("tinder_nope")) {
		   window.flag = true;
	  }else{
		  window.flag = false;
	  }
	  
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

var keep = "";
var moveOutWidth = document.body.clientWidth;
console.log('window.divLength',window.divLength)
console.log('window.cardsLength',window.cardsLength)
if(window.divLength+1==window.cardsLength){
	keep = true;
}
else {
	keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
}
    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
	
	  var newdivLength = window.divLength;
	 
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;
	  if(window.flag){
		 
	  }else{
		console.log(newdivLength);
		 if (newdivLength !=0){
			var value = $('#swap'+newdivLength+'').html();
		    window.location.href = "AllVideos.jsp?id="+value;
		}  
	  }
      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
	  
	  var newallCards = document.querySelectorAll('.tinder--card');
	  var newLength = newallCards.length;
	 // alert(newLength); 
	  
	  window.divLength = newdivLength+1;
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}
