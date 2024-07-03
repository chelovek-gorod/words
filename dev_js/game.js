import { levels } from './loader'
import { clearStage } from './application'
import { Level } from './level'
import { LevelDone } from './levelDone'
import { playMusic } from './sound'
import { EventHub, events } from './events'

let levelsNumber = 0
let currentLevel = 0
let storageGameData = localStorage.getItem('gameData')
if (storageGameData) {
    const gameData = JSON.parse(storageGameData)
    if ('level' in gameData && gameData.level > currentLevel) {
        currentLevel = gameData.level
    }
}

EventHub.on(events.levelDone, levelDone)
function levelDone() {
    clearStage()
    new LevelDone(currentLevel)
}

EventHub.on(events.nextLevel, nextLevel)

export function startGame() {
    playMusic()

    levelsNumber = Object.keys(levels).length
    nextLevel()
    //levelDone()
}

function nextLevel() {
    clearStage()

    currentLevel++
    let levelIndex = currentLevel % levelsNumber
    if (levelIndex === 0) levelIndex = levelsNumber
    console.log('currentLevel', currentLevel, 'levelIndex', levelIndex)

    let words = levels[levelIndex].words.map(word => word.toUpperCase())
    new Level(words, currentLevel)
}

/*
import { getAppScreen, Layer } from './application'
import GameMenu from './gameMenu'
import Background from './background'
import GameIU from './gameUI'
import GameMap from './gameMap'
import MiniMap from './miniMap'
import { smoothShowElement } from './functions'
import { setMusicList } from './sound'
import { EventHub, events } from './events'
import FullScreenMessage from './fullscreen'
import Opponent from './training'
import ResultMenu from './resultMenu'
import { restartState } from './state'
import ConnectMenu from './connectMenu'

// use for test (add units by pressing keys)
import { BombCarrier, Spider, Plane, Airship } from './army'

let screenData, gameMenu, mainLayer, gameBackground, gameMap, gameUI, miniMap, resultMenu, connectMenu

export let isTraining = false
export let isResult = false

let bgSpriteName = 'background_tile_1' // 1, 2 or 3

const mapScheme = [
    '--A---GG---A--',
    '--------------',
    'A------------A',
    '----xx--xx----',
    '----xx--xx----',
    'G------------G',
    '------BB------',
    '----xxBbxx----', // b - for add trees in map generating
]


export function startGame() {
    restartState()
    screenData = getAppScreen()
    resultMenu = new ResultMenu( screenData )
    connectMenu = new ConnectMenu( screenData )
    gameMenu = new GameMenu( screenData )

    gameMenu = new GameMenu( screenData )
    gameBackground = new Background( screenData, bgSpriteName )
    gameMap = new GameMap( screenData, mapScheme, bgSpriteName )
    miniMap = new MiniMap( mapScheme, bgSpriteName )
    gameUI = new GameIU( screenData, miniMap )
    
    mainLayer = new Layer()
    mainLayer.addChild( gameMenu )

    new FullScreenMessage(screenData, mainLayer)
    
    smoothShowElement( mainLayer, 'center', () => {
        // callback
    })
    
    setTimeout( () => setMusicList("menu"), 0 )

    EventHub.on( events.startTraining, startTraining )
    EventHub.on( events.startOnline, startOnline )
    EventHub.on( events.showResults, showResults )
    EventHub.on( events.restartMenu, restartGame )
    EventHub.on( events.showConnectMenu, showConnectMenu )
    EventHub.on( events.showMainMenu, showMainMenu )
}

function startTraining() {
    isResult = false
    isTraining = true

    mainLayer.removeChild( gameMenu )

    mainLayer.addChild( gameBackground )
    mainLayer.addChild( gameMap )
    mainLayer.addChild( gameUI )

    let opponent = new Opponent()
    gameUI.start(opponent)
    setTimeout( () => setMusicList("game"), 0 )
}

function showConnectMenu() {
    mainLayer.removeChild( gameMenu )
    connectMenu.restart()
    mainLayer.addChild( connectMenu )
}

function showMainMenu() {
    mainLayer.removeChild( connectMenu )
    gameMenu.restart()
    mainLayer.addChild( gameMenu )
}

function startOnline() {
    console.log('START ONLINE')
    isResult = false
    isTraining = false

    mainLayer.removeChild( connectMenu )

    mainLayer.addChild( gameBackground )
    mainLayer.addChild( gameMap )
    mainLayer.addChild( gameUI )

    gameUI.start( null )
    setTimeout( () => setMusicList("game"), 0 )
}

function showResults(data) {
    isTraining = false
    isResult = true

    mainLayer.removeChild( gameBackground )
    mainLayer.removeChild( gameMap )
    mainLayer.removeChild( gameUI )
    
    resultMenu.update( data )
    resultMenu.restart()
    mainLayer.addChild( resultMenu )

    setTimeout( () => setMusicList(data.isWin ? "win" : "lose"), 0 )
}

function changeBackground() {
    let bgIndex = +bgSpriteName[bgSpriteName.length - 1] + 1
    if (bgIndex > 3) bgIndex = 1
    bgSpriteName = 'background_tile_' + bgIndex
    gameBackground.setImage(bgSpriteName)
    miniMap.setBackgroundImage(bgSpriteName)
    miniMap.updateTrees(bgSpriteName)
    gameMap.updateTrees(bgSpriteName)
}

function restartGame() {
    restartState()
    changeBackground()
    mainLayer.removeChild(resultMenu)
    gameMenu.restart()
    mainLayer.addChild( gameMenu )
    setTimeout( () => setMusicList("game"), 0 )
}
*/


addEventListener('keyup', (event) => {
    console.log(event.code)

    switch( event.code ) {
        case 'KeyQ' : alert('KeyQ'); break;
    }
})
