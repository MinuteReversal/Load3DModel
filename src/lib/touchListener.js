/**
 * @author : ReversalMinute
 * @mail   : mailzy@vip.qq.com
 * @date   : 20180108
 * @docs   : https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
 */

/**
 * @class TouchListener
 * @returns {touch} 
 */
var TouchListener = function (obj) {
    var me = this;
    me.list = [];

    obj.addEventListener("touchstart", function (evt) {
        evt.preventDefault();
        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            if (me.find(item.identifier) === null) {
                me.list.push({
                    x: item.pageX,
                    y: item.pageY,
                    identifier: item.identifier
                });
            }
        }
    });

    obj.addEventListener("touchmove", function (evt) {
        evt.preventDefault();
        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            var p = me.find(item.identifier);
            if (p) {
                p.x = item.pageX;
                p.y = item.pageY;
            }
        }
    });

    obj.addEventListener("touchend", function (evt) {
        evt.preventDefault();

        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            var storedTouch = me.find(item.identifier);
            if (storedTouch) {
                var idx = me.list.indexOf(storedTouch);
                me.list.splice(idx, 1);
            }
        }
    });

    obj.addEventListener("touchcancel", function (evt) {
        evt.preventDefault();
        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            var storedTouch = me.find(item.identifier);
            if (storedTouch) {
                var idx = list.indexOf(storedTouch);
                me.list.splice(idx, 1);
            }
        }
    });
};


TouchListener.prototype.find = function (identifier) {
    var me = this;
    for (var i = 0, item; item = me.list[i]; i++) {
        if (item.identifier === identifier) return item;
    }
    return null;
};