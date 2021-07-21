const cowEl = document.getElementById('cow');
const grassEl = document.querySelector('#grass');
const directionsDiv = document.querySelector('#directions');
const keysDisplayEl = document.getElementById('directions__key-display');
let moveBy = 10; // move the cow 10 pixels (up, down, left or right).

(function cowStartPosition() {
   let { height, width } = window.getComputedStyle(grassEl);
   height = parseInt(height) / 2;
   width = parseInt(width) / 2;
   
   cowEl.style.position = 'absolute';
   cowEl.style.left = `${width}px`;
   cowEl.style.top = `${height}px`;
})();

// window.addEventListener('DOMContentLoaded', () => {
//    cowStartPosition();
// });
// resets the cow's position but not it's rotation
// window.addEventListener('resize', () => cowStartPosition());


// show error when user gives cow more than 10 directions
function showError(error) {
   const errorDiv = document.createElement('div');
   errorDiv.className = 'alert';
   errorDiv.append(error);
   const { textContent } = document.querySelector('#directions__key-display');

   document.querySelector('#directions__key-display').remove();
   document.getElementById('directions').append(errorDiv);

   return function() {
      setTimeout(() => {
         document.querySelector('.alert').remove();
         const keyDisplay = document.createElement('p');
         keyDisplay.id = 'directions__key-display';
         keyDisplay.textContent = textContent;
         directionsDiv.append(keyDisplay);
      }, 5000)
   }

   // hide the paragraph displaying the user's key presses
   // it exists in the DOM but doesn't take up space
   // keyDisplay.style.display = 'none';
   // the errorDiv will, in a sense, replace the hidden keyDisplay paragraph
   // directionsDiv.append(errorDiv);
   // after 5 seconds, we'll remove the erroDiv and show the keyDisplay paragraph 
   setTimeout(clearError, 5000);
}
// clear error
// function clearError() {
//    document.querySelector('.alert').remove();
//    const keyDisplay = document.createElement('p');
//    keyDisplay.className = 'directions__key-display';
//    keyDisplay.style.textContent = keysDisplayEl.style.textContent;
//    directionsDiv.append(keyDisplay);

   // keyDisplay.style.display = 'block';
// }
// convert keyboard arrow keys to cardinal directions
const cardinalDir = {
   ArrowUp: 'North',
   ArrowDown: 'South',
   ArrowRight: 'East',
   ArrowLeft: 'West'
};
const cow = {
   directions: ['North'],
   addDirection(direction) {
      this.directions.push(direction);
   }
};
window.addEventListener('keydown', e => {
   if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      if(cow.directions.length < 10) {
         keysDisplayEl.append(`${cardinalDir[e.key]} | `);
         cow.addDirection(cardinalDir[e.key]);
      }
      else {
         return showError("I'd love to stay and chat, but I'm hungry. Press Enter to mooooove me.")();
      }
   }
});

let num = 0; // will increment or decrement by 90 or 180
let key = null; // keep track of keys to determine how much to increment or decrement
cow.directions.forEach(direction => {
   switch(direction) {
      case 'North':
         if(!key) {
            cowEl.style.transform = 'rotate(0deg)';
         }
         else if(key === 'East') {
            num -= 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         else if(key === 'West') {
            num += 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         else if(key === 'South') {
            num -= 180;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         key = direction; // North
         setTimeout(() => cowEl.style.top = parseInt(cowEl.style.top) - moveBy + 'px', 1000);
         // cowEl.style.top = parseInt(cowEl.style.top) - moveBy + 'px';
      break;

      case 'East':
         if(!key || key === 'North') {
            num += 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         else if(key === 'South') {
            num -= 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         else if(key === 'West') {
            num -= 180;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         key = direction; // East
         setTimeout(() => cowEl.style.left = parseInt(cowEl.style.left) + moveBy + 'px', 2000);
         // cowEl.style.left = parseInt(cowEl.style.left) + moveBy + 'px';
      break;

      case 'South':
         if(!key || key === 'North') {
            num += 180;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         else if(key === 'East') {
            num += 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }   
         else if(key === 'West') {
            num -= 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         key = direction; // South
         cowEl.style.top = parseInt(cowEl.style.top) + moveBy + 'px';
      break;

      case 'West':
         if(!key || key === 'North') {
            num -= 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         else if(key === 'South') {
            num += 90;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         else if(key === 'East') {
            num += 180;
            cowEl.style.transform = `rotate(${num}deg)`;
         }
         key = direction; // West
         cowEl.style.left = parseInt(cowEl.style.left) - moveBy + 'px';
      break;
   }   
});





// let num = 0; // will increment or decrement by 90 or 180
// let key = null; // keep track of keys to determine how much to increment or decrement
// window.addEventListener('keydown', e => {
//    switch(e.key) {
//       case 'ArrowUp':
//          if(!key) {
//             cow.style.transform = 'rotate(0deg)';
//          }
//          else if(key === 'ArrowRight') {
//             num -= 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          else if(key === 'ArrowLeft') {
//             num += 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          else if(key === 'ArrowDown') {
//             num -= 180;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          key = e.key; // ArrowUp
//          keyDisplay.append('North | ');
//          // ex: parseInt('0deg') returns the number 0
//          cow.style.top = parseInt(cow.style.top) - moveBy + 'px';
//       break;

//       case 'ArrowRight':
//          if(!key || key === 'ArrowUp') {
//             num += 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          else if(key === 'ArrowDown') {
//             num -= 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          else if(key === 'ArrowLeft') {
//             num -= 180;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          key = e.key; // ArrowRight
//          keyDisplay.append('East | ');
//          cow.style.left = parseInt(cow.style.left) + moveBy + 'px';
//       break;
      
//       case 'ArrowDown':
//          if(!key || key === 'ArrowUp') {
//             num += 180;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          else if(key === 'ArrowRight') {
//             num += 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }   
//          else if(key === 'ArrowLeft') {
//             num -= 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          key = e.key; // ArrowDown
//          keyDisplay.append('South | ');
//          cow.style.top = parseInt(cow.style.top) + moveBy + 'px';
//       break;

//       case 'ArrowLeft':
//          if(!key || key === 'ArrowUp') {
//             num -= 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          else if(key === 'ArrowDown') {
//             num += 90;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          else if(key === 'ArrowRight') {
//             num += 180;
//             cow.style.transform = `rotate(${num}deg)`;
//          }
//          key = e.key; // ArrowLeft
//          keyDisplay.append('West | ');
//          cow.style.left = parseInt(cow.style.left) - moveBy + 'px';
//       break;
//    }
// });
