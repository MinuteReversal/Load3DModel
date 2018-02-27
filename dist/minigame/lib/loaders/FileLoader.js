/**

 * @author ReversalMinute
 * @description for wexin minigame 
 */

import { DefaultLoadingManager } from 'LoadingManager';
var loading = {};

export default class FileLoader {
  constructor(manager) {
    this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
    this.filesystemManager = wx.getFileSystemManager();
    this.path = "";
    this.responseType = "text/plain";
    this.withCredentials = "";
    this.mimeType = "text/plain";
    this.requestHeader = {};
  }
  load(url, onLoad, onProgress, onError) {
    var me = this;
    if (onProgress) onProgress({
      loaded: 100,
      total: 100
    });

    me.filesystemManager.readFile({
      encoding: "utf8",
      filePath: me.path.concat(url),
      success(res) {
        if (onLoad) onLoad(res.data);
      },
      complete(res) {

      },
      fail(res) {
        if (onError) onError({ detail: res.errMsg });
      }
    });
  }
  setPath(value) {
    this.path = value;
    return this;
  }
  setResponseType(value) {
    this.responseType = value;
    return this;
  }
  setWithCredentials(value) {
    this.withCredentials = value;
    return this;
  }
  setMimeType(value) {
    this.mimeType = value;
    return this;
  }
  setRequestHeader(value) {
    this.requestHeader = value;
    return this;
  }
}