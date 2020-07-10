/**
 *  Class that represents each slab (the moving blocks if the game)
 */
class Slab {
    /**
     *  Slab constructor
     */
    constructor() {
        this.xPosition = 0;
        this.yPosition = -25;
        this.width = 25;
        this.height = 25;
        this.movetimer = undefined;
    }

    /**
     *  Sets the game object to the Slab
     * @param {*} game
     */
    setGame(game) {
        this.game = game;
        this.gameCtx = game.gameCtx;
        this.canvasHeight = game.height;
        this.canvasWidth = game.width;
        this.color = "red";
    }

    /**
     * Draw the slab on the canvas i.e
     * the falling slab or the slab that reached bottom
     * @param {*} xPos
     */
    drawSlab(xPos, color) {
        // xPos = xPos || -1;
        this.xPosition = xPos || this.xPosition;
        this.color = color || this.color;
        // this.yPosition = 0;
        // this.gameCtx.fillStyle = "red";
        // let gradient = this.gameCtx.createLinearGradient(this.xPosition, this.yPosition, this.width, this.height);
        // gradient.addColorStop(0, "red");
        // gradient.addColorStop(0.5, "white");
        // gradient.addColorStop(0.9, "red");
        // this.gameCtx.fillStyle = gradient;
        const img = new Image();
        img.src = "images/redpattern_2.jpg";
        // img.src = "images/smiley_1.png";
        img.onload = () => {
            // let pattern = this.gameCtx.createPattern(img, "repeat");
            //   this.gameCtx.fillStyle = pattern;
            this.gameCtx.fillStyle = this.color; //"red";
            this.gameCtx.fillRect(
                this.xPosition,
                this.yPosition,
                this.width,
                this.height
            );
            this.gameCtx.strokeStyle = "#701007";
            this.gameCtx.lineWidth = 3;
            this.gameCtx.strokeRect(
                this.xPosition,
                this.yPosition,
                this.width,
                this.height
            );
            // this.gameCtx.stroke();
            // this.gameCtx.shadowBlur = 20;
            // this.gameCtx.lineWidth = 2;
            // this.gameCtx.strokeRect(this.xPosition, this.yPosition, this.width, this.height);
        };
        // console.log(
        //     ` inside drawSlab() --- x:  ${this.xPosition}   y: ${this.yPosition}  , ${ this.color}`
        // );
    }

    /**
     *  clears the slab from the canvas used to create moving effect
     */
    clearSlab() {
        if (this.game.isSlabFalling) {
            // console.log(" clearSlab()  : " + this.xPosition + "  " + this.yPosition);
            this.gameCtx.clearRect(
                this.xPosition - 2,
                this.yPosition - 2,
                this.width + 4,
                this.height + 4
            );
            //   this.gameCtx.clearRect(
            //     this.xPosition - 1,
            //     this.yPosition - 1,
            //     this.width + 2,
            //     this.height + 2
            //   );
            // this.gameCtx.clearRect(this.xPosition, this.yPosition, this.width, this.height);
        }
    }

    /**
     *  to draw Slab on the canvas continuously.
     *  Timer is  started that repeats the drawing task
     *  This also checks the collision of alsb with bottom of canvas or with any other slabs
     * @param {*} xPos
     */
    draw(xPos, color) {
        // this.clearSlab();
        this.game.isSlabFalling = true;
        this.xPosition = xPos;
        this.color = color || this.color;
        // this.drawSlab(this.xPosition);
        this.movetimer = setInterval(() => {
            if (this.game.isSlabFalling) {
                this.drawSlab(this.xPosition, this.color);
                this.clearSlab();
            }

            // if (this.game.isLineCollision(this) === true) {
            if (this.checkLineCollision()) {
                this.game.isCanvasTouched = false;
                this.stopSlab();
            } else if (this.checkCanvasCollision()) {
                this.game.isCanvasTouched = true;
                this.stopSlab();
            } else {
                this.yPosition += 25;
            }
        }, 1000 / 4);
    }

    /**
     *  stops the timer that trigger the salb falling
     *  used to stop the slab drawing task, once the salb reaches the bottom of screen
     */
    stopSlab() {
        clearInterval(this.movetimer);
        if (typeof this.game != "undefined") {
            this.game.addSlabToLines(this);
        }
        // console.log("stopSlab(),  slab collided  ");
    }

    /**
     * cheks whether the slab collided with bottom of screen
     */
    checkCanvasCollision() {
        // if ((this.yPosition + this.height) >= this.canvasHeight) {
        if (this.canvasHeight - this.yPosition <= this.height) {
            // console.log(" slab collided with canvas");
            this.game.isSlabFalling = false;
            return true;
            // clearTimeout(this.movetimer);
            // this.drawSlab(this.xPosition);
        }
        return false;
    }

    /**
     * chesks whether the slab reaches the bottom, but touches any other slabs
     */
    checkLineCollision() {
        if (this.game.isLineCollision(this)) {
            this.game.isSlabFalling = false;
            return true;
        } else {
            return false;
        }
    }

    /**
     * For slab moving roght or left
     */
    moveSlab() {
        document.onkeydown = (event) => {
            const key = event.keyCode;
            /*  37 : arrow left ;  39 : arrow right ;   */
            const possibleKeyStrokes = [37, 39, 40];
            if (possibleKeyStrokes.includes(key) && this.game.isSlabFalling) {
                this.clearSlab();
                switch (key) {
                    case 37: // arrow left
                        // alert(this.game.isLeftSideCollision(this));
                        // console.log(`is slab colliding to left slab ${!this.game.isLeftSideCollision(this)} , slabx: ${this.xPosition} , slaxY: ${this.yPosition}`);
                        // || this.game.isLeftSideCollision(this)
                        if (
                            this.xPosition >= this.width &&
                            !this.game.isLeftSideCollision(this)
                        ) {
                            this.xPosition -= this.width;
                        }
                        break;

                    case 39: // arrow right
                        if (
                            this.canvasWidth - this.xPosition > this.width &&
                            !this.game.isRightSideCollision(this)
                        ) {
                            this.xPosition += this.width;
                        }
                        break;

                    case 40:
                        if (
                            this.yPosition + this.height < this.canvasHeight &&
                            !this.game.isBottomSideCollision(this)
                        ) {
                            this.yPosition += this.height;
                        }
                        break;
                }
                // console.log(" moveslab() -- " + event.keyCode);
                this.drawSlab(this.xPosition);
                // if (this.checkLineCollision()) {
                //     this.game.isCanvasTouched = false;
                //     this.stopSlab();
                // } else if (this.checkCanvasCollision()) {
                //     this.game.isCanvasTouched = true;
                //     this.stopSlab();
                // } else {
                //     this.drawSlab(this.xPosition);
                // }
            }
        };
    }
}