/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var Settings = require('settings');
var UI = require('ui');
var Vector2 = require('vector2');

//Making a search Function for use

function search(name, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === name) {
            return i;
        }
    }
}



var foodarray = ['Everything','Indian','Italian/Pizza','Chinese','Kebab','Chippie/Fish/Chicken/American'];
Settings.config([{foodarray},{0,0,0,0,0,0}]);
var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hungry?',
  body: 'Press any button.'
});

 main.show();
 var foodlist = [
   {
     title: 'Everything',
     subtitle: ""
   },
   {
     title: 'Indian',
     subtitle: ""
   },
   {
     title: 'Italian/Pizza',
     subtitle: ""
   },
   {
     title: 'Chinese',
     subtitle: ""
   },
   {
     title: 'Kebab',
     subtitle: ""
   },
   {
     title: 'Chippie/Fish/Chicken/American',
     subtitle: ""
   }
 ];
 /*foodmenu = ParseFeed(foodlist)*/
 main.on('click', 'up', function(e) {
   var menu = new UI.Menu({
     sections: [{ 
     title: 'What do you fancy?',
     items: foodlist
      
   }]
   });
   menu.on('select', function(e) {
     var foodchoice = e.item.title;
     var foodchoiceelement = search(foodarray,foodchoice);
     
     console.log('Food Choice Element is '+foodchoiceelement);     
     var frequency = Settings.data(foodchoiceelement);
     console.log('printing frequency value '+frequency);     
     Settings.data=(foodchoice,frequency ++);/*creates and saves the new frequency*/
     console.log('printing new frequency value '+frequency);  
     console.log('frequency = '+Settings.data(foodchoice) + ' for food '+ foodchoice); /*just confirming 
     the new frequency saved to the right food type*/
     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
     console.log('The item is titled "' + e.item.title + '"');
   });
   menu.show();
 });

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
