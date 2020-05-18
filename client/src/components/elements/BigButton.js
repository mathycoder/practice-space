import React, { useRef } from 'react'
// import { AwesomeButton } from "react-awesome-button";
// import "react-awesome-button/dist/styles.css";
import './css/button.css'

const BigButton = ({ title, callback, disabled }) => {
  const buttonRef = useRef(null)
  return (
    <button
      ref={buttonRef}
      className="big-button"
      onClick={(e) => {
        callback(e)
        buttonRef.current.blur()
      }}
      disabled={disabled}
      >{title}</button>
  )
}

export default BigButton

// return (
//   <AwesomeButton
//     className="awesome-button-custom"
//     onPress={callback}
//     disabled={disabled}
//     type="primary">{title}</AwesomeButton>
// )
