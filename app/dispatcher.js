// We are going to use this file to implement a simple dispatcher that will be used with flux
// Facebook offer their own free dispatcher.js to handle this, there are also lots of other npm
// modules that achieve the same

// The reason why we are building our own is to understand what a dispatcher is and what it does
// Dispatcher is used to broadcast payloads to registered callbacks.
'use strict';
import Guid from 'guid';
const listeners = {};

export default {
  register(cb) {
    console.info("Registering new listener ...");
    // We generate a new guid for the callback that is going to register
    const id = Guid.raw();
    // and put the guid in the listeners object, as the key for the cb
    listeners[id] = cb;
    // A fully formed dispatcher has more than just register and dispatch.
    // It has props like _isHandled etc. and other states. We return the id
    // to work further with the cb, but in our simple example we don't need it anymore
    return id;
  },
  dispatch(payload) {
    console.info("Dispatching ...", payload); 

    for (let id in listeners) {
      const listener = listeners[id];
      // as per the dispatcher architecture we send the payload to ALL registered callbacks
      listener(payload);
    }
  }
};

