import * as Tone from 'tone'

const samples = {
    'F#2': 'Fs2.wav',
    'F#3': 'Fs3.wav',
    'F#4': 'Fs4.wav',
    'F#5': 'Fs5.wav',
    'G3': 'G3.wav',
    'G5': 'G3.wav',
    'G#2': 'Gs2.wav',
    'G#4': 'Gs4.wav',
    'G#5': 'Gs5.wav',
    'A2': 'A2.wav',
    'A3': 'A3.wav',
    'A4': 'A4.wav',
    'A5': 'A5.wav',
    'A#5': 'As5.wav',
    'B1': 'B1.wav',
    'B2': 'B2.wav',
    'B3': 'B3.wav',
    'B4': 'B4.wav',
    'C#3': 'Cs3.wav',
    'C#4': 'Cs4.wav',
    'C#5': 'Cs5.wav',
    'D2': 'D2.wav',
    'D3': 'D3.wav',
    'D5': 'D5.wav',
    'D#4': 'Ds4.wav',
    'E2': 'E2.wav',
    'E3': 'E3.wav',
    'E4': 'E4.wav',
    'E5': 'E5.wav'
}

export const sampler = new Tone.Sampler(samples, [ null ], [ '/samples/guitar-nylon/'])
