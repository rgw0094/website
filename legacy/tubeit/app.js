var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rect = (function () {
    function Rect(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    return Rect;
}());
var Point = (function () {
    function Point(x, y) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.toString = function () {
            return "(" + _this.x + ", " + _this.y + ")";
        };
    }
    return Point;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.distance = function (p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };
    Utils.random = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Utils.randomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Utils;
}());
var Time = (function () {
    function Time() {
    }
    Time.onNewFrame = function () {
        var newTime = new Date().getTime();
        Time.dt = (Time.now == 0) ? 0 : newTime - Time.now;
        Time.now = newTime;
    };
    return Time;
}());
Time.now = 0;
/**
 * Base class for a simple HTML5/Javascript game!
 */
var GameBase = (function () {
    function GameBase(canvas, fps) {
        this.canvas = canvas;
        this.fps = fps;
        this.cx = canvas.getContext("2d");
        this.cx.mozImageSmoothingEnabled = false;
        this.cx.webkitImageSmoothingEnabled = false;
        this.captureEvents(canvas);
    }
    GameBase.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            Time.onNewFrame();
            _this.update();
            _this.draw(_this.cx);
        }, 1000 / this.fps);
        this.onScreenResize();
    };
    GameBase.prototype.captureEvents = function (canvas) {
        var aCanvas = this;
        window.onscroll = function () { aCanvas.onScreenResize(); };
        window.onresize = function () { aCanvas.onScreenResize(); };
        window.addEventListener("keydown", function (event) { aCanvas.onKeyDown(event); }, false);
        window.addEventListener("keyup", function (event) { aCanvas.onKeyUp(event); }, false);
    };
    GameBase.prototype.onScreenResize = function () {
        this.viewport = new Rect(0, 0, window.innerWidth, window.innerHeight);
        this.onResize(this.viewport);
    };
    return GameBase;
}());
var TileType = {
    LeftResevoir: 0,
    RightResevoir: 1,
    LR: 2,
    UD: 3,
    LD: 4,
    RD: 5,
    UR: 6,
    LU: 7,
    URD: 8,
    LUD: 9,
    LRD: 10,
    LUR: 11,
    LURD: 12,
    Empty: 13,
};
var FallingTube = (function () {
    function FallingTube(column, y, type, vy) {
        this.column = column;
        this.y = y;
        this.type = type;
        this.vy = vy;
    }
    return FallingTube;
}());
var TubeSpawner = (function () {
    function TubeSpawner(grid) {
        this.timeLastTubeSpawned = 0;
        this.tubeSpawnDt = 1000;
        this.tubeVy = 0.005;
        this.grid = grid;
        this.fallingTubes = [];
    }
    TubeSpawner.prototype.update = function () {
        //Spawn new tubes
        if (Time.now - this.timeLastTubeSpawned > this.tubeSpawnDt) {
            this.timeLastTubeSpawned = Time.now;
            this.spawnTube;
            this.spawnTube(Utils.randomInt(1, Grid.width - 2), 0, Utils.randomInt(2, 12), this.tubeVy);
            this.tubeSpawnDt *= 0.995;
            this.tubeVy *= 0.996;
        }
        //Update tubes
        for (var i = 0; i < this.fallingTubes.length; i++) {
            var tube = this.fallingTubes[i];
            tube.y += Time.dt * TubeIt.scale * Tile.spriteHeight * tube.vy;
            var y = (tube.y / TubeIt.scale + Tile.spriteHeight - Grid.offsetY) / Tile.spriteHeight;
            var y = Math.floor(Math.max(0, y));
            if (y >= Grid.height || this.grid.getTube(tube.column, y) != TileType.Empty) {
                //Tube has reached the bottom!
                this.fallingTubes.splice(i, 1);
                this.grid.setTube(tube.column, y - 1, tube.type);
            }
        }
    };
    TubeSpawner.prototype.spawnTube = function (gridX, gridY, type, vy) {
        this.fallingTubes.push(new FallingTube(gridX, (Grid.offsetY + Tile.spriteHeight * gridY) * TubeIt.scale, type, vy));
    };
    TubeSpawner.prototype.draw = function (cx) {
        for (var i = 0; i < this.fallingTubes.length; i++) {
            var tube = this.fallingTubes[i];
            Tile.drawTube(cx, tube.type, false, tube.column, tube.y);
        }
    };
    return TubeSpawner;
}());
/**
 * One tile within the GameGrid.
 */
