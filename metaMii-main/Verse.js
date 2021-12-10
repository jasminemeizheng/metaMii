class Verse {
    constructor(verseWidth, verseHeight) {
        this.blockSize = verseWidth*0.085 //verse grid's block size
        this.cols = floor(verseWidth/this.blockSize)
        this.rows = floor(verseHeight/this.blockSize)
        this.verse = new Array(floor(verseWidth/this.blockSize)) 
        let cnt = 0
        for (let i = 0; i < this.verse.length; i++) {
            this.verse[i] = new Array(floor(verseHeight/this.blockSize))
            for (let j = 0; j < this.verse[i].length; j++) {
                this.verse[i][j] = new VerseTile(cnt, j, i, j*this.blockSize, i*this.blockSize, this.blockSize, this.cols, this.rows)
                cnt++;
            }
        }
        this.activeTiles = []
        this.encounterDuration = 1000000
        this.encounterDict = {}
        this.encounterUL = document.getElementById('encounters')
        this.mediaMap = {}
    }

    drawAllTiles() {
        for (let row = 0; row < this.verse.length; row++) {
            for (let col = 0; col < this.verse[0].length; col++) {
                this.verse[row][col].display()
            }
        }
    }

    addCharacter(newCharacter) {
        var randCol = Math.floor(Math.random() * this.cols);
        var randRow = Math.floor(Math.random() * this.rows);
        while(this.verse[randRow][randCol].character != null) {
            randCol = Math.floor(Math.random() * this.cols);
            randRow = Math.floor(Math.random() * this.rows);
        }
        this.verse[randRow][randCol].character = newCharacter
        this.activeTiles.push(this.verse[randRow][randCol]);
        this.verse[randRow][randCol].display();
        this.mediaMap[newCharacter.name] = newCharacter.socials.instagram;
    }

    updateEncounterLi() {
        while(this.encounterUL.firstChild){
            this.encounterUL.removeChild(this.encounterUL.firstChild );
        }
        let _encd = this.encounterDict
        let keysSorted = Object.keys(_encd).sort(function(a,b){return _encd[b]-_encd[a]})
        for (let i = 0; i < keysSorted.length; i++) {
            var li = createElement('li')
            var ahref = createA('https://www.instagram.com/'+this.mediaMap[keysSorted[i]], (keysSorted[i] + ": " + _encd[keysSorted[i]] + " interactions"))
            ahref.parent(li)
            li.parent(this.encounterUL)
        }
    }

    update() {
        let tempTiles = [];
        for (let i = this.activeTiles.length-1; i >= 0; i--) {
            if (this.activeTiles[i].update()) {
                let tileToMove = this.activeTiles[i];
                let char = tileToMove.character
                let newTileP = tileToMove.getRandomAdjacent();
                let newTile = this.verse[newTileP[1]][newTileP[0]]
                if (newTile != tileToMove && this.activeTiles.indexOf(newTile) != -1) { //We have a conversation encounter!!!!
                    if (newTile.character.encounterCounter == 0) {
                        console.log("We have an encounter!")
                        tileToMove.character.encounterCounter = this.encounterDuration;
                        tileToMove.character.otherScore = newTile.character.metaScore;
                        newTile.character.encounterCounter = this.encounterDuration;
                        newTile.character.otherScore = tileToMove.character.metaScore;
                        tileToMove.display()
                        newTile.display()
                        if (newTile.character.name in this.encounterDict) {
                            this.encounterDict[newTile.character.name] += 1
                        } else {
                            this.encounterDict[newTile.character.name] = 1
                        }
                        if (tileToMove.character.name in this.encounterDict) {
                            this.encounterDict[tileToMove.character.name] += 1
                        } else {
                            this.encounterDict[tileToMove.character.name] = 1
                        }
                        this.updateEncounterLi();
                    }
                } else { //Just move character
                    this.activeTiles[i].character = null
                    this.activeTiles[i].display()
                    newTile.character = char
                    this.activeTiles.splice(i, 1)
                    this.activeTiles.push(newTile)
                    newTile.display()
                }
            }
        }
        this.activeTiles = this.activeTiles.concat(tempTiles);
    }
}