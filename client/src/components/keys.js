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
  'G': ['g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f#/4', 'g/4' ],
  'D': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5' ],
  'A': ['a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g#/4', 'a/4' ],
  'E': ['e/4', 'f#/4', 'g#/4', 'a/4', 'b/4', 'c#/5', 'd#/5', 'e/5' ],
  'B': ['b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a#/4', 'b/4' ],
}
