/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');
var vector2 = require('vector2');

var foodArray = ["Everything", "Indian", "Italian/Pizza", "Chinese", "Kebab", "Chippie/Fish/Chicken/American"];

var foodlist = [
   {
     title: foodArray[0],
     subtitle: ""
   },
   {
     title: foodArray[1],
     subtitle: ""
   },
   {
     title: foodArray[2],
     subtitle: ""
   },
   {
     title: foodArray[3],
     subtitle: ""
   },
   {
     title: foodArray[4],
     subtitle: ""
   },
   {
     title: foodArray[5],
     subtitle: ""
   }
];

var deliveryChoice = [
  {
    title: 'Delivery!',
  },
  {
    title: 'Collection!'
  }
];
var main = new UI.Card({
  title: 'Hungry?',
  icon: 'images/menu_icon.png',
  subtitle: '',
  body: 'Press any button.'
});
main.show();

function doMenu() {
  var menu = new UI.Menu({
     sections: [{ 
     title: 'Would you like Delivery or to Collect?',
     items: deliveryChoice
      
     }]
   });
   menu.on('select', function(e) {
   var foodChoice = new UI.Menu({
     sections: [{ 
     title: 'What do you fancy?',
     items: foodlist
      
     }]
   });
   foodChoice.on('select', function(e) {
     var foodchoice = e.item.title;
     Settings.config(foodchoice);

     var frequency = Settings.data(foodchoice);
     Settings.data=(foodchoice,frequency++);
     console.log('frequency = '+Settings.data(foodchoice) + ' for food '+ foodchoice);
     console.log(foodchoice);
     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
     console.log('The item is titled "' + e.item.title + '"');
   });
   foodChoice.show();
 });
  menu.show();
}

 /*foodmenu = ParseFeed(foodlist)*/

main.on('click', 'up', function(e) {
   doMenu();
});


 main.on('click', 'select', function(e) {
  doMenu();
});

main.on('click', 'down', function(e) {
   doMenu();
});