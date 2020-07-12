/**
 *  Class for storing all the slabs that reached the bottom and in a line.
 *  may be line with filled slabs or line with some empty slab positions
 */
class SSFilledLine {

    /**
     * SSFilledLine constructor
     */
    constructor() {
        this.height = 25;
        this.arrSlabs = [];
        this.topY = undefined;
        this.bottomY = undefined;
        this.isLineFull = undefined;
    }


    /**
     * Adds slab to the horizontal line 
     * @param {*} slab 
     */
    addSlab(slab) {
        if (this.arrSlabs.length === 0) {
            this.arrSlabs.push(slab);
            this.topY = slab.yPosition;
            this.bottomY = slab.yPosition + slab.height;
        } else { // if (this.topY) 
            this.arrSlabs.push(slab);
        }
        this.isLineFull = false;
        // console.log(`addSlab() ${this.arrSlabs.length} `);
    }

    /**
     * Checks whetehr the line is filled with slabs
     * @param {*} width 
     */
    isLineFull(width) {
        if (this.arrSlabs.length === Math.floor(width / 25)) {
            return true;
        }
    }

    /**
     *  changes the y-position of slabs
     * used when fully formed lines ae removed from screen and to move the slab     *
     * @param {*} yPosition 
     */
    changeSlabPosition(yPosition) {
        if (this.arrSlabs.length > 0) {
            this.arrSlabs.forEach((ele) => {
                ele.yPosition = yPosition;
            });
        }
    }

    /**
     * 
     * Checks whether a particular position in the line is empty or not 
     * @param {} xPos 
     */
    isSlotFull(xPos) {
        let retVal = false;
        this.arrSlabs.forEach((ele) => {
            if (ele.xPosition === xPos) {
                retVal = true;
            }
        });
        // console.log(" isslotFull():  " + retVal);
        return retVal;
    }

    /**
     * Draws all the slabs in each line on the canvas
     * @param {} context 
     */
    drawHorizontalLine(context) {
        // console.log(" drawHorizontalLine() called ");
        this.context = context;
        if (!this.isLineFull) {

            this.arrSlabs.forEach((eachSlab) => {
                // eachSlab.drawSlab(eachSlab.xPosition);              
                eachSlab.drawSlab();
            });
        }
    }

    /**
     * checks whether the left place of the slab ( in parameter) is filled or not,
     * so that we can mvoe the slab to left
     * returns 'true' when left position is filled, else return false
     * @param {*} slab 
     */
    isLeftFull(slab) {
        let retVal = false;
        this.arrSlabs.forEach((ele) => {
            if ((ele.xPosition + ele.width === slab.xPosition) && (ele.yPosition === slab.yPosition)) {
                retVal = true;
            }
        });
        return retVal;
    }


    /**
     * checks whether the right place of the slab ( in parameter) is filled or not,
     * so that we can mvoe the slab to right
     * returns 'true' when right position is filled, else return false
     * @param {*} slab 
     */
    isRightFull(slab) {
        let retVal = false;
        this.arrSlabs.forEach((ele) => {
            if ((ele.xPosition === slab.xPosition + slab.width) && (ele.yPosition === slab.yPosition)) {
                retVal = true;
            }
        });
        return retVal;
    }

    /**
     * checks whether the bottom place of the slab ( in parameter) is filled or not,
     * so that we can mvoe the slab to bottom
     * returns 'true' when bottom position is filled, else return false
     * @param {*} slab 
     */
    isBottomFull(slab) {
        let retVal = false;
        this.arrSlabs.forEach((ele) => {
            if ((ele.yPosition - slab.height === slab.yPosition) && (ele.xPosition === slab.xPosition)) {
                retVal = true;
            }
        });
        return retVal;
    }


    /**
     * cheks whether the slab collided with Top of screen
     */
    isTopHit() {
        let retVal = false;
        this.arrSlabs.forEach((ele) => {
            if (ele.xPosition === 0) {
                retVal = true;
            }
        });
        // console.log(" checkTopCollision():  " + retVal);
        return retVal;
    }
}