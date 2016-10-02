var ajax = require('ajax');
var reddit_data;
var card;
var counter = 0;

// Retrieves new data from Reddit
function pull() {
  ajax({ url: 'http://www.reddit.com/r/Jokes/hot.json?limit=50', type: 'json' },
  function(data) {
    reddit_data = data;
    ready();    
  });
}

// Gets new data
pull();

var UI = require('ui');

// Creates each card
function ready() {
  
  // Resets and repulls once gone past 50 items
  if(counter == 39) {
    counter = 0;
    pull();
  }
  
  // Creates new card object and sets attributes
  card = new UI.Card({
    title: reddit_data.data.children[counter].data.title,
    subtitle: reddit_data.data.children[counter].data.author,
    body: reddit_data.data.children[counter].data.selftext,
    subtitleColor: 'black',
    bodyColor: 'black',
    scrollable: true,
    style: 'small',
  });
  
  // Shows card
  card.show();
  
  // Changes content
  card.on('click', 'select', function(e) {
    counter+=1;
    ready();
  });
}