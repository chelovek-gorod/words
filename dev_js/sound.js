import { sound } from '@pixi/sound'
import { music } from './loader'

let isSoundOn = true
let isMusicOn = true

// use this functions in game menu options
export function setSoundsOnOff( isTurnOn = false ) {
    isSoundOn = isTurnOn
}

export function setMusicOnOff( isTurnOn = false ) {
    isMusicOn = isTurnOn
    if (isTurnOn) playMusic()
    else stopMusic()
}
// -----------------------------------------

export function playSound( se ) {
    if (!isSoundOn) return

    se.stop()
    se.play()
}

let bgMusicIndex = 0
let bgMusic = null
let musicList = null

export function stopMusic() {
    if (!bgMusic) return
    bgMusic.pause()
}

export function playMusic() {
    if (!isMusicOn) return

    if (bgMusic) return bgMusic.isPlaying ? null : bgMusic.resume()

    if (!musicList) {
        musicList = Object.values(music)
    }

    bgMusicPlay()
}

function bgMusicPlay() {
    bgMusic = sound.add('bgm', musicList[bgMusicIndex] )
    bgMusic.play({ volume: 0.5 }).then(instance => instance.on('end', nextBgMusic))
}

function nextBgMusic() {
    bgMusicIndex++
    if (bgMusicIndex === musicList.length) bgMusicIndex = 0
    sound.remove('bgm')
    bgMusicPlay()
}