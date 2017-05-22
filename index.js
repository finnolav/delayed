module.exports = {
  create,
  remove,
  removeAll
}

let boxes = [];

function create(ms, callback, payload) {
  if(payload === undefined || payload === null) payload = {};
  const box = {};
  box.id = setTimeout(() => {
    boxes.splice(boxes.indexOf(box), 1)[0];
    callback(payload);
  }, ms)
  box.callback = callback;
  box.payload = payload;
  boxes.push(box);
  return box.id;
}

function remove(id) {
  let foundBox = null;
  for(let i = 0; i < boxes.length; i++) {
    const currBox = boxes[i];
    if(currBox.id === id) {
      foundBox = currBox;
      clearTimeout(id);
      break;
    }
  }
  if(foundBox !== null) {
    boxes.splice(boxes.indexOf(foundBox), 1);
  }
}

function removeAll() {
  for(let i = 0; i < boxes.length; i++) {
    clearTimeout(boxes[i].id);
  }
  boxes = [];
}
