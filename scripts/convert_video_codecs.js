/* 
   This script converts mp4 video files to H264.AAC codecs (when needed), and OVERRIDE the original video files.
*/

const path = require("path");
const fs = require("fs");
const glob = require("glob");

// require ffprobe binary installed in ${ffprobe_binary}
const ffprobe = require('ffprobe');

// require HandbrakeCLI installed and placed under node_modules/handbrake-js/.bin
const hbjs = require('handbrake-js'); 

let pattern = path.join(__dirname, "..", "public", "img", "*", "*", "*.mp4");
let ffprobe_binary = "d:/Softwares/ffmpeg-20180723/bin/ffprobe.exe";


function tryConvertAsync(filepath) {
    const output_wo_ext = path.join(
        path.dirname(filepath),
        path.basename(filepath, path.extname(filepath)));
    const tmp_output = output_wo_ext + ".tmp";
    // const output = output_wo_ext + ".H264.AAC.mp4";
    if (fs.existsSync(tmp_output)) {
        fs.unlinkSync(tmp_output);
        console.log("\tUnlink tmp output...");
    }
    // if (fs.existsSync(output)) {
    //     console.log("\tPass... H264.AAC file exists..");
    //     return;
    // }
    const options = {
        input: filepath,
        output: tmp_output,
        preset: "Normal",
    };
    console.log(`\tConverting....`);
    let currProcess = 0;
    hbjs.spawn(options)
        .on("error", error => {
            console.log("\tError: ", error);
        })
        .on("progress", progress => {
            if (progress.percentComplete > currProcess + 10) {
                console.log(`\t${filepath}: ${progress.percentComplete}`);
                currProcess += 10;
            }
        })
        .on("complete", () => {
            // fs.renameSync(tmp_output, output);
            // console.log(`\tConverted ${output}`);
            const filepath_tmp = filepath + ".tmp";
            fs.renameSync(filepath, filepath_tmp);
            fs.renameSync(tmp_output, filepath);
            fs.unlinkSync(filepath_tmp);
            console.log(`\tConverted and OVERRIDE ${filepath}`);
        });
}

glob(pattern, (error, files) => {
    if (error) {
        console.log("ERROR: ", error);
        process.exit(-1);
    }
    for (let filepath of files) {
        ffprobe(filepath, { path: ffprobe_binary })
            .then(info => {
                console.log(filepath);
                let codecs = {
                    video: info.streams[0].codec_name,
                    audio: info.streams[1].codec_name,
                };
                console.log(`\tvideo.audio = ${codecs.video}.${codecs.audio}`);
                if (codecs.video === "h264" && codecs.audio === "aac") {
                    console.log("\tPass... Valid file...");
                } else {
                    tryConvertAsync(filepath);
                }
            });
    }
});
