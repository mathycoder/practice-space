import React, { useEffect, useRef, useState} from 'react'
import { setKey, setBPM } from '../../actions/settingsActions.js'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import { sampler } from '../sampler.js'
import BigButton from '../elements/BigButton'
import { keyNotes } from '../keys.js'
import { setCurrentNote } from '../../actions/currentNoteActions.js'
import KeyDropdown from './KeyDropdown'
import TempoSlider from './TempoSlider'

const Settings = ({ currentKey, setKey, setBPM, currentBPM, setCurrentNote }) => {
  const [looping, setLooping] = useState(false)
  const [scheduleId, setScheduleId] = useState(null)
  const counterRef = useRef(0)
  const samplerRef = useRef(null)
  const transportRef = useRef(Tone.Transport)

  useEffect(() => samplerRef.current = sampler.toMaster(), [])

  useEffect(() => {
    if (currentKey){
      if (scheduleId !== null) {
        transportRef.current.clear(scheduleId)
        counterRef.current = 0
      }
      const notes = keyNotes[currentKey].map(note => {
        note = note.replace('/', '')
        const letter = note.split(/[\d]+/)[0]
        const octave = parseInt(note.slice(-1))
        return `${letter}${octave-1}`
      })
      const schedulingId = transportRef.current.scheduleRepeat(time => {
        let note = notes[counterRef.current % notes.length]
        setCurrentNote(note)
        samplerRef.current.triggerAttackRelease(note, '4n', time)
        counterRef.current++
      }, '4n')
      setScheduleId(schedulingId)
    }
  }, [currentKey])

  const playScale = () => looping ? stopLoop() : startLoop()

  const startLoop = () => {
    transportRef.current.start()
    setLooping(true)
  }

  const stopLoop = () => {
    transportRef.current.stop()
    setLooping(false)
    counterRef.current = 0
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
    currentBPM: state.settings.bpm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setKey: key => dispatch(setKey(key)),
    setBPM: bpm => dispatch(setBPM(bpm)),
    setCurrentNote: note => dispatch(setCurrentNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
