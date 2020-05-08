import React, { useEffect, useRef, useState} from 'react'
import { setKey, setBPM, nextIndex, setScaleType, resetScaleType,
         resetIndex, setLooping} from '../../actions/settingsActions.js'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import { sampler } from '../instruments/sampler.js'
import BigButton from '../elements/BigButton'
import { setCurrentNote, setNextNote } from '../../actions/currentNoteActions.js'
import KeyDropdown from './KeyDropdown'
import ScaleTypeDropdown from './ScaleTypeDropdown'
import TempoSlider from './TempoSlider'
import { isLoading, doneLoading } from '../../actions/settingsActions.js'

const Settings = ({ currentKey, setKey, setBPM, currentBPM, setCurrentNote, setNextNote,
                    scaleIndex, nextIndex, resetIndex, setLooping, looping,
                    currentInstrument, scale, keyNotes, loading, isLoading, doneLoading,
                    guitarSamplerRef, pianoSamplerRef, setScaleType, scaleType}) => {

  const [scheduleId, setScheduleId] = useState(null)
  const counterRef = useRef(0)
  const samplerRef = useRef(null)
  const loopingRef = useRef(looping)
  const transportRef = useRef(Tone.Transport)

  useEffect(() => {
    currentInstrument === 'guitar'
      ? samplerRef.current = guitarSamplerRef.current.toMaster()
      : samplerRef.current = pianoSamplerRef.current.toMaster()
  }, [currentInstrument])


  useEffect(() => {
    loopingRef.current = looping
  }, [looping])

  useEffect(() => {
    counterRef.current = scaleIndex
  }, [scaleIndex])


  const toggleLooping = (e) => {
    if (e.code === 'Space') loopingRef.current ? stopLoop() : startLoop()
  }

  useEffect(() => {
    document.addEventListener("keydown", toggleLooping)
    return () => {document.removeEventListener("keydown", toggleLooping)}
  }, [])

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
      <ScaleTypeDropdown
        scaleType={scaleType}
        callback={(obj) => {
          setScaleType(obj.value)
          stopLoop()
        }}
      />
      <TempoSlider value={currentBPM} callback={setBPM}/>
      <div style={styles.buttonWrapper}>
        <BigButton
          title={looping? 'Stop' : 'Start'}
          disabled={loading}
          callback={() => playScale()}/>
      </div>
    </div>
  )
}

const styles = {
  settingsWrapper: {
    flex: 2,
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
    loading: state.settings.loading,
    scaleType: state.settings.scaleType
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
    doneLoading: () => dispatch(doneLoading()),
    setScaleType: scaleType => dispatch(setScaleType(scaleType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
