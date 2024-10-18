const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const WebSocket = require('ws');


class socketFinder {
    constructor(sURL, type, key, agent) {
        this.ws = new WebSocket(sURL, { agent: agent });
        const TYPE = type;
        this.ws.addEventListener("open", function (data) { 
            console.log(data);
            this.ws.send(JSON.stringify(["bot_11d", 3480, 2920, 52, "ys#[O;x\>c[", "10250dxO0O", 0, 0, 0, 0, 1, 0, 0, 0, 0, null, key]));
        });
        this.ws.on('message', function (msg) {
            console.log(msg);
            switch (typeof msg) {
                case "string":
                    var c = JSON.parse(msg);
                    switch (c[0]) {
                        case 3:
                            var lead = [21, 0];
                            var players = c[4].sort((a, b) => b.p - a.p);
                            if (c[4] >= 11) {
                                for (let i = 0; i < 10; i++) {
                                    var player = players[i];
                                    lead.push(player.i, player.p, player.n)
                                }
                            } else {
                                for (let i = 0; i < c[4]; i++) {
                                    var player = players[i];
                                    lead.push(player.i, player.p, player.n)
                                }
                            }

                            var score, name, id, a = lead, top = 1, data = [];
                            for (var e = 2; e < a.length; e += 3) {

                                if (top == 1) {
                                    score = EZ_Score(a[e + 1]);
                                    id = a[e];
                                    name = a[e + 2];
                                    data.push({ score, id, name })
                                }
                                else {
                                    score = EZ_Score(a[e + 1]);
                                    id = a[e];
                                    name = a[e + 2];
                                    data.push({ score, id, name })
                                }
                            }

                            var d = 200, e = 340, m = 10;
                            ctx.clearRect(0, 0, 500, 500);
                            ctx.drawImage(backGround, 0, 0);
                            draw_leaderboard(data);
                            drawAuth();
                            const buffer = canvas.toBuffer('image/png');
                            switch (TYPE) {
                                case "eu1":
                                    fs.writeFileSync('./images/EU1.png', buffer);
                                    dataEu1 = c[4];
                                    break;
                                case "eu2":
                                    fs.writeFileSync('./images/EU2.png', buffer);
                                    dataEu2 = c[4];
                                    break;
                                case "eu3":
                                    fs.writeFileSync('./images/EU3.png', buffer);
                                    dataEu3 = c[4];
                                    break;
                                case "eu4":
                                    fs.writeFileSync('./images/EU4.png', buffer);
                                    dataEu4 = c[4];
                                    break;
                                case "na1":
                                    fs.writeFileSync('./images/NA1.png', buffer);
                                    dataNa1 = c[4];
                                    break;
                                case "na2":
                                    fs.writeFileSync('./images/NA2.png', buffer);
                                    dataNa2 = c[4];
                                    break;
                                case "na3":
                                    fs.writeFileSync('./images/NA3.png', buffer);
                                    dataNa3 = c[4];
                                    break;
                                case "na4":
                                    fs.writeFileSync('./images/NA4.png', buffer);
                                    dataNa4 = c[4];
                                    break;
                                case "tk1":
                                    fs.writeFileSync('./images/TK1.png', buffer);
                                    dataTk = c[4];
                                    break;
                                case "sg1":
                                    fs.writeFileSync('./images/SG1.png', buffer);
                                    dataSg = c[4];
                                    break;
                                case "sd1":
                                    fs.writeFileSync('./images/SD1.png', buffer);
                                    dataSd = c[4];
                                    break;
                                case "wa1":
                                    fs.writeFileSync('./images/WA1.png', buffer);
                                    dataWa = c[4];
                                    break;
                                case "legacyeu1":
                                    fs.writeFileSync('./images/LEGACYEU.png', buffer);
                                    dataLegacyEu1 = c[4];
                                    break;
                                case "legacyna1":
                                    fs.writeFileSync('./images/LEGACYNA.png', buffer);
                                    dataLegacyNa1 = c[4];
                                    break;
                                case "legacyas1":
                                    fs.writeFileSync('./images/LEGACYAS.png', buffer);
                                    dataLegacyAs1 = c[4];
                                    break;
                                case "vampeu1":
                                    fs.writeFileSync('./images/VAMPEU.png', buffer);
                                    dataVampEu1 = c[4];
                                    break;
                                case "vampna1":
                                    fs.writeFileSync('./images/VAMPNA.png', buffer);
                                    dataVampNa1 = c[4];
                                    break;
                                case "vampas1":
                                    fs.writeFileSync('./images/VAMPAS.png', buffer);
                                    dataVampAs1 = c[4];
                                    break;
                                case "teammode":
                                    fs.writeFileSync('./images/TEAMMODE.png', buffer);
                                    dataTeamMode = c[4];
                                    break;
                                case "seamode":
                                    fs.writeFileSync('./images/SEAMODE.png', buffer);
                                    dataSea = c[4];
                                    break;
                                case "zma":
                                    fs.writeFileSync('./images/ZMA.png', buffer);
                                    dataZma = c[4];
                                    break;
                                case "arenaofhm":
                                    fs.writeFileSync('./images/ARENAOFHM.png', buffer);
                                    dataHmm = c[4];
                                    break;
                                case "pvpordie":
                                    fs.writeFileSync('./images/PVPORDIE.png', buffer);
                                    dataOrdie = c[4];
                                    break;
                            }
                            break;
                        case 25:
                            break;
                    };
                    break;
                default:
                    break;
            }
        });
        this.ws.on('error', function error(err) {
            console.log('error');
        });
        this.ws.on('close', function (data) {
            console.log('close');
        });
    };
};




async function getPr() {
    proxies = (await axios.get('https://www.proxy-list.download/api/v1/get?type=http')).data.split("\r\n");

    botsNumber = 1800;
    for (let index = 0; index <= Math.min(4, botsNumber); index++) {
        botsNumber--;
        const agent = new HttpsProxyAgent('http://' + proxies[Math.floor(Math.random() * proxies.length)]);
        new socketFinder(url, type, token, agent);
    };
}

let token = "r0l9ZDd]?2QiNP";
let type = 'eu2';
let url = 'wss://frankfurt3.starve.io/server-eu-2';

// console.log(JSON.stringify(["ds.gg/flux-starve", 3480, 2920, 52, "ys#[O;x\>c[", "10250dxO0O", 0, 0, 0, 0, 1, 0, 0, 0, 0, null, token]));
proxies = getPr();