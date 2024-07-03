import { Layer } from "./application";

function getLetters(words) {
    let allLetters = {}
    words.forEach(word => {
        let wordLetters = {}
        for(let i = 0; i < word.length; i++) {
            let letter = word[i]
            if (letter in wordLetters) wordLetters[letter] ++
            else wordLetters[letter] = 1
        }
        for (let latter in wordLetters) {
            if (latter in allLetters) {
                if (allLetters[latter] < wordLetters[latter]) allLetters[latter] = wordLetters[latter]
            } else {
                allLetters[latter] = wordLetters[latter]
            }
        }
    })

    let letters = []
    for (let latter in allLetters) {
        while(allLetters[latter] > 0) {
            letters.push(latter)
            allLetters[latter]--
        }
    }
    letters.sort( () => Math.random() -0.5 )
    return letters
}

export class Level extends Layer {
    constructor(words) {
        super()

        this.words = words
        this.letters = getLetters(words)

        console.log(this.words, this.letters)
    }
}