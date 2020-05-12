const notes = notesArray.slice(0,4)
const notes2 = notesArray.slice(4,8)
const notes3 = notesArray.slice(8, 12)
const notes4 = notesArray.slice(12)

const stave1 = new VF.Stave(0, 0, measureWidth + accidentalWidth + trebleWidth + timeSignatureWidth);
stave1.addClef("treble").addTimeSignature("4/4").addKeySignature(keySignature);
stave1.setContext(contextRef.current).draw();

let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.addTickables(notes);
let formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth);
voice.draw(contextRef.current, stave1)


const stave2 = new VF.Stave(measureWidth + accidentalWidth + trebleWidth + timeSignatureWidth, 0, measureWidth);
stave2.setContext(contextRef.current).draw();

voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.addTickables(notes2);
formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth);
voice.draw(contextRef.current, stave2)


const stave3 = new VF.Stave(0, 0, measureWidth + accidentalWidth + trebleWidth);
stave3.addClef("treble").addKeySignature(keySignature);
stave3.setContext(contextRef2.current).draw();

voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.addTickables(notes3);
formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth);
voice.draw(contextRef2.current, stave3)


const stave4 = notes4.length < 4
  ? new VF.Stave(measureWidth + accidentalWidth + trebleWidth, 0, timeSignatureWidth + measureWidth*(notes4.length/4)).addTimeSignature(`${notes4.length}/4`)
  : new VF.Stave(measureWidth + accidentalWidth + trebleWidth, 0, measureWidth)

stave4.setEndBarType(VF.Barline.type.REPEAT_END)
stave4.setContext(contextRef2.current).draw();

voice = new VF.Voice({num_beats: notes4.length,  beat_value: 4});
voice.addTickables(notes4);
formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth*(notes4.length/4));
voice.draw(contextRef2.current, stave4)

// alternate strategy
  // const notes = notesArray.slice(0,4)
  // const stave = new VF.Stave(0, 0, measureWidth + accidentalWidth + trebleWidth + timeSignatureWidth);
  // stave.addClef("treble").addTimeSignature("4/4").addKeySignature(keySignature);
  // stave.setContext(contextRef.current).draw();
  //
  // let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
  // voice.addTickables(notes);
  // let formatter = new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave)
  // voice.draw(contextRef.current, stave)
