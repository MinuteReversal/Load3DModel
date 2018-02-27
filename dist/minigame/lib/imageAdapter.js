class Document {
  createElementNS(ns, n) {
    if (n === "img") {
      var img = wx.createImage();
      img.listeners = [];
      img.addEventListener = (type, listener) => {
        img.listeners.push({
          type: type,
          listener: listener
        });
      }
      img.onload = function (evt) {
        for (var i = 0, item; item = img.listeners[i]; i++) {
          item.listener.apply(img, arguments);
        }
      }

      return img
    }
  }
}

export default new Document()