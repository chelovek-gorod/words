import { Assets } from 'pixi.js'
import { fonts, uploadAssets } from './loader'
import { initFontStyles } from './fonts'
import { startGame } from './game'
import { playMusic, stopMusic } from './sound'
import getManyTabsShield from './manyTabs'

// update tab counter
let tabs = +localStorage.getItem('tabs')
if (tabs > 0) localStorage.setItem('tabs', tabs + 1)
else localStorage.setItem('tabs', 1 )
console.log('tabs', tabs, +localStorage.getItem('tabs'))

onbeforeunload = function() {
    tabs = +localStorage.getItem('tabs')
    localStorage.setItem('tabs', --tabs)
}

// preload fonts
Assets.addBundle('fonts', fonts)
Assets.loadBundle('fonts').then( fontsData => {
    // update font values by font family
    for(let key in fontsData) fonts[key] = fontsData[key].family
    initFontStyles()
    uploadAssets( init )
})

// update canvas sizes
onresize = checkScreenSizes
function checkScreenSizes() {
    const canvas = document.querySelector('canvas')
    if (innerHeight * 0.5633 > innerWidth) {
        canvas.style.width = '100vw'
        canvas.style.height = '177.5vw'
    } else {
        canvas.style.width = '56.33vh'
        canvas.style.height = '100vh'
    }
}
checkScreenSizes()

function init() {
    // focus / blur
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    if ('hidden' in document) document.addEventListener('visibilitychange', visibilityOnChange)
    function visibilityOnChange( isHide ) {
        if (isHide) onBlur()
        else onFocus()
    }

    function onFocus() {
        console.log('on focus')
        playMusic()
        
        tabs = +localStorage.getItem('tabs')
        if (tabs > 1) {
            let manyTabsShield = getManyTabsShield()
            manyTabsShield.showLayer()
        }
    }

    function onBlur() {
        stopMusic()
    }

    startGame()
}