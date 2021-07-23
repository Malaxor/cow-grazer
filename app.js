const cowEl = document.getElementById('cow');
const grassEl = document.querySelector('#grass');
const directionsDiv = document.querySelector('#directions');
const keysDisplayEl = document.getElementById('directions__key-display');
const alertDiv = document.getElementsByClassName('alert')[0];
let moveBy = 10; // move the cow 10 pixels (up, down, left or right).
const { height: cowElHeight } = window.getComputedStyle(cowEl);
let { height: grassElHeight, width: grassElWidth } = window.getComputedStyle(grassEl);

// cow's start position predicated on the field's length and width divided by two
function cowStartPosition({ height, width }) {
   height = parseInt(height) / 2;
   width = parseInt(width) / 2;

   cowEl.style.position = 'absolute';
   cowEl.style.left = `${width}px`;
   cowEl.style.top = `${height}px`;
}
// load cow's start position
cowStartPosition(window.getComputedStyle(grassEl))
// resets the cow's position but not it's rotation
window.addEventListener('resize', () => {
   cowStartPosition(window.getComputedStyle(grassEl));
   window.getComputedStyle(grassEl);
   cowEl.getBoundingClientRect();
});

// show error when user gives cow more than 10 directions
function showError(error) {
   // hide the user's keyboard input
   keysDisplayEl.style.display = 'none';
   alertDiv.textContent = error;
   // reveal the alert div and its text content
   alertDiv.style.display = 'block';
   setTimeout(clearError, 5000)
}
function clearError() {
   alertDiv.style.display = 'none';
   keysDisplayEl.style.display = 'block';
}

let degrees = 0; // will increment or decrement by 90 or 180
let direction = null; // keep track of the direction (key arrows) to determine how much to increment or decrement
window.addEventListener('keydown', e => {
   const { right: cowElRight } = cowEl.getBoundingClientRect();

   switch(e.key) {
      case 'ArrowUp':
         if(!direction) {
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'East') {
            degrees -= 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'West') {
            degrees += 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'South') {
            degrees -= 180;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         direction = 'North';
         // code inside won't fire when the cow arrives at the field's North edge
         if(parseInt(cowEl.style.top) > 5) {
            cowEl.style.top = parseInt(cowEl.style.top) - moveBy + 'px';
         }
         else {
            showError("I don't believe in Santa Clause.");
         }
      break;
      case 'ArrowRight':
         if(!direction || direction === 'North') {
            degrees += 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'South') {
            degrees -= 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'West') {
            degrees -= 180;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         direction = 'East';
         // code inside won't fire when the cow arrives at the field's East edge
         if(cowElRight + 3 < parseInt(grassElWidth)) {
            cowEl.style.left = parseInt(cowEl.style.left) + moveBy + 'px';
         }
         else {
            showError("The east coast is not my thing, chief.");
         }
      break;
      case 'ArrowDown':
         if(!direction || direction === 'North') {
            degrees += 180;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'East') {
            degrees += 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }   
         else if(direction === 'West') {
            degrees -= 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         direction = 'South';
         // this formula ensures the cow stops a few pixels before the field's South edge
         if(parseInt(cowEl.style.top) < (parseInt(grassElHeight) - parseInt(cowElHeight) - 5)) {
            cowEl.style.top = parseInt(cowEl.style.top) + moveBy + 'px';
         }
         else {
            showError("It's too hot down south.")
         }
      break;
      case 'ArrowLeft':
         if(!direction || direction === 'North') {
            degrees -= 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'South') {
            degrees += 90;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         else if(direction === 'East') {
            degrees += 180;
            cowEl.style.transform = `rotate(${degrees}deg)`;
         }
         direction = 'West'; // West
         // this formula ensures the cow stops a few pixels before the field's West edge
         if(parseInt(cowEl.style.left) > 5) {
            cowEl.style.left = parseInt(cowEl.style.left) - moveBy + 'px';
         }
         else {
            showError("I can't afford California!");
         }
      break;
   }
});
