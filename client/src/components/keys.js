import Vex from 'vexflow'

export const keys = (VF, key, currentNote) => {
  return keyNotes[key].map(note => {
    const accidental = note.split("/")[0][1]

    let formatNote
    if (currentNote) {
      const octave = parseInt(currentNote.slice(-1)) + 1
      const letter = currentNote.split(/\d/)[0].toLowerCase()
      formatNote = `${letter}/${octave}`
    }

    const myNote = !accidental ?
      new VF.StaveNote({clef: "treble", keys: [note], duration: '4'})
      : new VF.StaveNote({clef: "treble", keys: [note], duration: '4'}).
        addAccidental(0, new VF.Accidental(accidental))
    if (formatNote === note) myNote.setStyle({fillStyle: "rgb(48, 140, 223)", strokeStyle: "rgb(48, 140, 223)"});

    return myNote
  })
}

export const keyNotes = {
  'C': ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5' ],
  'F': ['f/3', 'g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'e/4', 'f/4' ],
  'G': ['g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f#/4', 'g/4' ],
  'D': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5' ],
  'A': ['a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g#/4', 'a/4' ],
  'E': ['e/3', 'f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd#/4', 'e/4' ],
  'B': ['b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a#/4', 'b/4' ],
  'Bb': ['bb/3', 'c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'a/4', 'bb/4' ],
  'Eb': ['eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5', 'd/5', 'eb/5' ],
  'Ab': ['ab/3', 'bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'g/4', 'ab/4' ],
  'Db': ['db/4', 'eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'c/5', 'db/5' ],
}

// 'F#': ['f#/3', 'g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4'],
// 'C#': ['c#/4', 'd#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b#/4', 'c#/5' ],
// 'Gb': ['gb/3', 'ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'f/4', 'gb/4' ],
// 'Cb': ['cb/4', 'db/4', 'eb/4', 'fb/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5' ],
