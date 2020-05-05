import React from 'react'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const BigButton = ({ title, callback, disabled }) => {
  return (
    <AwesomeButton
      onPress={callback}
      disabled={disabled}
      type="primary">{title}</AwesomeButton>
  )
}

export default BigButton
