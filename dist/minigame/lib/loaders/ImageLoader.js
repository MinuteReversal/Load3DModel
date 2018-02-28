/**

 * @author ReversalMinute
 * @description for wexin minigame 
 * @date 20180228
 */

import { DefaultLoadingManager } from 'LoadingManager';
var loading = {};

export default class ImageLoader {
  constructor(manager) {
    this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
    this.path = "";
    this.crossOrigin = 'Anonymous';
  }
  load(url, onLoad, onProgress, onError) {
    var img = wx.createImage();
    img.onload = function (evt) {
      if (onLoad) onLoad(img);
    }
    img.src = url;
    return img
  }
  setCrossOrigin(value) {
    this.crossOrigin = value;
    return this;
  }
  setPath(value) {
    this.path = value;
    return this;
  }
}