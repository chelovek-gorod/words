import { screenData, Layer } from "./application"
import { Container, Graphics, Text } from 'pixi.js'
import { textStyles } from './fonts'
import { nextLevel } from './events'

const settings = {
    shellColor: 0x000000,
    shellAlpha: 0.5,

    bgOffsetX: 55,
    bgOffsetY: 363,
    bgWidth: 530,
    bgHeight: 428,
    bgColor: 0xffffff,

    triangleLeft: [{x: 128, y: 363}, {x: 144, y: 363}, {x: 144, y: 344}],
    triangleRight: [{x: 496, y: 363}, {x: 512, y: 363}, {x: 496, y: 344}],
    triangleColor: 0x9a4626,

    // 352 x 107
    labelPath: [{x: 144, y: 344}, {x: 144, y: 408}, {x: 160, y: 424}, {x: 160, y: 424}],
    labelColor: 0xec6b3a,

    labelShadowOffsetY: 9,
    labelShadowColor: 0xca5428,
}

export class ManyTabs extends Layer {
    constructor() {
        super()

        this.textLevelDoneNumber = new Text(`Уровень ${levelNumber} пройден`, textStyles.levelDoneNumber)
        this.textLevelDoneNumber.anchor.set(0.5, 0)
        this.textLevelDoneNumber.position.x = screenData.centerX
        this.textLevelDoneNumber.position.y = settings.textLevelDoneNumberY
        this.addChild(this.textLevelDoneNumber)

        this.textCongratulation = new Text('Изумительно!', textStyles.congratulation)
        this.textCongratulation.anchor.set(0.5, 0)
        this.textCongratulation.position.x = screenData.centerX
        this.textCongratulation.position.y = settings.textCongratulationY
        this.addChild(this.textCongratulation)

        this.button = new Button(levelNumber + 1)
        this.button.position.x = settings.buttonOffsetX
        this.button.position.y = settings.buttonOffsetY
        this.addChild(this.button)

        this.showLayer()
    }
}


class Button extends Container {
    constructor(levelNumber) {
        super()

        this.shadow = new Graphics()
        this.shadow.beginFill(settings.buttonShadowColor)
        this.shadow.drawRoundedRect(0, settings.buttonShadowOffsetY, settings.buttonWidth, settings.buttonHeight, settings.buttonHeight * 0.5)
        this.addChild(this.shadow)

        this.button = new Graphics()
        this.button.beginFill(settings.buttonColor)
        this.button.drawRoundedRect(0, 0, settings.buttonWidth, settings.buttonHeight, settings.buttonHeight * 0.5)
        this.addChild(this.button)

        this.text = new Text(`Уровень ${levelNumber}`, textStyles.levelDoneButton)
        this.text.anchor.set(0.5)
        this.text.position.set(settings.buttonWidth * 0.5, settings.buttonHeight * 0.5)
        this.addChild(this.text)

        this.eventMode = 'static'
        this.on('pointerdown', nextLevel )
    }
}