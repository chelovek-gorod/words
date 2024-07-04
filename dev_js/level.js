import { screenData, Layer, clearContainer, removeSprite } from "./application"
import { Container, Graphics, Text, LINE_CAP, LINE_JOIN } from 'pixi.js'
import { textStyles } from './fonts'
import { levelDone } from './events'

const settings = {
    textLevelNumberY: 27,

    startWordsOffsetY: 118,
    wordsLettersOffset: 6,
    wordsLetterSize: 72,
    wordsLetterBorderRadius: 28,
    wordsLetterColor: 0xffffff,
    wordsLetterScale: 1,
    wordsMaximum: 6,

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

    curveColor: 0x638ec3,
    curveWidth: 24,
}

let level = null

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
            // letter.setColor(0x00ff00)
        }
        container.addChild(line)
        wordsContainer.push(line)

        line.position.x = (screenData.width - line.width * settings.wordsLetterScale) * 0.5 
        line.position.y = startY
        line.scale.set(settings.wordsLetterScale)

        startY += offset * settings.wordsLetterScale
    })

    return wordsContainer
}

export class Level extends Layer {
    constructor(words, guessedWords, levelNumber) {
        super()

        settings.wordsLetterScale = (words.length > settings.wordsMaximum) ? settings.wordsMaximum / words.length : 1

        this.textLevelNumber = new Text(`Уровень ${levelNumber}`, textStyles.levelNumber)
        this.textLevelNumber.anchor.set(0.5, 0)
        this.textLevelNumber.position.x = screenData.centerX
        this.textLevelNumber.position.y = settings.textLevelNumberY
        this.addChild(this.textLevelNumber)

        this.levelNumber = levelNumber
        this.words = words
        this.guessedWords = guessedWords
        this.words.sort((a, b) => a.length - b.length)
        this.letters = getLetters(words)

        console.log(this.words, this.letters)

        this.wordsLayer = addWords(words, this)
        
        const wordsLayerHeight = (settings.wordsLettersOffset + settings.wordsLetterSize) * settings.wordsMaximum 
        this.inputLayer = new Input(settings.startWordsOffsetY + wordsLayerHeight + settings.inputLetterOffsetY)
        this.addChild(this.inputLayer)

        this.userButtons = new UserLetters(this.letters)
        this.addChild(this.userButtons)

        this.userCurve = new Graphics()
        this.addChild(this.userCurve)

        level = this
        this.showLayer()

        this.isOnInput = false
        this.userWord = ''
        this.userButtonsInputIndexesArr = []
        this.userWordsCounter = 0
        this.lastButtonIndexes = []

        this.eventMode = 'static'
        this.on('globalpointermove', (event) => { if(this.isOnInput) this.updateCurve(event) } )

        this.guessedWords.forEach(word => this.checkWord(word))
    }

    startInput(index) {
        //this.endInput()
        this.isOnInput = true
        this.addInput(index)
    }

    addInput(index) {
        if (!this.isOnInput) return

        //cancel last letter
        if (index === this.userButtonsInputIndexesArr[this.userButtonsInputIndexesArr.length - 2]) {
            this.userButtonsInputIndexesArr.pop(index)
            this.inputLayer.cancelLetter()
            this.userWord = this.userWord.slice(0, -1)

            let lastButtonIndex = this.lastButtonIndexes.pop()
            this.userButtons.letters[lastButtonIndex].renderOff()
            return
        }
        
        // letter index is not in input
        if (this.userButtonsInputIndexesArr.indexOf(index) === -1) {
            this.userButtonsInputIndexesArr.push(index)
            this.inputLayer.addLetter(this.letters[index])
            this.userWord += this.letters[index]

            this.userButtons.letters[index].renderOn()
            this.lastButtonIndexes.push(index)
            return
        }
    }

    endInput() {
        this.checkWord(this.userWord)

        this.isOnInput = false
        this.userWord = ''
        this.userButtonsInputIndexesArr = []
        this.inputLayer.clearLetters()

        this.lastButtonIndexes.length = 0
        this.userButtons.letters.forEach(letter => letter.renderOff())
        this.userCurve.clear()

        if (this.userWordsCounter === this.words.length) levelDone()
    }

