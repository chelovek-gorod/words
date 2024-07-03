import { Application, Container } from 'pixi.js'
import { playMusic, stopMusic } from './sound'

const appScreen = {
    width: 640,
    height: 1136,
}
appScreen.centerX = appScreen.width * 0.5
appScreen.centerY = appScreen.height * 0.5

export function getAppScreen() {
    return appScreen
}

const app = new Application({
    background: 0x2B344B,
    antialias: true, // сглаживание
    resolution: 2,
    //resizeTo: window
    width: appScreen.width,
    height: appScreen.height
})
document.body.append( app.view )



window.addEventListener('focus', onFocus)
window.addEventListener('blur', onBlur)
if ('hidden' in document) document.addEventListener('visibilitychange', visibilityOnChange)
function visibilityOnChange( isHide ) {
    if (isHide) onBlur()
    else onFocus()
}

function onFocus() {
    playMusic()
    checkTabs()
}

function onBlur() {
    stopMusic()
}

/*
const testData = localStorage.getItem('TEST')
if (testData) {
    let data = JSON.parse(testData)
    data.value++
    localStorage.setItem('TEST', JSON.stringify(data))
} else {
    localStorage.setItem('TEST', JSON.stringify({value: 1}) )
}

onbeforeunload = updateTestData
function updateTestData() {
    let tabs = +localStorage.getItem('tabs')
    localStorage.setItem('tabs', --tabs)
}
*/

function checkTabs() {
    let tabs = +localStorage.getItem('tabs')
    if (tabs > 1) alert('Игра уже запущена в другой вкладке')
}

export class Layer extends Container {
    constructor( ...elements ) {
        super()
        if ( elements.length ) this.addChild( ...elements )
        return this
    }

    showLayer() {
        app.stage.addChild( this )
    }

    hideLayer() {
        app.stage.removeChild( this )
    }

    clearLayer() {
        this.children.forEach(element => element.destroy())
    }

    removeLayer() {
        this.clearLayer()
        this.hideLayer()
        removeSprite( this )
    }
}

export function clearStage() {
    clearContainer( app.stage  )
}

export function clearContainer( container ) {
    while(container.children[0]) {
        removeSprite( container.children[0] )
    }
}

export function removeSprite( sprite ) {
    if (sprite.parent) sprite.parent.removeChild( sprite )
    sprite.destroy()
}

export function tickerAdd( element ) {
    if ('tick' in element) tickerArr.push( element )
    else console.warn( 'TRY TO ADD ELEMENT IN TICKER WITHOUT .tick() METHOD:', element)
}

export function tickerRemove( element ) {
    tickerArr = tickerArr.filter( e => e !== element )
}

export function tickerClear() {
    tickerArr = []
}

export function tickerRun() {
    isTickerRun = true
}
export function tickerStop() {
    isTickerRun = false
}

export let isTickerRun = true
let tickerArr = [] // entities for update (need e.tick(delta) method)
app.ticker.add( delta => {
    if (isTickerRun === false) return
    // if (delta = 1) -> FPS = 60 (16.66ms per frame)
    tickerArr.forEach( element => element.tick(delta) )
})