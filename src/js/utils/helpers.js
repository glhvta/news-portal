export function forEach (collection, callback) {
  if(!collection) {
    return;
  }

  if(typeof collection[Symbol.iterator] === 'function') {
    for (let value of collection) {
      callback(value);
    }
  } else {
    for (let key in collection) {
      callback(key, collection[key]);
    }
  }
}