import { Assets } from 'pixi.js'
import { fonts, uploadAssets } from './loader'
import { initFontStyles } from './fonts'
import { startGame } from './game'

// update tab counter
const tabs = localStorage.getItem('tabs')
if (tabs) localStorage.setItem('tabs', +tabs + 1)
else localStorage.setItem('tabs', 1 )

onbeforeunload = updateTestData
function updateTestData() {
    let tabs = +localStorage.getItem('tabs')
    localStorage.setItem('tabs', --tabs)
}

// preload fonts
Assets.addBundle('fonts', fonts)
Assets.loadBundle('fonts').then( fontsData => {
    // update font values by font family
    for(let key in fontsData) fonts[key] = fontsData[key].family
    initFontStyles()
    uploadAssets( startGame )
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