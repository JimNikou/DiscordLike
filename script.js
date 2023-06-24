const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const Notifications = require('./js/notifications.js');

const ytdl = require('ytdl-core');
const Speaker = require('speaker');
const ffmpeg = require('fluent-ffmpeg');
var ffmpeg_utils = require('fluent-ffmpeg-util');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'js/preload.js'),
    },
  });
  win.setMinimumSize(920, 590);
  //win.loadFile('html/discover.html');
  // win.loadFile('html/test.html');
  win.loadFile('index.html');
  console.log("createWindow");
};

app.whenReady().then(() => {
  createWindow();
  Notifications.show('Basic Notification', 'Notification from the Main process')

  console.log("url");
  // (async () => {
    let speaker = new Speaker();
    url = "https://www.youtube.com/watch?v=h8DLofLM7No";
    console.log(url);
    if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
      try {
        console.log("Time to play!")
        ystream = ytdl(url, {quality: 'highestaudio', format: "mp3"});
        console.log(ystream.isPaused());

      var command = ffmpeg()
                            .input(ystream)
                            .output(ffmpeg_utils.tee(speaker))
                            .audioCodec("pcm_s16le")
                            .format("s16le")
                            .on('start', function () {
                                if (ffmpeg_utils.pause(command))
                                    console.log('ffmpeg paused');
                                if (ffmpeg_utils.resume(command))
                                    console.log('ffmpeg resumed');
                              });
command.run();

        // ffmpeg_utils   .pause(ff);
        
        // ystream.pause();
        console.log(ystream.isPaused());

      } catch (error) {
        console.error(error);
        
      }
    }else {console.log("only link support for the moment!")}
});
// });

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    console.log("activate");
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});