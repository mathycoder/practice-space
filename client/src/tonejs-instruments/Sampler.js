import * as Tone from 'tone'

export const Sampler = {
    // minify: false,
    // ext: '.mp3', // use setExt to change the extensions on all files // do not change this variable //
    // baseUrl: '/samples/',
    // list: ['guitar-nylon','piano'],
    // onload: null,


    const samples = {
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        'G3': 'G3.mp3',
        'G5': 'G3.mp3',
        'G#2': 'Gs2.mp3',
        'G#4': 'Gs4.mp3',
        'G#5': 'Gs5.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A#5': 'As5.mp3',
        'B1': 'B1.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'C#5': 'Cs5.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D5': 'D5.mp3',
        'D#4': 'Ds4.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3'
    }

new Tone.Sampler ( samples , [ null ] , [ '/samples/' ] )
