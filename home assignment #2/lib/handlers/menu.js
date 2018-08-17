/*
 * Handlers for menu
 *
 */

 // Dependencies
 var _data = require('../data');
 var tokenHandlers = require('./tokens');

 // Container for all the users methods
 var menuHandlers  = {};

menuHandlers.get = function(data,callback){
  // Check that email is valid
  var email = typeof(data.queryStringObject.email) === 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false;
  if(email){
    // Get token from headers
    var token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email
    tokenHandlers.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the menu items
        _data.list('menu',function(err,menuItems){
          if(!err && menuItems && menuItems.length > 0){
            // Create an array of items
            var allItems = [];
            // Iterate menu items
            menuItems.forEach(function(menuItem){
              // Read in the menu item data
              _data.read('menu',menuItem,function(err,items){
                if(!err && items && items.length > 0){
                  // Push all items into single array and send it back
                  allItems.concat(items);
                } else {
                  console.log("Error reading one of the menu item's data: ",err);
                }
              });
            });
            callback(200, allItems);
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};
