class Character {
    constructor(data, heads, shirts, bottoms) {
        this.headImage = heads[data.customization.headChoice];
        this.shirtImage = shirts[data.customization.shirtChoice];
        this.bottomImage = bottoms[data.customization.bottomChoice]
        this.name = data.name
        this.socials = data.socials


        this.metaScore = data.meta_score
        this.movementThreshold = 100000
        this.movementCounter = 0
        this.encounterCounter = 0
        this.otherScore = null
    }

    display(xPos, yPos, xSize, ySize) {
        image(this.bottomImage, xPos, yPos, xSize, ySize)
        image(this.shirtImage, xPos, yPos, xSize, ySize)
        image(this.headImage, xPos, yPos, xSize, ySize)

    }

    update() {
        if (this.encounterCounter == 0) {
            if (this.movementCounter >= this.movementThreshold) {
                this.movementCounter = 0
                return true
            } else {
                this.movementCounter += this.metaScore;
                return false
            }
        } else {
            this.encounterCounter = max(this.encounterCounter - this.metaScore - this.otherScore, 0)
        }
    }
}