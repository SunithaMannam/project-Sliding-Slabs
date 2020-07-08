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
        this.arrSlabPositions = ['Y', 'N', 'N', 'N',
            'N', 'Y', 'N', 'N',
            'N', 'N', 'N', 'N',
            'N', 'N', 'N', 'Y'
        ];
        this.arrSlabs = [];
        this.topY = undefined;
        this.bottomY = undefined;
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
        // const idx = positionY % 25;
        this.arrSlabPositions[slab.yPosition / 25] = 'Y';
    }

    /**
     * Checks whetehr the line is filled with slabs
     * @param {*} width 
     */
    isLineFull(width) {
        if (this.arrSlabs.length === Math.floor(width / 25)) {
            return true;
        }
        // if (typeof this.arrSlabPositions === 'undefined') {
        //     return false;
        // } else if (this.arrSlabPositions.length === 0) {
        //     return false;
        // } else {

        //     return returnValue;
        // }
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
        console.log(" isslotFull():  " + retVal);
        return retVal;
    }

    /**
     * Draws all the slabs in each line on the canvas
     * @param {} context 
     */
    drawHorizontalLine(context) {
        // console.log(" drawHorizontalLine() called ");
        this.context = context;
        this.arrSlabs.forEach((eachSlab) => {
            // eachSlab.drawSlab(eachSlab.xPosition);
            eachSlab.drawSlab();
        });
    }

}