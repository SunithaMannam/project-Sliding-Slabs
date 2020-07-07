class SSGame {

    /* SSGame constructor */
    constructor() {
        this.canvas = undefined;
        this.gameCtx = undefined;
        this.simpleSlab = undefined;
        this.arrAllLines = undefined;
        this.x = undefined;
        this.y = undefined;
        this.isSlabFalling = undefined;
        this.randXPos = undefined;

    }

    /* SSGame object is initialised */
    init() {
        this.canvas = document.querySelector("#ss-canvas");
        this.gameCtx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.isSlabFalling = false;
        this.isCanvasTouched = true;
        this.arrAllLines = [];
        this.start();
    }

    /* Start the Sliding  Slabs Game */
    start() {
        this.gameCtx.beginPath();
        this.randXPos = (Math.floor(Math.random() * this.width));
        this.randXPos = (this.randXPos < 25 ? 0 : Math.floor(this.randXPos / 25)) * 25;
        // this.startNewSlab();
        /* Timer todo below tasks repeatedly: 
            1. Draw all the lines on canvas, 
            2. Trigger a new fallling slab,if previous slab hit the bottom
            3. Add check the collision of slab and add the slab to horizontal lines
        */
        setInterval(() => {
            // 1. Draw all the lines on canvas
            if (this.arrAllLines.length > 0) {
                this.arrAllLines.forEach((eachLine) => {
                    eachLine.drawHorizontalLine(this.gameCtx);
                });
            }
            //2. Trigger a new fallling slab,if previous slab hit the bottom
            if (!this.isSlabFalling) {
                this.startNewSlab();
                this.simpleSlab.moveSlab();
            } else {
                // 3. Add check the collision of slab with canvas and add the slab to horizontal lines
                console.log();
                // if (this.simpleSlab.checkLineCollision() || this.isLineCollision(this.simpleSlab)) {
                //     console.log(" stopSlab() from SSGame.js check");
                //     this.simpleSlab.stopSlab();
                //     // this.addSlabToLines(this.simpleSlab);
                // }
            }
        }, 1000 / 4);
        // console.log(" inside SSGame-> start()"); // + this.simpleSlab.xPosition + " " + this.simpleSlab.yPosition);
    }

    /* Create a new slab and draw,mone onthe canvas [for falling slab]*/
    startNewSlab() {
        console.log(" start new slab ");
        this.simpleSlab = new Slab();
        this.simpleSlab.setGame(this);
        this.simpleSlab.draw(this.randXPos);
    }

    /* Adds the collide slab to the array of horizontal lines */
    addSlabToLines(slab) {
        console.log("addSlabToLines() -> this.arrAllLines.length :   " + this.arrAllLines.length);
        // case 1: there are no lines 
        const arrLen = this.arrAllLines.length;
        if (arrLen === 0) {
            console.log(" addSlabToLines : case 1 ");
            // create a new line and add to array
            let newLine = new SSFilledLine();
            newLine.addSlab(slab);
            this.arrAllLines.push(newLine);
        } else if (this.arrAllLines[arrLen - 1].topY === slab.yPosition + slab.height) {
            console.log(" addSlabToLines : case 2 ");
            // add a new line, as slab has hit the opt horizontal line
            let newLine = new SSFilledLine();
            newLine.addSlab(slab);
            this.arrAllLines.push(newLine);
        } else {
            console.log(" addSlabToLines : case 3 ");
            // slab hit a line that is not the top
            let line = this.getHorizontalLine(slab);
            // if (line != null) {
            line.addSlab(slab);
            // }
        }
        // console.log(" AAA: " + this.arrAllLines.slice[arrLen - 1].topY);

    }


    /* Retunrs the horizontal line object, where the slab can fit.*/

    getHorizontalLine(slab) {
        console.log("getHorizontalLine() --  " + this.arrAllLines.length);
        let retElement;
        if (this.arrAllLines.length > 0) {
            this.arrAllLines.forEach((element) => {
                console.log("getHorizontalLine() --  " + element.topY + " slab-Y: " + slab.yPosition + "touch type: " + this.isCanvasTouched);
                if (!this.isCanvasTouched && element.topY === slab.yPosition + slab.height) {
                    retElement = element;
                }
                if (this.isCanvasTouched && element.topY === slab.yPosition) {
                    retElement = element;
                }
            });
        }
        return retElement;
    }

    /* to chek whether falling slab is colliding with any of horizontal lines (but not canvas) */
    isLineCollision(slab) {
        if (this.isSlabFalling) {
            if (this.arrAllLines.length <= 0) {
                return false;
            } else {
                let retVal = false;
                this.arrAllLines.forEach((eachline) => {
                    console.log("isLineCollision() --  " + eachline.topY + " slab-Y: " + slab.yPosition + "slab-x: " + slab.xPosition);

                    if (slab.yPosition + slab.height === eachline.topY && eachline.isSlotFull(slab.xPosition)) {
                        console.log(" isLineCollision() -- slab collided with one of lines");
                        this.isSlabFalling = false;
                        retVal = true;
                    }
                });
                return retVal;
            }
        }
        return false;
    }

}