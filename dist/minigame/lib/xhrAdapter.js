import "weapp-adapter"
XMLHttpRequest.prototype.eventList = [];
XMLHttpRequest.prototype.addEventListener = function (name, fn) {
  var me = this;
  me.eventList.push({
    name: name,
    fn: fn
  });
};
XMLHttpRequest.prototype.onload = function (evt) {
  for (var i = 0, item; item = this.eventList[i]; i++) {
    if (item.name = "load") {
      item.fn.apply(this, arguments);
    }
  }
};
XMLHttpRequest.prototype.onprogress = function (evt) {
  for (var i = 0, item; item = this.eventList[i]; i++) {
    if (item.name = "progress") {
      item.fn.apply(this, arguments);
    }
  }
};
XMLHttpRequest.prototype.onerror = function (evt) {
  for (var i = 0, item; item = this.eventList[i]; i++) {
    if (item.name = "error") {
      item.fn.apply(this, arguments);
    }
  }
};
