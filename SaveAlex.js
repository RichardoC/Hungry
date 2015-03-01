/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');
var UI = require('ui');
var ajax = require('ajax');
var postCode, lat, lng, latlng;
var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};
var baseURL = "http://www.just-eat.co.uk/area/";
var foodArray = ['Everything','Indian','Italian/Pizza','Chinese','Kebab','Chippie/Fish/Chicken/American'];
for (var i=0; i < foodArray.length; i++){
  if (Settings.data(foodArray[i])>=0)
  {}
  else {Settings.data(foodArray[i],1);}
}

function locationSuccess(pos) {
  //Dummy coordinates for Camden 51.540113, -0.142139
  /*var lat = 51.540113;
  var lng = -0.142139;*/
  lat =  pos.coords.latitude;
  lng =  pos.coords.longitude; 
  latlng = lat + "," + lng;
  
  // Construct URL
  var URL = 'http://maps.google.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=false';
  
    // Make the request
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success
  
      if (data.results[0]) {
        for (var r = 0; r < data.results.length; ++r) {
          for (var i = 0; i < data.results[r].address_components.length; ++i) {
            for (var j = 0; j < data.results[r].address_components[i].types.length; ++j) {
              //For non-UK postcodes remove '_prefix'
              if (!postCode && data.results[r].address_components[i].types[j] == "postal_code") {
                postCode = data.results[r].address_components[i].long_name;
                
                var finalURL = baseURL+ postCode+ "/"+chosenFoodType;
                
              }
            }
          }
        }
      }
    },
    function(error) {
      // Failure
      console.log('Google Maps request failed: ' + error);
    }
  );
}

function displayCard() {
  //Following code only for demonstration purposes
  var card = new UI.Card({
    title:'Coordinates: ' + lat + ", " + lng,
    subtitle:'Postcode: ' + postCode
  });
  card.show();
}
 
function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

function sortby(names,values){
    var swaps = 1;
    var tempValue = 0;
    var tempName = " ";
    while (swaps !== 0) {
        swaps = 0;
        for (var i=1; i<names.length; i++) {
            if (values[i-1] < values[i]) {
                tempName = names[i-1];
                tempValue = values[i-1];
                names[i-1] = names[i];
                values[i-1] = values[i];
                names[i] = tempName;
                values[i] = tempValue;
                swaps++;
            }
        }
//console.log(names[1]);
//console.log(names[2]);
//console.log(names[3]);
}return names;
    
}
function smenu(){
  var freqarray = [1, 1, 1, 1, 1, 1];
  for (var i=0; i < foodArray.length; i++){
    freqarray[i] = Settings.data(foodArray[i]);
  }
  var sortedmenu = sortby(foodArray,freqarray);
  return sortedmenu;
}


var main = new UI.Card({
  title: 'Hungry?',
  icon: 'images/Hungry 28 28.png',
  subtitle: '',
  body: 'Press any button.'
});
main.show();

var sortedmenu = smenu();
var foodlist = [
  {
    title: sortedmenu[0]
  },
  {
    title: sortedmenu[1]
  },
  {
    title: sortedmenu[2]
  },
  {
    title: sortedmenu[3]
  },
  {
    title: sortedmenu[4]
  },
  {
    title: sortedmenu[5]
  }
];

var deliveryChoice = [
  {
    title: 'Delivery',
  },
  {
    title: 'Collection'
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
     title: 'Deliver or Collect?',
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

navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);


