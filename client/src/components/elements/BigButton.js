import React from 'react'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const BigButton = ({ title, callback }) => {
  return (
    <AwesomeButton
      onPress={callback}
      type="primary">{title}</AwesomeButton>
  )
}

export default BigButton
