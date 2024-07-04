import { levels } from './loader'
import { clearStage } from './application'
import { Level } from './level'
import { LevelDone } from './levelDone'
import { playMusic } from './sound'
import { EventHub, events } from './events'

let levelsNumber = 0
let currentLevel = 0

let guessedWords = []
let storageGameData = localStorage.getItem('gameData')
if (storageGameData) {
    const gameData = JSON.parse(storageGameData)
    if ('level' in gameData && gameData.level > currentLevel) {
        currentLevel = gameData.level
    }
    if ('words' in gameData && gameData.words.length > 0) {
        guessedWords = gameData.words
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