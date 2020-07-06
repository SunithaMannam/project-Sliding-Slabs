class SSFilledLine {

    constructor() {
        this.height = 25;
        this.arrSlabPositions = ['Y', 'N', 'N', 'N',
            'N', 'Y', 'N', 'N',
            'N', 'N', 'N', 'N',
            'N', 'N', 'N', 'Y'
        ];
        this.arrSlabs = [];
    }

    setSlab(slab) {
        if (this.arrSlabs.length === 0) {
            this.arrSlabs.push(slab);
            this.topY = slab.yPosition;
            this.bottomY = slab.yPosition + slab.height;
        } else if (this.topY) {

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

    drawSlabsLine(context) {
        this.context = context;

    }

}