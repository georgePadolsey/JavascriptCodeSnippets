var canvas = document.getElementById('stage');
canvas.style.border = '1px solid black';
var ctx = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 750;

var mousePos = {
    x: 0,
    y: 0
};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.ceil(evt.clientX - rect.left),
        y: Math.ceil(evt.clientY - rect.top)
    };
}

canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
}, false);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/**
 * Calculates the relative angle between two points
 * @returns Angle in degrees
 */
function calcAngle(x1, y1, x2, y2) {
    var calcAngle = Math.atan2(x1 - x2, y1 - y2);
    if (calcAngle < 0) {
        calcAngle = Math.abs(calcAngle);
    } else {
        calcAngle = Math.PI * 2 - calcAngle;
    }
    return toDegrees(calcAngle);
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function calculateXAndYFromAngleAndRadius(degrees, radius) {
    return sumFromCalculateXAndYFromAngleAndRadius = {
        x: radius * Math.cos(Math.PI / 180 * degrees),
        y: radius * Math.sin(Math.PI / 180 * degrees)
    }

}
calculateXAndYFromAngleAndRadius(3, 3);
console.log(sumFromCalculateXAndYFromAngleAndRadius.x, sumFromCalculateXAndYFromAngleAndRadius.y);
var gun = new Character(
    canvas,
    canvas.width / 2 - 30,
    canvas.height / 2 - 30,
    300,
    300,
    'character.jpg'
);
var keys = {
    leftArrow: 37,
    rightArrow: 39,
    upArrow: 38,
    downArrow: 40,
    escKey: 27,
    spaceBar: 32,
    r: 82
};
var upArrowIsPressed = false;
var leftArrowIsPressed = false;
var rightArrowIsPressed = false;
var downArrowIsPressed = false;

document.onkeydown = function(e) {
    //console.log(e.keyCode)
    if (e.keyCode === keys.upArrow) {
        gun.rotation = 0;
        gun.deltaY = -gun.speed;
        upArrowIsPressed = true;
        gun.deltaX = 0;
    }
    if (e.keyCode === keys.downArrow) {
        gun.rotation = 180;
        gun.deltaY = gun.speed;
        downArrowIsPressed = true;
        gun.deltaX = 0;

    }
    if (e.keyCode === keys.leftArrow) {
        gun.rotation = 270;
        gun.deltaX = -gun.speed;
        leftArrowIsPressed = true;
        gun.deltaY = 0;
    }

    if (e.keyCode === keys.rightArrow) {
        gun.rotation = 90;
        gun.deltaX = gun.speed;
        rightArrowIsPressed = true;
        gun.deltaY = 0;
    }
};

document.onkeyup = function(e) {
    if (e.keyCode === keys.upArrow) {
        upArrowIsPressed = false;
    }
    if (e.keyCode === keys.downArrow) {
        downArrowIsPressed = false;
    }
    if (e.keyCode === keys.leftArrow) {
        leftArrowIsPressed = false;
    }
    if (e.keyCode === keys.rightArrow) {
        rightArrowIsPressed = false;
    }
    if (!rightArrowIsPressed && !leftArrowIsPressed && !upArrowIsPressed && !downArrowIsPressed) {
        gun.deltaX = 0;
        gun.deltaY = 0;
    }
}

var id = setInterval(function() {
    clearCanvas();
    gun.rotation = calcAngle(gun.x, gun.y, mousePos.x, mousePos.y);
    gun.render();
}, 33);