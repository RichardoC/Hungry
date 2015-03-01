/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');

var baseURL = "http://www.just-eat.co.uk/area/";
var postCode = "WC2R";
var foodArray = ['Everything','Indian','Italian/Pizza','Chinese','Kebab','Chippie/Fish/Chicken/American'];
var searchArray = ["/","/indian","italian"]; //Elements must refer to same element as in foodArray for search
for (var i=0; i < foodArray.length; i++){
  if (Settings.data(foodArray[i])>=0)
  {}
  else {Settings.data(foodArray[i],0);}
}

function sortby(array1,sortarray) {
  /* Sorts the first array by the second numerical array*/
  var maxi = sortarray[0];
  var coord = 0;
  var outarray = [];
  while (maxi!=-1){  /*keeps looping until all elements used*/
    for (var i=0; i < array1.length; i++){ /*loops over the entire sort array to make sure all elements used*/
      if (sortarray[i]>maxi){
        maxi = sortarray[i];
        coord = i;

    }
    outarray.push(array1[coord]);
    sortarray[coord]=-1;
}
}
  return outarray;
}
function smenu(){
  var freqarray = [];
  for (var i=0; i < foodArray.length; i++){
    freqarray.push(Settings.data(foodArray[i]));
  }
  var sortedmenu = sortby(foodArray,freqarray);
  return sortedmenu;
}


//Lets sort the food array due to frequency
var main = new UI.Card({
  title: 'Hungry?',
  icon: 'images/menu_icon.png',
  subtitle: '',
  body: 'Press any button.'
});
main.show();

var i = 0;
var len = foodArray.length;
var sortedmenu = smenu();
var foodlist = [''];
  for(i  = 0; i<len; i++) {
  foodlist[i] = "title: " + sortedmenu[i];
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
var finalURL = baseURL+ postCode+ "/"+chosenFoodType;

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