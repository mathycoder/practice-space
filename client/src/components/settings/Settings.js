import React, { useEffect, useRef, useState} from 'react'
import { setKey, setBPM, nextIndex,
         resetIndex, setLooping} from '../../actions/settingsActions.js'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import { sampler } from '../instruments/sampler.js'
import BigButton from '../elements/BigButton'
import { setCurrentNote, setNextNote } from '../../actions/currentNoteActions.js'
import KeyDropdown from './KeyDropdown'
import TempoSlider from './TempoSlider'
import { isLoading, doneLoading } from '../../actions/settingsActions.js'

const Settings = ({ currentKey, setKey, setBPM, currentBPM, setCurrentNote, setNextNote,
                    scaleIndex, nextIndex, resetIndex, setLooping, looping,
                    currentInstrument, scale, keyNotes, loading, isLoading, doneLoading }) => {

  const [scheduleId, setScheduleId] = useState(null)
  const counterRef = useRef(0)
  const samplerRef = useRef(null)
  const transportRef = useRef(Tone.Transport)

  useEffect(() => {
    samplerRef.current = sampler(currentInstrument, () => doneLoading()).toMaster()
    isLoading()
  }, [currentInstrument])

  useEffect(() => {
    counterRef.current = scaleIndex
  }, [scaleIndex])

  // useEffect(() => {
  //   document.addEventListener("keydown", () => )
  // }, [])

  useEffect(() => {
    if (currentKey){
      if (scheduleId !== null) {
        transportRef.current.clear(scheduleId)
        resetIndex()
      }

      const notes = scale.map(noteInd => {
        //need to look like a3
        let note = keyNotes[noteInd]
        note = note.replace('/', '')
        const letter = note.split(/[\d]+/)[0]
        const octave = parseInt(note.slice(-1))
        return `${letter}${octave-1}`
      })

      const schedulingId = transportRef.current.scheduleRepeat(time => {
        let note = notes[counterRef.current % notes.length]
        let nextNote = notes[(counterRef.current + 1) % notes.length]
        setCurrentNote(note)
        setNextNote(nextNote)
        samplerRef.current.triggerAttackRelease(note, '4n', time)
        nextIndex()
      }, '4n')
      setScheduleId(schedulingId)
    }
     // eslint-disable-next-line
  }, [currentKey])

  useEffect(() => {
    transportRef.current.bpm.value = currentBPM
  }, [currentBPM])

  const playScale = () => looping ? stopLoop() : startLoop()

  const startLoop = () => {
    transportRef.current.start()
    setLooping(true)
  }

  const stopLoop = () => {
    transportRef.current.stop()
    setLooping(false)
    //counterRef.current = 0
    resetIndex()
  }

  return (
    <div style={styles.settingsWrapper}>
      <KeyDropdown
        currentKey={currentKey}
        callback={(obj) => {
          setKey(obj.value)
          stopLoop()
        }}
      />
      <TempoSlider value={currentBPM} callback={setBPM}/>
      <div style={styles.buttonWrapper}>
        <BigButton title={looping? 'Stop' : 'Start'} disabled={loading} callback={() => playScale()}/>
      </div>
    </div>
  )
}

const styles = {
  settingsWrapper: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'gray',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px'
  },
  buttonWrapper: {
    marginTop: '16px'
  }
}

const mapStateToProps = state => {
  return {
    currentKey: state.settings.key,
    currentBPM: state.settings.bpm,
    scaleIndex: state.settings.scaleIndex,
    scale: state.settings.scale,
    keyNotes: state.settings.keyNotes,
    currentInstrument: state.settings.instrument,
    looping: state.settings.looping,
    loading: state.settings.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setKey: key => dispatch(setKey(key)),
    setBPM: bpm => dispatch(setBPM(bpm)),
    setCurrentNote: note => dispatch(setCurrentNote(note)),
    setNextNote: note => dispatch(setNextNote(note)),
    nextIndex: () => dispatch(nextIndex()),
    resetIndex: () => dispatch(resetIndex()),
    setLooping: (looping) => dispatch(setLooping(looping)),
    isLoading: () => dispatch(isLoading()),
    doneLoading: () => dispatch(doneLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
