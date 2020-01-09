var can, ctx, w, h
var star = new Image()
var stars = []
var G = 0.1
var SPEED_LIMIT_X = 1
var SPEED_LIMIT_Y = 1
var tickerCount = 200
var ticker = 0
var lastTime = Date.now()
var deltaTime = 0
var timer
var animationID 

function runLoop() {
    can = document.querySelector('#canvas')
    ctx = can.getContext('2d')
    w = can.width
    h = can.height
    star.src = './src/star.png'

    gameLoop()
}

function stopLoop() {
    cancelAnimaFrame(animationID)
}

function gameLoop() {
    animationID = requestAnimaFrame(function () {
        gameLoop()
    })
    drawBackground()
}

function drawBackground() {
    ctx.clearRect(0, 0, w, h)
    var now = Date.now()
    deltaTime = now - lastTime
    lastTime = now
    ticker += deltaTime
    if (ticker > tickerCount) {
        stars.push(new starObj(
            Math.random() * w,
            0,
            Math.random() * 10 + 15
        ));
        ticker %= tickerCount;
    }

    ctx.save()
    ctx.fillStyle = '#3498db'
    ctx.fillRect(0, 0, w, h)
    ctx.restore()

    for (let i = 0; i < stars.length; i++) {
        const element = stars[i]
        element.update()
        element.draw()
        if (element.y > h) {
            stars.splice(i, 1);
        }
    }
}


var requestAnimaFrame = function (callback) {
    return window.requestAnimationFrame(callback) ||
        window.webkitRequestAnimationFrame(callback) ||
        window.mozRequestAnimationFrame(callback) ||
        window.oRequestAnimationFrame(callback) ||
        window.msRequestAnimationFrame(callback) ||
        function (callback) {
            timer = setInterval(callback, 1000 / 60);
        }
}
var cancelAnimaFrame = function (callback) {
    return window.cancelAnimationFrame(callback) ||
        window.webkitCancelAnimationFrame(callback) ||
        timer && clearInterval(timer)
}

var starObj = function (x, y, radius) {
    this.x = x
    this.y = y
    this.sx = 0
    this.sy = 0
    this.radius = radius
    this.deg = 0
    this.ax = Math.random() < 0.5 ? 0.005 : -0.005
}
starObj.prototype.update = function () {
    var degr = Math.random() * 0.6 + 0.2

    // x方向调整
    this.sx += this.ax
    if (this.sx >= SPEED_LIMIT_X || this.sx <= -SPEED_LIMIT_X) {
        this.ax *= -1
    }

    // y方向调整
    if (this.sy < SPEED_LIMIT_Y) {
        this.sy += G;
    }

    // this.x += this.sx
    this.y += this.sy
    // this.deg += degr
}

// 绘制雪花
starObj.prototype.draw = function () {
    var radius = this.radius
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.deg * Math.PI / 180);
    ctx.drawImage(star, -radius, -radius, radius * 2, radius * 2)
    ctx.restore()
}