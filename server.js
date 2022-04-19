const express = require('express')
const router = express.Router();
const app = express()
const http = require('http')

const bodyParser = require("body-parser");

var server = http.createServer(app)
var path = require('path');
const { randomInt } = require('crypto');

var port = 3500
gift = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
isHaveGift = []
giftIndex = []
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'dist//public/index.html'));

})

function initializeTheGame(handsNum) {
    isHaveGift = []
    for (let index = 0; index < handsNum; index++) {
        isHaveGift.push(-1)

    }
    var rnd2 = randomInt(handsNum)
    for (let index = 0; index < gift.length; index++) {
        
        console.log(gift.length);
        while (giftIndex.includes(rnd2)) {
            rnd2 = randomInt(handsNum)
        }
        console.log(rnd2,"  ",index ," ",gift[index]);
        giftIndex.push(rnd2)
        isHaveGift[rnd2] = gift[index]

    }
    console.log(isHaveGift);
}

app.get('/game1', function (req, res) {
    
    initializeTheGame(parseInt(req.query.tagId))
    
    res.render('game', { hand: 50, gifts: isHaveGift, });
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})