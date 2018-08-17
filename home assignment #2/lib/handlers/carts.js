/*
 * Handlers for carts
 *
 */

 // Dependencies
 var _data = require('../data');
 var tokenHandlers = require('./tokens');

 // Container for all the users methods
 var cartHandlers = {};
cartHandlers.get = function(data,callback){
  // Check that email is valid
  var email = typeof(data.queryStringObject.email) === 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false;
  if(email){
    // Get token from headers
    var token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email
    tokenHandlers.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the cart
        _data.get('carts',email, function(err,cart){
          if(!err && cart){
            callback(200, cart);
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

cartHandlers.post = function(data,callback){
  // Check that all required fields are filled out
  var items = typeof(data.payload.items) === 'object' && data.payload.items.length > 0 ? data.payload.items : false;
  var email = typeof(data.queryStringObject.email) === 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false;
  if(email && items && items.length > 0){
    // Get token from headers
    var token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email
    tokenHandlers.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Create the cart
        _data.create('carts',email, items, function(err){
          if(!err ){
            callback(200);
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

cartHandlers.put = function(data,callback){
  // Check that all required fields are filled out
  var items = typeof(data.payload.items) === 'object' && data.payload.items.length > 0 ? data.payload.items : false;
  var email = typeof(data.queryStringObject.email) === 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false;
  if(email && items && items.length > 0){
    // Get token from headers
    var token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email
    tokenHandlers.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Update the cart
        _data.update('carts',email, items, function(err){
          if(!err){
            callback(200);
          } else {
            callback(400,{'Error' : 'Could not update the specified cart.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

cartHandlers.delete = function(data,callback){
  // Check that all required fields are filled out
  var email = typeof(data.queryStringObject.email) === 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false;
  if(email){
    // Get token from headers
    var token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email
    tokenHandlers.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Delete the cart
        _data.delete('carts',email, function(err){
          if(!err){
            callback(200);
          } else {
            callback(400,{'Error' : 'Could not update the specified cart.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

module.exports = cartHandlers;
