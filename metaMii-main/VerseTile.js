class VerseTile {
    constructor(id, x, y, xPos, yPos, size, verseXSize, verseYSize) {
        this.id = id
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.x = x
        this.y = y
        this.character = null;
        this.verseXSize = verseXSize;
        this.verseYSize = verseYSize;
    }

    display() {
        if (this.character != null && this.character.encounterCounter != 0) {
            fill(188)
        } else {
            fill(231,231,222)
        }
        stroke(255)
        square(this.xPos, this.yPos, this.size)
        text(this.x + ", " + this.y, this.xPos, this.yPos, this.size, this.size)
        if (this.character != null) {
            this.character.display(this.xPos, this.yPos, this.size, this.size)
            // console.log("drew " + this.character.name + "'s character at " + this.x + ", " + this.y + " (" + this.xPos + ", " + this.yPos +")");
        }
    }

    update() {
        // this.display()
        if (this.character != null) {
            return this.character.update()
        }
        return false
    }

    getRandomAdjacent() {
        let xDir = random([-1, 0, 1])
        let yDir = random([-1, 0, 1])
        let newX, newY;
        if (xDir + this.x < this.verseXSize && xDir + this.x >= 0) {
            newX = xDir + this.x;
        } else {
            newX = this.x
        }
        if (yDir + this.y < this.verseYSize && yDir + this.y >= 0) {
            newY = yDir + this.y;
        } else {
            newY = this.y
        }
        return [newX, newY]
    }
}