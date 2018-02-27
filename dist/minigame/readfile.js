export default class ReadFile {
  constructor() {
    var FilesystemManager = wx.getFileSystemManager();
    FilesystemManager.readFile({
      encoding: "utf8",
      filePath: "models/Cocacola.obj",
      success(res) {
        wx.showModal({ content: res.data });
      },
      fail(res) {
        wx.showModal({ content: res.errMsg });
      }
    });
  }
}