    checkWord(word) {
        const wordIndex = this.words.indexOf(word)

        if(wordIndex === -1 || word === '') return

        this.wordsLayer[wordIndex].children.forEach( letterBox => letterBox.setColor(0x65bd65) )
        this.words[wordIndex] = ''
        this.userWordsCounter++

        if (this.guessedWords.indexOf(word) === -1) {
            this.guessedWords.push(word)

            const gameData = {
                level: this.levelNumber,
                words: this.guessedWords
            }
            localStorage.setItem('gameData', JSON.stringify(gameData))
        }
    }

    updateCurve(event) {
        //console.log(event.global.x, event.global.y)

        this.userCurve.clear()
        this.userCurve.lineStyle({width: settings.curveWidth, color: settings.curveColor, cap: LINE_CAP.ROUND, join: LINE_JOIN.ROUND})
        for(let i = 0; i < this.userButtonsInputIndexesArr.length; i++) {
            const index = this.userButtonsInputIndexesArr[i]
            const pointX = this.userButtons.letters[index].global.x
            const pointY = this.userButtons.letters[index].global.y
            if (i === 0) this.userCurve.moveTo(pointX, pointY)
            else this.userCurve.lineTo(pointX, pointY)
        }
        this.userCurve.lineTo(event.global.x, event.global.y)
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

    cancelLetter() {
        const lastLetter = this.children[this.children.length - 1]
        removeSprite(lastLetter)

        this.size -= this.stepX
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
        
        this.circleLine.drawCircle(0, 0, circleRadius)
        this.addChild(this.circleLine)

        this.letters = addButtons(letters, circleRadius)
        this.addChild(...this.letters)
    }
}

function addButtons(letters, circleRadius) {
    let buttons = []
    let angle = -Math.PI * 0.5
    const angleStep = (2 * Math.PI) / letters.length
    const buttonsGlobalOffsetY = settings.userLetterSquareOffsetY + settings.userLetterSquareSize * 0.5
    letters.forEach((latter, index) => {
        const button = new Button(latter, index)
        button.position.x = Math.cos(angle) * circleRadius
        button.position.y = Math.sin(angle) * circleRadius
        button.global = {x: button.position.x + screenData.centerX, y: button.position.y + buttonsGlobalOffsetY}

        buttons.push(button)
        angle += angleStep
    })

    return buttons
}

class Button extends Container {
    constructor(latter, index) {
        super()

        this.text = latter
        this.index = index

        this.shadow = new Graphics()
        this.addChild(this.shadow)

        this.circle = new Graphics()
        this.addChild(this.circle)

        this.letter = new Text(this.text, textStyles.userLetter)
        this.letter.anchor.set(0.5)
        this.addChild(this.letter)

        this.renderOff()

        this.eventMode = 'static'
        this.on('pointerdown', () => level.startInput(this.index) )
        this.on('pointerenter', () => level.addInput(this.index) )
        this.on('pointerup', () => level.endInput() )
        this.on('pointerupoutside', () => level.endInput() )
    }

    renderOn() {
        this.shadow.beginFill(settings.userLetterCircleColorSelectedShadow)
        this.shadow.drawCircle(0, settings.userLetterCircShadowOffset, settings.userLetterCircleRadius)
        
        this.circle.beginFill(settings.userLetterCircleColorSelected)
        this.circle.drawCircle(0, 0, settings.userLetterCircleRadius)

        this.letter.style = textStyles.userLetterOn
    }

    renderOff() {
        this.shadow.beginFill(settings.userLetterCircleColorShadow)
        this.shadow.drawCircle(0, settings.userLetterCircShadowOffset, settings.userLetterCircleRadius)
        
        this.circle.beginFill(settings.userLetterCircleColor)
        this.circle.drawCircle(0, 0, settings.userLetterCircleRadius)

        this.letter.style = textStyles.userLetter
    }
}