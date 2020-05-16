import React, { useEffect, useRef, useState} from 'react'
import { setKey, setBPM, nextIndex, resetIndex,
         setLooping, isLoading, doneLoading,
         setScaleShapeAndRepetition } from '../../actions/settingsActions.js'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import { sampler } from '../instruments/sampler.js'
import BigButton from '../elements/BigButton'
import { setCurrentNote, setNextNote, setScaleTone } from '../../actions/currentNoteActions.js'
import KeyDropdown from './KeyDropdown'
import ScaleTypeDropdown from './ScaleTypeDropdown'
import ScaleShapeDropdown from './ScaleShapeDropdown'
import ScaleRepetitionDropdown from './ScaleRepetitionDropdown'
import TempoSlider from './TempoSlider'
import TempoSetter from './TempoSetter'

const Settings = ({ currentKey, setKey, setBPM, currentBPM, setCurrentNote, setNextNote,
                    scaleIndex, nextIndex, resetIndex, setLooping, looping, scaleType,
                    currentInstrument, scale, keyNotes, loading, isLoading, doneLoading,
                    guitarSamplerRef, pianoSamplerRef, setScaleTone, repeatTopNote,
                    scaleShape, scaleRepetition, setScaleShapeAndRepetition }) => {

  const [scheduleId, setScheduleId] = useState(null)
  const counterRef = useRef(0)
  const samplerRef = useRef(null)
  const loopingRef = useRef(looping)
  const transportRef = useRef(Tone.Transport)

  useEffect(() => {
    currentInstrument === 'Guitar'
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
    if (e.code === 'Space'){
      loopingRef.current ? stopLoop() : startLoop()
      e.stopPropagation()
    }
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
        let letter = note.split(/[\d]+/)[0]
        const octave = parseInt(note.slice(-1))
        return `${letter}${octave-1}`
      })

      const noteSpeed = scaleRepetition === 'All 2x'
        ? '8n'
        : scaleRepetition === 'All 4x'
          ? '16n'
          : scaleRepetition === 'All 3x'
            ? '8t'
            : '4n'

      const schedulingId = transportRef.current.scheduleRepeat(time => {
        let note = notes[counterRef.current % notes.length]
        let nextNote = notes[(counterRef.current + 1) % notes.length]
        let tone = ((scale[counterRef.current % notes.length])%7 + 1)
        setCurrentNote(note)
        setNextNote(nextNote)
        setScaleTone(tone)
        samplerRef.current.triggerAttackRelease(note, noteSpeed, time)
        nextIndex()
      }, noteSpeed)
      setScheduleId(schedulingId)
    }
     // eslint-disable-next-line
  }, [currentKey, scaleType, scale])

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
      <KeyDropdown stopLoop={stopLoop} />
      <ScaleTypeDropdown
        currentKey={currentKey}
        scaleType={scaleType}
        callback={(obj) => {
          setKey(currentKey, obj.value)
          stopLoop()
        }}
      />
      <ScaleShapeDropdown
        scaleShape={scaleShape}
        callback={(obj) => {
          // setScaleShape(obj.value)
          setScaleShapeAndRepetition(obj.value, scaleRepetition)
          stopLoop()
        }}
      />
      <ScaleRepetitionDropdown
        scaleRepetition={scaleRepetition}
        callback={(obj) => {
          setScaleShapeAndRepetition(scaleShape, obj.value)
          stopLoop()
        }}
      />
      <TempoSetter value={currentBPM} callback={setBPM}/>
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
    scaleType: state.settings.scaleType,
    repeatTopNote: state.settings.repeatTopNote,
    scaleShape: state.settings.scaleShape,
    scaleRepetition: state.settings.scaleRepetition
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setKey: (key, scaleType) => dispatch(setKey(key, scaleType)),
    setBPM: bpm => dispatch(setBPM(bpm)),
    setCurrentNote: note => dispatch(setCurrentNote(note)),
    setNextNote: note => dispatch(setNextNote(note)),
    setScaleTone: tone => dispatch(setScaleTone(tone)),
    nextIndex: () => dispatch(nextIndex()),
    resetIndex: () => dispatch(resetIndex()),
    setLooping: (looping) => dispatch(setLooping(looping)),
    isLoading: () => dispatch(isLoading()),
    doneLoading: () => dispatch(doneLoading()),
    setScaleShapeAndRepetition: (scaleShape, scaleRepetition) => dispatch(setScaleShapeAndRepetition(scaleShape, scaleRepetition))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
