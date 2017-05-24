var timeouts = [];

var create = function(ms, callback) {
  var payload = [];
  if(arguments.length > 2) {
    for(var i = 2; i < arguments.length; i++) {
      payload.push(arguments[i]);
    }
  }

  var box = {};
  timeouts.push(box);
  box.callback = callback;
  box.payload = payload;
  box.id = setTimeout(function() {
    timeouts.splice(timeouts.indexOf(box), 1)[0];
    if(payload.length > 0) callback.apply(null, payload);
    else callback();
  }, ms)

  return box.id;
}

var clearById = function(id) {
  var foundBox = null;
  for(var i = 0; i < timeouts.length; i++) {
    var currBox = timeouts[i];
    if(currBox.id === id) {
      foundBox = currBox;
      clearTimeout(id);
      break;
    }
  }
  if(foundBox !== null) {
    timeouts.splice(timeouts.indexOf(foundBox), 1);
  }
}

function clearAll() {
  for(var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i].id);
  }
  timeouts = [];
}

module.exports = {
  create: create,
  clearById: clearById,
  clearAll: clearAll
}
