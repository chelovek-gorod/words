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
    bgBorderRadius: 56,
    bgColor: 0xffffff,

    triangleLeft: [{x: 128, y: 363}, {x: 144, y: 363}, {x: 144, y: 344}],
    triangleRight: [{x: 496, y: 363}, {x: 512, y: 363}, {x: 496, y: 344}],
    triangleColor: 0x9a4626,

    // 352 x 107  (x+16 y+16)
    //              - -> ~        ~ -> ~           .          ~ -> ~        ~ -> ~           .          ~ -> ~        ~ -> ~           .          ~ -> ~        ~ -> -
    labelPath: [{x:144,y:344},{x:144,y:408},{x:144,y:416},{x:160,y:424},{x:304,y:459},{x:320,y:467},{x:336,y:459},{x:480,y:424},{x:496,y:416},{x:496,y:408},{x:496,y:344}],
    labelColor: 0xec6b3a,
    labelShadowOffsetY: 9,
    labelShadowColor: 0xca5428,
    labelTextOffsetY: 348,

    textOffsetY: 480,

    buttonOffsetX: 167,
    buttonOffsetY: 676,
    buttonShadowOffsetY: 6,
    buttonWidth: 306,
    buttonHeight: 88,
    buttonColor: 0x65bd65,
    buttonShadowColor: 0x508853,
}

function drawTriangle(graphics, points, color = settings.triangleColor) {
    graphics.beginFill(color)
    points.forEach((point, index) => {
        if (index === 0) graphics.moveTo(point.x, point.y)
        else graphics.lineTo(point.x, point.y)
    })
    graphics.closePath()
    graphics.endFill()
}

function drawLabel(graphics, points, offsetY = 0, color = settings.labelColor) {
    // lineIndexes = (0), (graphics.length - 1)
    graphics.beginFill(color)
    points.forEach((point, index) => {
        switch(index) {
            case 0 : graphics.moveTo(point.x, point.y+offsetY); break;
            case 2 :
            case 5 :
            case 8 :
                const pointStart = points[index - 1]
                const pointEnd = points[index + 1]
                graphics.bezierCurveTo(pointStart.x, pointStart.y+offsetY, point.x, point.y+offsetY, pointEnd.x, pointEnd.y+offsetY); break;
            default: graphics.lineTo(point.x, point.y+offsetY); break;
        }
    })
    graphics.closePath()
    graphics.endFill()
}

class ManyTabsShield extends Layer {
    constructor() {
        super()

        this.shadow = new Graphics()
        this.shadow.beginFill(settings.shellColor, settings.shellAlpha)
        this.shadow.drawRect(0, 0, screenData.width, screenData.height)
        this.addChild(this.shadow)

        this.bg = new Graphics()
        this.bg.beginFill(settings.bgColor)
        this.bg.drawRoundedRect(settings.bgOffsetX, settings.bgOffsetY, settings.bgWidth, settings.bgHeight, settings.bgBorderRadius)
        this.addChild(this.bg)

        this.triangleLeft = new Graphics()
        drawTriangle(this.triangleLeft, settings.triangleLeft)
        this.addChild(this.triangleLeft)

        this.triangleRight = new Graphics()
        drawTriangle(this.triangleRight, settings.triangleRight)
        this.addChild(this.triangleRight)

        this.labelShadow = new Graphics()
        drawLabel(this.labelShadow, settings.labelPath, settings.labelShadowOffsetY, settings.labelShadowColor)
        this.addChild(this.labelShadow)

        this.Label = new Graphics()
        drawLabel(this.Label, settings.labelPath)
        this.addChild(this.Label)

        const labelText = 'Две вкладки с игрой?'
        this.labelText = new Text(labelText, textStyles.label)
        this.labelText.anchor.set(0.5, 0)
        this.labelText.position.x = screenData.centerX
        this.labelText.position.y = settings.labelTextOffsetY
        this.addChild(this.labelText)

        const shieldText = 'Похоже, игра открыта в нескольких вкладках браузера. Чтобы продолжить играть в этой вкладке, обновите страницу.'
        this.shieldText = new Text(shieldText, textStyles.shield)
        this.shieldText.anchor.set(0.5, 0)
        this.shieldText.position.x = screenData.centerX
        this.shieldText.position.y = settings.textOffsetY
        this.addChild(this.shieldText)

        this.button = new Button()
        this.button.position.x = settings.buttonOffsetX
        this.button.position.y = settings.buttonOffsetY
        this.addChild(this.button)
    }
}

class Button extends Container {
    constructor() {
        super()

        this.shadow = new Graphics()
        this.shadow.beginFill(settings.buttonShadowColor)
        this.shadow.drawRoundedRect(0, settings.buttonShadowOffsetY, settings.buttonWidth, settings.buttonHeight, settings.buttonHeight * 0.5)
        this.addChild(this.shadow)

        this.button = new Graphics()
        this.button.beginFill(settings.buttonColor)
        this.button.drawRoundedRect(0, 0, settings.buttonWidth, settings.buttonHeight, settings.buttonHeight * 0.5)
        this.addChild(this.button)

        this.text = new Text('Обновить', textStyles.levelDoneButton)
        this.text.anchor.set(0.5)
        this.text.position.set(settings.buttonWidth * 0.5, settings.buttonHeight * 0.5)
        this.addChild(this.text)

        this.eventMode = 'static'
        this.on('pointerdown', () => location.reload() )
    }
}

let manyTabsShield = null

export default function getManyTabsShield() {
    if(!manyTabsShield) manyTabsShield = new ManyTabsShield()
    return manyTabsShield 
}