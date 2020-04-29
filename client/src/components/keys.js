import Vex from 'vexflow'

export const keys = (VF, key) => {
  return keyNotes[key].map(note => {
    return new VF.StaveNote({clef: "treble", keys: [note], duration: '4'})
  })
}

const keyNotes = {
  'C': ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5' ],
  'G': ['g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f#/5', 'g/5' ],
  'D': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5' ],
}
