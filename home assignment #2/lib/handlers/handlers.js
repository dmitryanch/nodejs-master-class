/*
 * Request Handlers
 *
 */

// Dependencies
var userHandlers = require('./users');
var tokenHandlers = require('./tokens');
var cartHandlers = require('./carts');
var menuHandlers = require('./menu');

// Define all the handlers
var handlers = {};

// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};

// Users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    userHandlers[data.method](data,callback);
  } else {
    callback(405);
  }
};



// Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    tokenHandlers[data.method](data,callback);
  } else {
    callback(405);
  }
};



// Menu
handlers.menu = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    menuHandlers[data.method](data,callback);
  } else {
    callback(405);
  }
};


// Carts
handlers.carts = function(data,callback){
  var acceptableMethods = ['get', 'post', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    cartHandlers[data.method](data,callback);
  } else {
    callback(405);
  }
};


// Export the handlers
module.exports = handlers;
