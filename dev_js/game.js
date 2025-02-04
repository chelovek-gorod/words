import { levels, sounds } from './loader'
import { clearStage } from './application'
import { Level } from './level'
import { LevelDone } from './levelDone'
import { playSound } from './sound'
import { EventHub, events } from './events'

let levelsNumber = 1
let currentLevel = 1

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
    playSound(sounds.bonus)

    clearStage()
    new LevelDone(currentLevel)

    guessedWords = []
    currentLevel++
    const gameData = {
        level: currentLevel,
        words: guessedWords
    }
    localStorage.setItem('gameData', JSON.stringify(gameData))
}

EventHub.on(events.nextLevel, nextLevel)

export function startGame() {
    levelsNumber = Object.keys(levels).length
    nextLevel()
}

function nextLevel() {
    clearStage()

    let levelIndex = currentLevel % levelsNumber
    if (levelIndex === 0) levelIndex = levelsNumber

    let words = levels[levelIndex].words.map(word => word.toUpperCase())
    new Level(words, guessedWords, currentLevel)
    playSound(sounds.out)
}