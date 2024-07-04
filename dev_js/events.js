import { utils } from "pixi.js";

export const EventHub = new utils.EventEmitter()

export const events = {
    levelDone: 'levelDone',
    nextLevel: 'nextLevel',
}

/*
export function screenResize( data ) {
    EventHub.emit( events.screenResize, data )
}
*/

export function levelDone() {
    EventHub.emit( events.levelDone )
}

export function nextLevel() {
    EventHub.emit( events.nextLevel )
}

/*
USAGE

Init:
anyFunction( data )

Subscribe:
EventHub.on( events.eventKey, ( event ) => {
    // event actions 
})

*/

