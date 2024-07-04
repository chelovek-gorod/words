import { TextStyle } from "pixi.js"
import { fonts } from "./loader"

// https://pixijs.io/pixi-text-style/

export let textStyles = null

export function initFontStyles() {
    // add font family, after update font values in loader
    textStyles = {
        loading: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 60,
            fill: ['#ffffff', '#777777', '#ffffff'],
        }),

        levelNumber: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 30,
            fill: '#ffffff',
        }),

        wordLetter: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 42,
            fill: '#ffffff',
        }),

        inputLetter: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 30,
            fill: '#4d4d4d',
        }),

        userLetter: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 57,
            fill: '#4d4d4d',
        }),

        userLetterOn: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 57,
            fill: '#ffffff',
        }),

        levelDoneNumber: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 37,
            fill: '#ffffff',
        }),

        congratulation: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 53,
            fill: '#ffffff',
        }),

        levelDoneButton: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 40,
            fill: '#ffffff',
        }),

        label: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 40,
            fill: '#ffffff',
            align: 'center',
            lineHeight: 40,
            wordWrap: true,
            wordWrapWidth: 306,
        }),

        shield: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 32,
            fill: '#4d4d4d',
            align: 'center',
            lineHeight: 32,
            wordWrap: true,
            wordWrapWidth: 480,
        }),

        /* EXAMPLE
        gradientTextWithShadow: new TextStyle({
            fontFamily: fontKeys.RobotoBlack,
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fill: ['#ff0000', '#ffff00'],
            
            stroke: '#ffffff',
            strokeThickness: 2,

            dropShadow: true,
            dropShadowColor: '#ff00ff',
            dropShadowBlur: 3,
            dropShadowDistance: 4,
            
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        }),
        */
    }
}