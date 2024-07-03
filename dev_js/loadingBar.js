import { Graphics, Text } from 'pixi.js'
import { textStyles } from './fonts'
import { screenData, Layer } from './application'

const settings = {
    lineY: 6,
    textY: -6,

    lineRate: 2,
    lineOffset: 4,
    lineHeight: 16,
    lineColor: 0xffffff,
    bgColor: 0x777777,
}
settings.lineMinWidth = settings.lineHeight
settings.lineBorderRadius = settings.lineHeight * 0.5
settings.bgHeight = settings.lineHeight + settings.lineOffset * 2
settings.bgWidth = settings.bgHeight + 100 * settings.lineRate
settings.bgBorderRadius = settings.bgHeight * 0.5

settings.bgX = -settings.bgWidth * 0.5
settings.bgY = settings.lineY - settings.lineOffset
settings.lineX = settings.bgX + settings.lineOffset

class LoadingBar extends Layer {
    constructor() {
        super()

        this.position.x = screenData.centerX
        this.position.y = screenData.centerY

        this.lineBg = new Graphics()
        this.lineBg.beginFill(settings.bgColor)
        this.lineBg.drawRoundedRect(settings.bgX, settings.bgY, settings.bgWidth, settings.bgHeight, settings.bgBorderRadius)
        this.lineBg.endFill()
        this.addChild(this.lineBg)

        this.line = new Graphics()
        this.addChild(this.line)

        this.text = new Text('0 %', textStyles.loading)
        this.text.anchor.set(0.5, 1)
        this.text.position.y = settings.textY
        this.addChild(this.text)

        this.layer = new Layer(this)
        this.layer.showLayer()
    }

    update(progress) {
        const range = Math.round(progress)

        let width = settings.lineMinWidth + range * settings.lineRate

        this.line.clear()
        this.line.beginFill(0xffffff)
        this.line.drawRoundedRect(settings.lineX, settings.lineY, width, settings.lineHeight, settings.lineBorderRadius)
        this.line.endFill()
        
        this.text.text = range + ' %'
    }
}

let loadingBar = null

export function getLoadingBar() {
    if (!loadingBar) loadingBar = new LoadingBar()

    return loadingBar
}

export function removeLoadingBar() {
    if (!loadingBar) return

    loadingBar.layer.removeLayer()
}