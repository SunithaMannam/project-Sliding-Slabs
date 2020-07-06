class SSGame {
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

    init() {
        this.canvas = document.querySelector("#ss-canvas");
        this.gameCtx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.isSlabFalling = false;
        this.arrAllLines = [];
        this.start();
    }

    start() {
        this.gameCtx.beginPath();
        this.randXPos = (Math.floor(Math.random() * this.width));
        this.randXPos = (this.randXPos < 25 ? 0 : Math.floor(this.randXPos / 25)) * 25;
        // this.startNewSlab();

        setInterval(() => {
            // draw all lines
            if (!this.isSlabFalling) {
                this.startNewSlab();
                this.simpleSlab.moveSlab();
            }

        }, 1000 / 4);
        // let line = new SSFilledLine(this.simpleSlab);
        // this.arrAllLines.push(line);

        // line.topY = 25;
        // line.bottomY = 0;
        // line.drawSlabsLine(this.gameCtx);
        // if (line.isLineFull()) {
        //     console.log(" line is full ");
        // }
        console.log(" inside SSGame-> start()"); // + this.simpleSlab.xPosition + " " + this.simpleSlab.yPosition);
    }

    startNewSlab() {
        this.simpleSlab = new Slab();
        this.simpleSlab.setGame(this);
        this.simpleSlab.draw(this.randXPos);
    }

    // adds the slab to existing or new line
    addSlabToLine(slab) {
        // case 1: there are no lines 
        if (this.arrAllLines.length === 0) {
            // create a new line and add to array
            let newLine = new SSFilledLine();
            newLine.setSlab(slab);
            this.arrAllLines.push(newLine);
        }
        //  else if () {
        //     // case 2: if lines are there, but should be added to new line 

        // }
    }

    // to chek whether line is colliding with falling slab
    isLineCollision(slab) {
        if (this.isSlabFalling) {

        }
    }

}