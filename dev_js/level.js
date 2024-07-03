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

    userLetterSquareOffsetY: 645 + 72, // from top
    userLetterSquareSize: 294,
    userLetterSquareDiscWidth: 32,
    userLetterSquareDiscColor: 0x3e4a68,

    userLetterCircleRadius: 45,
    userLetterCircShadowOffset: 6,
    userLetterCircleColor: 0xffffff,
    userLetterCircleColorShadow: 0xa6a8ab,
    userLetterCircleColorSelected: 0xe96fa4,
    userLetterCircleColorSelectedShadow: 0xaf638c,
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

        this.userLetter = new UserLetters(this.letters)
        this.addChild(this.userLetter)

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

        this.position.y = y
        this.size = 0
        this.stepX = settings.inputLetterOffset + settings.inputLetterSize
    }

    addLetter(letter) {
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

class UserLetters extends Container {
    constructor(letters) {
        super()

        const circleRadius = settings.userLetterSquareSize * 0.5
        this.position.set(screenData.centerX, settings.userLetterSquareOffsetY + circleRadius)

        this.circleLine = new Graphics()
        this.circleLine.lineStyle(settings.userLetterSquareDiscWidth, settings.userLetterSquareDiscColor)
        //this.circleLine.beginFill(0xffff00, 0.25)
        
        this.circleLine.drawCircle(0, 0, circleRadius)
        this.addChild(this.circleLine)

        this.letters = addButtons(letters, circleRadius)
        this.addChild(...this.letters)
        console.log(this.letters)
    }
}

function addButtons(letters, circleRadius) {
    let buttons = []
    let angle = -Math.PI * 0.5
    const angleStep = (2 * Math.PI) / letters.length
    letters.forEach(latter => {
        const button = new Button(latter)
        button.position.x = Math.cos(angle) * circleRadius
        button.position.y = Math.sin(angle) * circleRadius

        buttons.push(button)
        angle += angleStep
    })

    return buttons
}

class Button extends Container {
    constructor(latter) {
        super()

        this.text = latter

        this.shadow = new Graphics()
        this.addChild(this.shadow)

        this.circle = new Graphics()
        this.addChild(this.circle)

        this.letter = new Text(this.text, textStyles.userLetter)
        this.letter.anchor.set(0.5)
        this.addChild(this.letter)

        this.renderOff()
        //this.renderOn()
    }

    renderOn() {
        this.shadow.beginFill(settings.userLetterCircleColorSelectedShadow)
        this.shadow.drawCircle(0, settings.userLetterCircShadowOffset, settings.userLetterCircleRadius)
        
        this.circle.beginFill(settings.userLetterCircleColorSelected)
        this.circle.drawCircle(0, 0, settings.userLetterCircleRadius)

        this.letter.style.fill = '#ffffff'
    }

    renderOff() {
        this.shadow.beginFill(settings.userLetterCircleColorShadow)
        this.shadow.drawCircle(0, settings.userLetterCircShadowOffset, settings.userLetterCircleRadius)
        
        this.circle.beginFill(settings.userLetterCircleColor)
        this.circle.drawCircle(0, 0, settings.userLetterCircleRadius)

        this.letter.style.fill = '#4d4d4d'
    }
}