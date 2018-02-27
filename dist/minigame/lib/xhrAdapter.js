import "weapp-adapter"
XMLHttpRequest.prototype.listeners = [];

/**
 * @override addEventListener
 * @method addEventListener
 * @param {string} type 
 * @param {function} listener
 */
XMLHttpRequest.prototype.addEventListener = function (type, listener) {
  var me = this;
  me.listeners.push({
    type: type,
    listener: listener
  });
};
/**
 * @override removeEventListener
 * @method removeEventListener
 * @param {string|funtion} type 
 * @param {function} listener 
 */
XMLHttpRequest.prototype.removeEventListener = function (type, listener) {
  var me = this;
  var lsn = arguments[1];
  var removeList = [];
  if (typeof arguments[0] === "function") lsn = type;

  for (var i = 0, item; item = me.listeners[i]; i++) {
    var removeItem = null;
    if (typeof arguments[0] === "string" && typeof arguments[1] === "function") {
      removeItem = item;
    }
    else if (typeof arguments[0] === "function") {
      removeItem = item;
    }

    if (removeItem) {
      removeList.push(removeItem);
    }
  }

  for (var i = 0, item; item = removeList[i]; i++) {
    me.listeners.splice(me.listeners.indexOf(item), 1);
  }
};

/**
 * @override dispatchEvent
 * @method dispatchEvent
 * @param {string} type 
 * @param {object} event 
 */
XMLHttpRequest.prototype.dispatchEvent = function (type, event) {
  var me = this;
  for (var i = 0, item; item = me.listeners[i]; i++) {
    if (item.type === type) {
      item.listener(event);
    }
  }
};

XMLHttpRequest.prototype.onload = function (evt) {
  for (var i = 0, item; item = this.listeners[i]; i++) {
    if (item.type = "load") {
      item.fn.apply(this, arguments);
    }
  }
};
XMLHttpRequest.prototype.onprogress = function (evt) {
  for (var i = 0, item; item = this.listeners[i]; i++) {
    if (item.type = "progress") {
      item.fn.apply(this, arguments);
    }
  }
};
XMLHttpRequest.prototype.onerror = function (evt) {
  for (var i = 0, item; item = this.listeners[i]; i++) {
    if (item.type = "error") {
      item.fn.apply(this, arguments);
    }
  }
};
