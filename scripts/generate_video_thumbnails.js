// node generate_video_thumbnails.js

const ThumbnailGenerator = require('video-thumbnail-generator').default;

const path = require("path");
const glob = require("glob");

let pattern = path.join(__dirname, "..", "public", "img", "*", "*", "*.mp4");
glob(pattern, (error, files) => {
    if (error) {
        console.log("ERROR: ", error);
        process.exit(-1);
    }
    console.log(files);
    for (let filepath of files) {
        const tg = new ThumbnailGenerator({
            sourcePath: filepath,
            thumbnailPath: path.dirname(filepath),
            tmpDir: path.dirname(filepath),
        });
        tg.generateOneByPercent(10, {
            size: "640x480",
            filename: "%f.thumbnail.jpg"
        }).then(console.log);
    }
});
