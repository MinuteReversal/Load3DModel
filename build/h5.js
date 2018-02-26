var fs = require('fs');
var babel = require("babel-core");
const time = `/*${new Date().toUTCString()}*/`;
const distPath = "dist/h5/";
const fileName = "app.min.js";

babel.transformFile("./src/main.js", { "presets": ["env"] }, (err, result) => {
    if (err) console.log(err);
    fs.writeFile(`${distPath}/${fileName}`, result.code, 'utf8', () => {
        console.log("Complete");
    });
});