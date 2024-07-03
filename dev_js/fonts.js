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

        buttons_menu_hover: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 36,
            fill: ['#ff0000', '#ffffff', '#0000ff'],
            stroke: '#000000',
            strokeThickness: 4
        }),

        sidebarMessage: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 18,
            fill: 0xffffff,
        }),

        attackSlotCounter: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 24,
            fill: 0xffffff,
            stroke: '#000000',
            strokeThickness: 4
        }),

        UIStateEnergy: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 18,
            fill: 0xffff00,
        }),

        UIStateInfo: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 18,
            fill: 0x00ff00,
        }),

        UIStateCounter: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 36,
            fill: 0xffffff,
        }),

        UIButtonSign: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 36,
            fill: 0x000000,
        }),
        UIButtonSignRed: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 36,
            fill: 0xff0000,
        }),

        UIButtonPrice: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 12,
            fill: 0x000000,
        }),

        UISideInfo: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 18,
            fill: 0x000000,
        }),

        fullScreen: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 24,
            align: 'center',
            fill: ['#00ffff', '#ffffff'],
            stroke: '#000000',
            strokeThickness: 4
        }),

        message: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 42,
            align: 'center',
            fill: ['#ffffff', '#00ffff', '#ffffff'],
            stroke: '#000000',
            strokeThickness: 4
        }),

        result_title_win: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 120,
            fill: ['#ffffff', '#00ff00', '#ffffff'],
            stroke: '#0000ff',
            strokeThickness: 8
        }),
        result_title_lose: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 120,
            fill: ['#ffffff', '#777777', '#ffffff'],
            stroke: '#000000',
            strokeThickness: 8
        }),
        result_description: new TextStyle({
            fontFamily: fonts.vag,
            fontSize: 60,
            fill: ['#ffffff', '#777777', '#ffffff'],
            stroke: '#000000',
            strokeThickness: 4
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