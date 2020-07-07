class Slab {

    constructor() {
        this.xPosition = 0;
        this.yPosition = 0;
        this.width = 25;
        this.height = 25;
        this.movetimer = undefined;
    }

    setGame(game) {
        this.game = game;
        this.gameCtx = game.gameCtx;
        this.canvasHeight = game.height;
        this.canvasWidth = game.width;
    }

    drawSlab(xPos) {
        // xPos = xPos || -1;
        this.xPosition = xPos || this.xPosition;

        // this.yPosition = 0;
        // this.gameCtx.fillStyle = "red";
        // let gradient = this.gameCtx.createLinearGradient(this.xPosition, this.yPosition, this.width, this.height);
        // gradient.addColorStop(0, "red");
        // gradient.addColorStop(0.5, "white");
        // gradient.addColorStop(0.9, "red");
        // this.gameCtx.fillStyle = gradient;
        const img = new Image();
        img.src = 'images/redpattern_2.jpg';
        img.onload = () => {
            let pattern = this.gameCtx.createPattern(img, 'repeat');
            this.gameCtx.fillStyle = pattern;
            this.gameCtx.fillRect(this.xPosition, this.yPosition, this.width, this.height);
        };
        // console.log(` inside drawSlab() --- x:  ${this.xPosition}   y: ${this.yPosition} `);
    }

    clearSlab() {
        if (this.game.isSlabFalling) {
            // console.log(" clearSlab()  : " + this.xPosition + "  " + this.yPosition);
            this.gameCtx.clearRect(this.xPosition, this.yPosition, this.width, this.height);
        }
    }

    draw(xPos) {
        // this.clearSlab();
        this.game.isSlabFalling = true;
        this.xPosition = xPos;
        // this.drawSlab(this.xPosition);
        this.movetimer = setInterval(() => {
            // console.log(" set time out ");
            if (this.game.isSlabFalling) {
                this.drawSlab(this.xPosition);
                this.clearSlab();
            }
            // console.log(" CHECK CHECK LINE LINE ");
            // if (this.game.isLineCollision(this) === true) {
            if (this.checkLineCollision()) {
                console.log(" stopSlab() checkLineCollision() - from slab.js check");
                this.game.isCanvasTouched = false;
                this.stopSlab();
            } else if (this.checkCanvasCollision()) {
                console.log(" stopSlab() checkCanvasCollision() - from slab.js check");
                this.game.isCanvasTouched = true;
                this.stopSlab();
            } else {
                this.yPosition += 25;
            }

        }, 1000 / 4);

        // window.requestAnimationFrame(this.draw(xPos));
        // this.yPosition += 30;
        // setInterval(() => {
        //     // this.clearSlab();
        //     this.draw(xPos);
        //     this.yPosition += 30;
        // }, 1000);
    }

    stopSlab() {
        clearInterval(this.movetimer);
        this.game.addSlabToLines(this);
        // console.log("stopSlab(),  slab collided  ");
    }

    checkCanvasCollision() {
        // if ((this.yPosition + this.height) >= this.canvasHeight) {
        if (this.canvasHeight - (this.yPosition) <= this.height) {
            // console.log(" slab collided with canvas");
            this.game.isSlabFalling = false;
            return true;
            // clearTimeout(this.movetimer);
            // this.drawSlab(this.xPosition);
        }
        return false;
    }

    checkLineCollision() {
        if (this.game.isLineCollision(this))
            return true;
        else
            return false;
    }

    moveSlab() {
        document.onkeydown = (event) => {
            const key = event.keyCode;
            /*  37 : arrow left ;  39 : arrow right ;   */
            const possibleKeyStrokes = [37, 39];
            if (possibleKeyStrokes.includes(key)) {
                this.clearSlab();
                switch (key) {
                    case 37: // arrow left 
                        if (this.xPosition >= this.width) {
                            this.xPosition -= this.width;
                        }
                        break;

                    case 39: // arrow right
                        if (this.canvasWidth - this.xPosition > this.width) {
                            this.xPosition += this.width;
                        }
                        break;
                }
                // console.log(" moveslab() -- " + event.keyCode);
                this.drawSlab(this.xPosition);

            }
        }
    }
}