var Tile = (function () {
    function Tile(x, y) {
        this.x = x;
        this.y = y;
        if (x == 0) {
            this.type = TileType.LeftResevoir;
            this.isFilled = true;
        }
        else if (x == Grid.width - 1) {
            this.type = TileType.RightResevoir;
            this.isFilled = true;
        }
        else {
            this.type = TileType.Empty;
        }
    }
    Tile.prototype.flowsLeft = function () {
        switch (this.type) {
            case TileType.LR:
            case TileType.LD:
            case TileType.LU:
            case TileType.LUD:
            case TileType.LRD:
            case TileType.LUR:
            case TileType.LURD:
            case TileType.RightResevoir:
                return true;
            default:
                return false;
        }
    };
    Tile.prototype.flowsUp = function () {
        switch (this.type) {
            case TileType.UD:
            case TileType.UR:
            case TileType.LU:
            case TileType.URD:
            case TileType.LUD:
            case TileType.LUR:
            case TileType.LURD:
                return true;
            default:
                return false;
        }
    };
    Tile.prototype.flowsRight = function () {
        switch (this.type) {
            case TileType.LR:
            case TileType.RD:
            case TileType.UR:
            case TileType.URD:
            case TileType.LRD:
            case TileType.LUR:
            case TileType.LURD:
            case TileType.LeftResevoir:
                return true;
            default:
                return false;
        }
    };
    Tile.prototype.flowsDown = function () {
        switch (this.type) {
            case TileType.UD:
            case TileType.LD:
            case TileType.RD:
            case TileType.URD:
            case TileType.LUD:
            case TileType.LRD:
            case TileType.LURD:
                return true;
            default:
                return false;
        }
    };
    /**
     * Rotates this tile.
     */
    Tile.prototype.rotate = function () {
        this.type = this.getRotatedTube(this.type);
    };
    Tile.prototype.draw = function (cx) {
        if (this.type != TileType.Empty) {
            Tile.drawTube(cx, this.type, this.isFilled, this.x, (Grid.offsetY + this.y * Tile.spriteHeight) * TubeIt.scale);
        }
    };
    Tile.drawTube = function (cx, type, isFilled, column, y) {
        var w = Tile.spriteWidth;
        var h = Tile.spriteHeight;
        var s = TubeIt.scale;
        cx.drawImage(Sprites.tubesImage, type * w, isFilled ? h : 0, w, h, (Grid.offsetX + column * w) * s, y, w * s, h * s);
    };
    Tile.prototype.getRotatedTube = function (tube) {
        switch (this.type) {
            case TileType.LR:
                return TileType.UD;
            case TileType.UD:
                return TileType.LR;
            case TileType.LD:
                return TileType.LU;
            case TileType.RD:
                return TileType.LD;
            case TileType.UR:
                return TileType.RD;
            case TileType.LU:
                return TileType.UR;
            case TileType.URD:
                return TileType.LRD;
            case TileType.LUD:
                return TileType.LUR;
            case TileType.LRD:
                return TileType.LUD;
            case TileType.LUR:
                return TileType.URD;
            case TileType.LURD:
                return TileType.LURD;
        }
    };
    return Tile;
}());
Tile.spriteWidth = 51;
Tile.spriteHeight = 55;
var Grid = (function () {
    function Grid() {
        this.cursorX = Grid.width / 2;
        this.cursorY = Grid.height - 1;
        this.tiles = [];
        this.tubeSpawner = new TubeSpawner(this);
        for (var x = 0; x < Grid.width; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < Grid.height; y++) {
                this.tiles[x][y] = new Tile(x, y);
            }
        }
    }
    Grid.prototype.update = function () {
        this.tubeSpawner.update();
    };
    Grid.prototype.draw = function (cx) {
        //Placed tubes
        for (var x = 0; x < Grid.width; x++) {
            for (var y = 0; y < Grid.height; y++) {
                this.tiles[x][y].draw(cx);
            }
        }
        //Falling tubes
        this.tubeSpawner.draw(cx);
        //Cursor
        var w = 77;
        var h = 83;
        cx.drawImage(Sprites.cursorImage, (Grid.offsetX + this.cursorX * Tile.spriteWidth - 14) * TubeIt.scale, (Grid.offsetY + this.cursorY * Tile.spriteHeight - 14) * TubeIt.scale, 77 * TubeIt.scale, 83 * TubeIt.scale);
    };
    Grid.prototype.moveLeft = function (moveTube) {
        this.setCursorPos(this.cursorX - 1, this.cursorY, moveTube);
    };
    Grid.prototype.moveRight = function (moveTube) {
        this.setCursorPos(this.cursorX + 1, this.cursorY, moveTube);
    };
    Grid.prototype.moveUp = function () {
        this.setCursorPos(this.cursorX, this.cursorY - 1, false);
    };
    Grid.prototype.moveDown = function () {
        this.setCursorPos(this.cursorX, this.cursorY + 1, false);
    };
    Grid.prototype.setTube = function (x, y, tube) {
        this.tiles[x][y].type = tube;
        this.refreshGridState();
    };
    Grid.prototype.getTube = function (x, y) {
        return this.tiles[x][y].type;
    };
    Grid.prototype.rotateAtCursor = function () {
        this.tiles[this.cursorX][this.cursorY].rotate();
        this.refreshGridState();
    };
    /**
     * Moves the cursor to the given coordinate
     * @param x
     * @param y
     * @param moveTube	Whether or not to
     */
    Grid.prototype.setCursorPos = function (x, y, moveTube) {
        if (x < 1 || x >= Grid.width - 1 || y < 0 || y > Grid.height || (x == this.cursorX && y == this.cursorY))
            return;
        if (moveTube && this.tiles[this.cursorX][this.cursorY].type != TileType.Empty) {
            //Don't let them move a tube into an occupied tile!
            if (this.tiles[x][y].type != TileType.Empty)
                return;
            //Move the selected tube - if its moved over empty space spawn it as a FallingTube instead of just moving it!
            if (y < Grid.height - 2 && this.tiles[x][y].type == TileType.Empty) {
                this.tubeSpawner.spawnTube(x, y, this.tiles[this.cursorX][this.cursorY].type, 0.01);
            }
            else {
                this.tiles[x][y].type = this.tiles[this.cursorX][this.cursorY].type;
            }
            this.tiles[this.cursorX][this.cursorY].type = TileType.Empty;
            //If there were any tubes above the one we moved, they start falling
            for (var aboveY = y - 1; aboveY >= 0; aboveY--) {
                var aboveType = this.tiles[this.cursorX][aboveY].type;
                if (aboveType == TileType.Empty) {
                    break;
                }
                else {
                    this.tiles[this.cursorX][aboveY].type = TileType.Empty;
                    this.tubeSpawner.spawnTube(this.cursorX, aboveY, aboveType, 0.01);
                }
            }
        }
        this.cursorX = x;
        this.cursorY = y;
        this.refreshGridState();
    };
    /**
     * Recalculates which tubes are filled and if there are any completed paths.
     */
    Grid.prototype.refreshGridState = function () {
        this.visitMap = [];
        for (var x = 0; x < Grid.width; x++) {
            this.visitMap[x] = [];
            for (var y = 0; y < Grid.height; y++) {
                this.visitMap[x][y] = false;
                this.tiles[x][y].isFilled = false;
            }
        }
        for (var y = 0; y < Grid.height; y++) {
            this.refreshGridStateRecurse(0, y, 0, y);
            this.refreshGridStateRecurse(Grid.width - 1, y, Grid.width - 1, y);
        }
    };
    Grid.prototype.refreshGridStateRecurse = function (originX, originY, x, y) {
        if (x < 0 || x >= Grid.width || y < 0 || y >= Grid.height || this.visitMap[x][y])
            return;
        var tile = this.tiles[x][y];
        this.visitMap[x][y] = true;
        if (tile.type == TileType.Empty)
            return;
        tile.isFilled = true;
        if (tile.flowsLeft()) {
            this.refreshGridStateRecurse(originX, originY, x - 1, y);
        }
        if (tile.flowsUp()) {
            this.refreshGridStateRecurse(originX, originY, x, y - 1);
        }
        if (tile.flowsRight()) {
            this.refreshGridStateRecurse(originX, originY, x + 1, y);
        }
        if (tile.flowsDown()) {
            this.refreshGridStateRecurse(originX, originY, x, y + 1);
        }
    };
    return Grid;
}());
Grid.width = 8;
Grid.height = 13;
Grid.offsetX = 52;
Grid.offsetY = 26;
var Sprites = (function () {
    function Sprites() {
    }
    Sprites.load = function () {
        Sprites.backgroundImage = new Image();
        Sprites.backgroundImage.src = "/tubeit/resources/sprites/gui.PNG";
        Sprites.tubesImage = new Image();
        Sprites.tubesImage.src = "/tubeit/resources/sprites/tubes.png";
        Sprites.cursorImage = new Image();
        Sprites.cursorImage.src = "/tubeit/resources/sprites/cursor.png";
    };
    return Sprites;
}());
Sprites.backgroundW = 663;
Sprites.backgroundH = 768;
var TubeIt = (function (_super) {
    __extends(TubeIt, _super);
    function TubeIt(canvas) {
        var _this = _super.call(this, canvas, 60) || this;
        _this.grid = new Grid();
        Sprites.load();
        return _this;
    }
    TubeIt.prototype.onResize = function (viewport) {
        TubeIt.scale = (viewport.h - 50) / Sprites.backgroundH;
        this.height = viewport.h - 50;
        this.width = Sprites.backgroundW * TubeIt.scale;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    };
    TubeIt.prototype.onKeyDown = function (e) {
        switch (e.key) {
            case "ArrowLeft":
                this.grid.moveLeft(this.isShiftDown);
                this.hasShiftMoved = true;
                break;
            case "ArrowRight":
                this.grid.moveRight(this.isShiftDown);
                this.hasShiftMoved = true;
                break;
            case "ArrowUp":
                if (!this.isShiftDown)
                    this.grid.moveUp();
                break;
            case "ArrowDown":
                if (!this.isShiftDown)
                    this.grid.moveDown();
                break;
            case "Shift":
                this.isShiftDown = true;
                this.hasShiftMoved = false;
                break;
        }
    };
    TubeIt.prototype.onKeyUp = function (e) {
        if (e.key == "Shift") {
            if (!this.hasShiftMoved)
                this.grid.rotateAtCursor();
            this.isShiftDown = false;
        }
    };
    TubeIt.prototype.update = function () {
        this.grid.update();
    };
    TubeIt.prototype.draw = function (cx) {
        cx.fillStyle = '#FF0000FF';
        cx.fillRect(0, 0, this.width, this.height);
        cx.drawImage(Sprites.backgroundImage, 0, 0, Sprites.backgroundW * TubeIt.scale, Sprites.backgroundH * TubeIt.scale);
        this.grid.draw(cx);
    };
    return TubeIt;
}(GameBase));
window.onload = function () {
    var game = new TubeIt(document.getElementById("canvas"));
    game.start();
};
//# sourceMappingURL=app.js.map