class SSFilledLine {

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

    // add slab to the horizontal line 
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

    isLineFull() {
        if (typeof this.arrSlabPositions === 'undefined') {
            return false;
        } else if (this.arrSlabPositions.length === 0) {
            return false;
        } else {
            let returnValue = true;
            this.arrSlabPositions.forEach((ele) => {
                (returnValue = returnValue && ele === 'Y');

            });
            return returnValue;
        }
    }

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

    drawHorizontalLine(context) {
        // console.log(" drawHorizontalLine() called ");
        this.context = context;
        this.arrSlabs.forEach((eachSlab) => {
            // eachSlab.drawSlab(eachSlab.xPosition);
            eachSlab.drawSlab();
        });
    }

}


// if(ele.xPosition === xPos){
// retVal = retVal && ();
// }