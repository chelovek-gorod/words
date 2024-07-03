import { Assets } from 'pixi.js'
import { getLoadingBar, removeLoadingBar } from './loadingBar'

const paths = {
    sprites : './src/images/',
    sounds : './src/sounds/',
    music : './src/music/',
    fonts : './src/fonts/',
    levels: './src/levels/',
}

export const sprites = {
    //bg: 'game_title.png',
    //sprites: 'sprites.json',
}
const spritesNumber = Object.keys(sprites).length
for (let sprite in sprites) sprites[sprite] = paths.sprites + sprites[sprite]

export const sounds = {
    await: 'se_await.mp3',
    bell: 'se_bell.mp3',
    bonus: 'se_bonus.mp3',
    done: 'se_done.mp3',
    hit: 'se_hit.mp3',
    out: 'se_out.mp3',
    sticks: 'se_sticks.mp3',
}
const soundsNumber = Object.keys(sounds).length
for (let se in sounds) sounds[se] = paths.sounds + sounds[se]

export const music = {
    bgm_0: 'bgm_0.mp3',
    bgm_1: 'bgm_1.mp3',
    bgm_2: 'bgm_2.mp3',
}
for (let bgm in music) music[bgm] = paths.music + music[bgm]

export const fonts = {
    vag: 'vag-world-bold.woff2',
}
for (let font in fonts) fonts[font] = paths.fonts + fonts[font]

export const levels = {1:'1.json', 2:'2.json', 3:'3.json'}
const levelsNumber = Object.keys(levels).length
for (let lvl in levels) levels[lvl] = paths.levels + levels[lvl]

///////////////////////////////////////////////////////////////////

export function uploadAssets( loadingDoneCallback ) {
    const assetsNumber = spritesNumber + soundsNumber + levelsNumber
    let loadedAssets = 0
    let progressPerAsset = 100 / assetsNumber

    const loadingBar = getLoadingBar()

    const loading = () => {
        loadedAssets++
        loadingBar.update(progressPerAsset * loadedAssets)
        if (loadedAssets === assetsNumber) {
            removeLoadingBar()
            loadingDoneCallback()
        }
    }

    for (let sprite in sprites) {
        Assets.add( {alias: sprite, src: sprites[sprite]} )
        Assets.load( sprite ).then(data => {
            sprites[sprite] = data
            loading()
        })
    }

    for (let se in sounds) {
        Assets.add( {alias: se, src: sounds[se]} )
        Assets.load( se ).then(data => {
            sounds[se] = data
            loading()
        })
    }

    for (let lvl in levels) {
        Assets.add( {alias: lvl, src: levels[lvl]} )
        Assets.load( lvl ).then(data => {
            levels[lvl] = data
            loading()
        })
    }
}