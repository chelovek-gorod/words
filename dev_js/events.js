import { utils } from "pixi.js";

export const EventHub = new utils.EventEmitter()

export const events = {
    levelDone: 'levelDone',
}

/*
export function screenResize( data ) {
    EventHub.emit( events.screenResize, data )
}
*/

export function levelDone() {
    EventHub.emit( events.levelDone )
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

