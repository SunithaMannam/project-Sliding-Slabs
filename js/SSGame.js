/**
 *  Class for that hold and controls the game logi and game canvas
 */
class SSGame {

    /**
     *  SSGame constructor
     */
    constructor() {
        this.canvas = undefined;
        this.gameCtx = undefined;
        this.simpleSlab = undefined;
        this.arrAllLines = undefined;
        this.x = undefined;
        this.y = undefined;
        this.isSlabFalling = undefined;
        this.randXPos = undefined;
        this.gameTimer = undefined;
        this.score = 0;
        this.colors = ["deepSkyBlue", "yellowGreen", "yellow", "wheat", "magenta", "beige"];
    }

    /**
     *  SSGame object is initialised
     * */
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
        this.gameCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.start();
    }

    /**
     *  Start the Sliding  Slabs Game
     * */
    start() {
        this.gameCtx.beginPath();
        /**
         * Timer todo below tasks repeatedly: 
         *   1. Draw all the lines on canvas, 
         *   2. Trigger a new fallling slab,if previous slab hit the bottom &&  Add check the collision of slab and add the slab to horizontal lines 
         *   3. Check for lines full and remove the fully formed lines
         * */
        this.gameTimer = setInterval(() => {
            // 1. Draw all the lines on canvas
            if (this.arrAllLines.length > 0) {
                this.arrAllLines.forEach((eachLine) => {
                    // 3. Check for lines full and remove the fully formed lines                    
                    this.removeFilledLine();
                    // this.gameCtx.restore();                    
                    this.drawAllLines();
                });
            }
            //2. Trigger a new fallling slab,if previous slab hit the bottom
            if (!this.isSlabFalling) {
                this.startNewSlab();
                this.simpleSlab.moveSlab();
            }
            if (this.checkTopCollision()) {
                console.log(`collised with top game over !! ${this.arrAllLines.length} `);
                this.stopGame();
            }
        }, 1000 / 1);
        // console.log(" inside SSGame-> start()"); // + this.simpleSlab.xPosition + " " + this.simpleSlab.yPosition);
    }


    /**
     * Create a new slab and draw,mone onthe canvas [for falling slab]
     * */
    startNewSlab() {
        // console.log(" start new slab ");
        // this.randXPos = (Math.floor(Math.random() * this.width));
        // this.randXPos = (this.randXPos < 25 ? 0 : Math.floor(this.randXPos / 25)) * 25;
        this.randXPos = Math.floor(this.width / 2);

        this.simpleSlab = new Slab();
        this.simpleSlab.setGame(this);
        this.simpleSlab.draw(this.randXPos, this.colors[(Math.floor(Math.random() * this.colors.length))]);
    }

    /**
     *  Adds the collide slab to the array of horizontal lines
     *  */
    addSlabToLines(slab) {
        // console.log("addSlabToLines() -> this.arrAllLines.length :   " + this.arrAllLines.length);
        // console.log(` addSlabToKines: ${slab.xPosition}, ${slab.yPosition}`);
        // case 1: there are no lines 
        const arrLen = this.arrAllLines.length;
        if (arrLen === 0) {
            // console.log(" addSlabToLines : case 1 ");
            // create a new line and add to array
            let newLine = new SSFilledLine();
            newLine.addSlab(slab);
            this.arrAllLines.push(newLine);
        } else if (this.arrAllLines[arrLen - 1].topY === slab.yPosition + slab.height) {
            // console.log(" addSlabToLines : case 2 ");
            // add a new line, as slab has hit the opt horizontal line
            let newLine = new SSFilledLine();
            newLine.addSlab(slab);
            this.arrAllLines.push(newLine);
        } else {
            // console.log(" addSlabToLines : case 3 ");
            // slab hit a line that is not the top
            let line = this.getHorizontalLine(slab);
            if (typeof line != 'undefined') {
                // console.log(" addSlabToLines : case 3 -> line found ");
                if (line.topY === slab.yPosition) {
                    // console.log(" addSlabToLines : case 3 -> line found -> y position matches");
                    line.addSlab(slab);
                }
            }
        }
        // console.log(" AAA: " + this.arrAllLines.length);
    }


    /**
     * Returns the horizontal line object, where the slab can fit.
     * */
    getHorizontalLine(slab) {
        // console.log("getHorizontalLine() --  " + this.arrAllLines.length);
        let retElement;
        if (this.arrAllLines.length > 0) {
            this.arrAllLines.forEach((element) => {
                if (element.topY === slab.yPosition) {
                    retElement = element;
                }
            });
        }
        return retElement;
    }

    /**
     *  To chek whether falling slab is colliding with any of horizontal lines (but not canvas) 
     * */
    isLineCollision(slab) {
        if (this.isSlabFalling) {
            if (this.arrAllLines.length <= 0) {
                return false;
            } else {
                let retVal = false;
                this.arrAllLines.forEach((eachline) => {
                    // console.log("isLineCollision() --  " + eachline.topY + " slab-Y: " + slab.yPosition + "slab-x: " + slab.xPosition);
                    if (slab.yPosition + slab.height === eachline.topY && eachline.isSlotFull(slab.xPosition)) {
                        // console.log(" isLineCollision() -- slab collided with one of lines");
                        this.isSlabFalling = false;
                        retVal = true;
                    }
                });
                return retVal;
            }
        }
        return false;
    }

    /**
     * returns true, if left position of the slab is full => there is a left collision
     * @param {*} slab 
     */
    isLeftSideCollision(slab) {
        let isLeftCollide = false;

        if (this.isSlabFalling) {
            if (this.arrAllLines.length <= 0) {
                return false;
            } else {
                this.arrAllLines.forEach((eachline) => {
                    eachline.arrSlabs.forEach((eachSlab) => {
                        if (eachline.isLeftFull(slab)) {
                            isLeftCollide = true;
                        }
                    });

                });
                return isLeftCollide;
            }
        }
    }



    /**
     * returns true, if right position of the slab is full => there is a right collision
     * @param {*} slab 
     */
    isRightSideCollision(slab) {
        let isLeftCollide = false;

        if (this.isSlabFalling) {
            if (this.arrAllLines.length <= 0) {
                return false;
            } else {
                this.arrAllLines.forEach((eachline) => {
                    eachline.arrSlabs.forEach((eachSlab) => {
                        if (eachline.isRightFull(slab)) {
                            isLeftCollide = true;
                        }
                    });

                });
                return isLeftCollide;
            }
        }
    }



    /**
     * returns true, if bottom position of the slab is full => there is a bottom collision
     * @param {*} slab 
     */
    isBottomSideCollision(slab) {
        let isBottomCollide = false;

        if (this.isSlabFalling) {
            if (this.arrAllLines.length <= 0) {
                return false;
            } else {
                this.arrAllLines.forEach((eachline) => {
                    eachline.arrSlabs.forEach((eachSlab) => {
                        if (eachline.isBottomFull(slab)) {
                            isBottomCollide = true;
                        }
                    });

                });
                return isBottomCollide;
            }
        }


    }
    /**
     *  Draw all slabs that reached the bottom of the canvas
     */
    drawAllLines() {
        this.gameCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.arrAllLines.length > 0) {

            this.arrAllLines.forEach((eachLine, idx) => {
                // console.log(` while drawing : ${idx}: top-y: ${eachLine.topY} , bottom-y: ${eachLine.bottomY}`);
                eachLine.drawHorizontalLine(this.gameCtx);
            });
        }
    }


    /**
     * Check for the filled horizontal lines and removes them 
     */
    removeFilledLine() {
        let index = -1;
        if (this.arrAllLines.some((ele) => (ele.arrSlabs.length === this.canvas.width / 25))) {

            index = this.arrAllLines.findIndex((ele) => (ele.arrSlabs.length === this.canvas.width / 25));
            // console.log(`removeFilledLine() ->  line ${index} is filled `);
            this.arrAllLines.forEach((ele, idx) => {
                // console.log(`Before change: ${idx}: top-y: ${ele.topY} , bottom-y: ${ele.bottomY}`);
                // if (index != idx) {
                if (index <= idx) {
                    ele.bottomY += 25;
                    ele.topY += 25;
                    ele.changeSlabPosition(ele.topY);
                }
                // console.log(`After change: ${idx}: top-y: ${ele.topY} , bottom-y: ${ele.bottomY}`);
            });
            this.arrAllLines = this.arrAllLines.filter((ele) => ((ele.arrSlabs.length != this.canvas.width / 25)));
            this.score += 50;
            // console.log(" --- after remoing row: ");
            this.arrAllLines.forEach((ele, idx) => {
                // console.log(`After removing: ${idx}: top-y: ${ele.topY} , bottom-y: ${ele.bottomY}`);
            });
        }
    }


    /**
     *  to stop the game
     */
    stopGame() {
        this.simpleSlab.stopSlab();
        clearInterval(this.gameTimer);
        let img = new Image();
        img.src = 'images/gameover_1.jpg';
        img.onload = () => {
            this.gameCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameCtx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.gameCtx.font = "30px Impact";
            this.gameCtx.fillStyle = "#f44336";
            this.gameCtx.fillText("Score: " + this.score, (this.canvas.width / 2) - 75, (this.canvas.height / 2) - 100);

        };

        const btn = document.querySelector(".btn-game");
        btn.classList.remove('stop');
        btn.classList.add('start');
        btn.innerText = 'START GAME';
    }


    /**
     * cheks whether the slab collided with Top of screen
     */
    checkTopCollision() {
        let retVal = false;
        this.arrAllLines.forEach((ele) => {
            if (ele.topY === 0) {
                retVal = true;
            }
        });
        // console.log(" checkTopCollision():  " + retVal);
        return retVal;
    }

}