/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');


var foodArray = ['Everything','Indian','Italian/Pizza','Chinese','Kebab','Chippie/Fish/Chicken/American'];
for (var i=0; i < foodArray.length; i++){
  if (Settings.data(foodArray[i])>=0)
  {}
  else {Settings.data(foodArray[i],0);}
}

var main = new UI.Card({
  title: 'Hungry?',
  icon: 'images/menu_icon.png',
  subtitle: '',
  body: 'Press any button.'
});
main.show();

var i = 0;
var len = foodArray.length;
var foodlist = [''];
  for(i  = 0; i<len; i++) {
  foodlist[i] = "title: " + foodArray[i];
  }

var deliveryChoice = [
  {
    title: 'Delivery!',
  },
  {
    title: 'Collection!'
  }
];

var locationChoice = [
  {
    title: 'Near Me',
  },
  {
    title: 'Custom Postcode' //Can implement later
  }
];

var chosenFoodType;
var chosenDeliveryType;

function doMenu() {
  var LocationMenu = new UI.Menu({
     sections: [{ 
     title: 'Where to eat?',
     items: locationChoice
      
     }]
   });
   LocationMenu.on('select', function(e) {
  var menu = new UI.Menu({
     sections: [{ 
     title: 'Would you like Delivery or to Collect?',
     items: deliveryChoice
      
     }]
   });
   menu.on('select', function(e) {
     chosenDeliveryType = e.item.title;
     console.log("The string stored in chosenDeliveryType is :" + chosenDeliveryType);
   var foodChoice = new UI.Menu({
     sections: [{ 
     title: 'What do you fancy?',
     items: foodlist
      
     }]
   });
   foodChoice.on('select', function(e) {
     var foodchoice = e.item.title;
     chosenFoodType = e.item.title;     
     var frequency = Settings.data(foodchoice);
     console.log('printing frequency value '+frequency);     
     Settings.data(foodchoice,frequency + 1);/*creates and saves the new frequency*/
     console.log('printing new frequency value '+frequency);  
     console.log('frequency = '+Settings.data(foodchoice) + ' for food '+ foodchoice); /*just confirming 
     the new frequency saved to the right food type*/
     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
     console.log('The item is titled "' + e.item.title + '"');
   });
   foodChoice.show();
 });
  menu.show();
  });
  LocationMenu.show();
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