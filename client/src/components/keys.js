import Vex from 'vexflow'

export const keys = (VF, key) => {
  return keyNotes[key].map(note => {
    const accidental = note.split("/")[0][1]

    return !accidental ?
      new VF.StaveNote({clef: "treble", keys: [note], duration: '4'})
      : new VF.StaveNote({clef: "treble", keys: [note], duration: '4'}).
        addAccidental(0, new VF.Accidental(accidental))
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
