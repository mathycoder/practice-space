import React, { useEffect, useRef, useState} from 'react'
import { setKey, setBPM, nextIndex, resetIndex } from '../../actions/settingsActions.js'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import { sampler } from '../sampler.js'
import BigButton from '../elements/BigButton'
// import { keyNotes } from '../keys.js'
import { setCurrentNote } from '../../actions/currentNoteActions.js'
import KeyDropdown from './KeyDropdown'
import TempoSlider from './TempoSlider'

const Settings = ({ currentKey, setKey, setBPM, currentBPM, setCurrentNote,
                    scaleIndex, nextIndex, resetIndex, scale, keyNotes }) => {
  const [looping, setLooping] = useState(false)
  const [scheduleId, setScheduleId] = useState(null)
  const counterRef = useRef(0)
  const samplerRef = useRef(null)
  const transportRef = useRef(Tone.Transport)

  useEffect(() => samplerRef.current = sampler.toMaster(), [])

  useEffect(() => {
    counterRef.current = scaleIndex
  }, [scaleIndex])

  useEffect(() => {
    if (currentKey){
      if (scheduleId !== null) {
        transportRef.current.clear(scheduleId)
        //counterRef.current = 0
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

      console.log(counterRef.current % notes.length)

      const schedulingId = transportRef.current.scheduleRepeat(time => {
        // counterRef.current
        let note = notes[counterRef.current % notes.length]
        setCurrentNote(note)
        samplerRef.current.triggerAttackRelease(note, '4n', time)
        // counterRef.current++
        nextIndex()
      }, '4n')
      setScheduleId(schedulingId)
    }
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
      <KeyDropdown currentKey={currentKey} setKey={setKey} stopLoop={stopLoop} />
      <TempoSlider value={currentBPM} callback={setBPM}/>
      <div style={styles.buttonWrapper}>
        <BigButton title={looping? 'Stop' : 'Start'} callback={() => playScale()}/>
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
    padding: '20px'
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
    keyNotes: state.settings.keyNotes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setKey: key => dispatch(setKey(key)),
    setBPM: bpm => dispatch(setBPM(bpm)),
    setCurrentNote: note => dispatch(setCurrentNote(note)),
    nextIndex: () => dispatch(nextIndex()),
    resetIndex: () => dispatch(resetIndex())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
