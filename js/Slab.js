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
        this.xPosition = xPos;
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
        console.log(`x:  ${this.xPosition}   y: ${this.yPosition} `);
    }

    clearSlab() {
        console.log(" clearSlab()  : " + this.xPosition + "  " + this.yPosition);
        this.gameCtx.clearRect(this.xPosition, this.yPosition, this.width, this.height);
    }

    draw(xPos) {
        this.clearSlab();
        this.game.isSlabFalling = true;
        this.xPosition = xPos;
        this.drawSlab(this.xPosition);
        this.movetimer = setInterval(() => {
            console.log(" set time out ");
            this.drawSlab(this.xPosition);
            this.clearSlab();
            // if (this.checkCanvasCollision()) {
            if (this.checkCanvasCollision() || this.checkLineCollision()) {
                this.stopSlab();
            }
            this.yPosition += 25;
        }, 1000 / 2);

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
        this.game.isSlabFalling = false;
        this.game.addSlabToLine(this);
        console.log("collision with canvas border found. ");
    }

    checkCanvasCollision() {
        // if ((this.yPosition + this.height) >= this.canvasHeight) {
        if (this.canvasHeight - (this.yPosition) <= this.height) {
            return true;
            // clearTimeout(this.movetimer);
            // this.drawSlab(this.xPosition);
            console.log(" touched canvas bottom");
        }
        return false;
    }

    checkLineCollision() {
        return this.game.isLineCollision(this);
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
                console.log(" moveslab() -- " + event.keyCode);
                this.drawSlab(this.xPosition);

            }
        }
    }
}