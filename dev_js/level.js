import { screenData, Layer, clearContainer } from "./application"
import { Container, Graphics, Text } from 'pixi.js'
import { textStyles } from './fonts'

const settings = {
    textLevelNumberY: 27,

    startWordsOffsetY: 118,
    wordsLettersOffset: 6,
    wordsLetterSize: 72,
    wordsLetterBorderRadius: 28,
    wordsLetterColor: 0xffffff,

    inputLetterOffsetY: 19, // from last word
    inputLetterOffset: 3,
    inputLetterBorderRadius: 16,
    inputLetterSize: 42,
    inputLetterColor: 0x4d4d4d,

    userLetterSquareOffsetY: 645, // from top
    userLetterSquareSize: 294,
    userLetterSquareDiscWidth: 32,
    userLetterSquareDiscColor: 0x3e4a68,
}

function getLetters(words) {
    let allLetters = {}
    words.forEach(word => {
        let wordLetters = {}
        for(let i = 0; i < word.length; i++) {
            let letter = word[i]
            if (letter in wordLetters) wordLetters[letter] ++
            else wordLetters[letter] = 1
        }
        for (let latter in wordLetters) {
            if (latter in allLetters) {
                if (allLetters[latter] < wordLetters[latter]) allLetters[latter] = wordLetters[latter]
            } else {
                allLetters[latter] = wordLetters[latter]
            }
        }
    })

    let letters = []
    for (let latter in allLetters) {
        while(allLetters[latter] > 0) {
            letters.push(latter)
            allLetters[latter]--
        }
    }
    letters.sort( () => Math.random() -0.5 )
    return letters
}

function addWords(words, container) {
    let wordsContainer = []
    let startY = settings.startWordsOffsetY
    words.forEach(word => {
        const line = new Container()
        const offset = settings.wordsLetterSize + settings.wordsLettersOffset
        let startX = 0
        for (let i = 0; i < word.length; i++) {
            const letter = new LetterBox(settings.wordsLetterSize, settings.wordsLetterBorderRadius, word[i], textStyles.wordLetter)
            letter.position.x = startX
            line.addChild(letter)

            startX += offset
            
            // test
            letter.setColor(0x00ff00)
        }
        container.addChild(line)
        wordsContainer.push(line)

        line.position.x = (screenData.width - line.width) * 0.5
        line.position.y = startY

        startY += offset
    })

    return wordsContainer
}

export class Level extends Layer {
    constructor(words, levelNumber) {
        super()

        this.textLevelNumber = new Text(`Уровень ${levelNumber}`, textStyles.levelNumber)
        this.textLevelNumber.anchor.set(0.5, 0)
        this.textLevelNumber.position.x = screenData.centerX
        this.textLevelNumber.position.y = settings.textLevelNumberY
        this.addChild(this.textLevelNumber)

        this.words = words
        this.words.sort((a, b) => a.length - b.length)
        this.letters = getLetters(words)

        console.log(this.words, this.letters)

        this.wordsLayer = addWords(words, this)
        
        const wordsLayerHeight = (settings.wordsLettersOffset + settings.wordsLetterSize) * this.wordsLayer.length 
        this.inputLayer = new Input(settings.startWordsOffsetY + wordsLayerHeight + settings.inputLetterOffsetY)
        this.addChild(this.inputLayer)

        this.showLayer()

        // test
        setTimeout( () => this.inputLayer.addLetter('А'), 1000)
        setTimeout( () => this.inputLayer.addLetter('Б'), 1500)
        setTimeout( () => this.inputLayer.addLetter('В'), 2000)
        setTimeout( () => this.inputLayer.addLetter('Г'), 2500)
        setTimeout( () => this.inputLayer.addLetter('Д'), 3000)
        setTimeout( () => this.inputLayer.clearLetters(), 3500)
        setTimeout( () => this.inputLayer.addLetter('Г'), 4500)
        setTimeout( () => this.inputLayer.addLetter('Д'), 5000)
    }
}

class LetterBox extends Container {
    constructor(size, borderRadius, letter, letterStyle) {
        super() 

        this.size = size
        this.borderRadius = borderRadius
        this.letter = letter
        this.letterStyle = letterStyle

        this.bg = new Graphics()
        this.setColor(0xffffff)
        this.addChild(this.bg)

        let center = size * 0.5
        this.letter = new Text(letter, letterStyle)
        this.letter.anchor.set(0.5)
        this.letter.position.x = center
        this.letter.position.y = center
        this.addChild(this.letter)
    }

    setColor(color) {
        this.bg.beginFill(color)
        this.bg.drawRoundedRect(0, 0, this.size, this.size, this.borderRadius)
        this.bg.endFill()
    }
}

class Input extends Container {
    constructor(y) {
        super()
        console.log('y:', y)

        this.position.y = y
        this.size = 0
        this.stepX = settings.inputLetterOffset + settings.inputLetterSize
    }

    addLetter(letter) {
        console.log(this)
        const letterBox = new LetterBox(settings.inputLetterSize, settings.inputLetterBorderRadius, letter, textStyles.inputLetter)
        letterBox.position.x = this.size
        this.addChild(letterBox)

        this.size += this.stepX
        this.position.x = (screenData.width - this.size) * 0.5
    }

    clearLetters() {
        this.size = 0
        clearContainer(this)
    }
}
