import React, { useState, useRef } from 'react'
import './css/tempo-setter.css'

const TempoSetter = ({ value, callback }) => {
  const [textValue, setTextValue] = useState(value)
  const textFieldRef = useRef(null)

  const handleChange = e => {
    const value = e.target.value
    const char = value.slice(-1)
    if ((parseInt(char) || char === '' || char === '0') && value.length < 4){
      setTextValue(e.target.value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newValue = parseInt(textValue)
    if (newValue && newValue <=180 && newValue >= 30){
      callback(newValue)
    } else {
      setTextValue(value)
    }

    textFieldRef.current.blur()
  }

  return (
    <div className="tempo-setter-wrapper">
      <button
        className="button-style"
        onClick={() => {
          if (value > 30) {
            callback(value - 1)
            setTextValue(value - 1)
          }
        }}>
        <div className="button-text">-</div>
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={textFieldRef}
          value={textValue}
          onChange={(e) => handleChange(e)}
          className="input-style" />
      </form>
      <button
        className="button-style"
        onClick={() => {
          if (value < 180) {
            callback(value + 1)
            setTextValue(value + 1)
          }
        }}>
        <div className="button-text">+</div>
      </button>
    </div>
  )
}

export default TempoSetter
