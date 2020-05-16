import React from 'react'

const TempoSetter = ({ value, callback }) => {
  return (
    <div style={styles.wrapper}>
      <button
        onClick={() => {
          if (value > 30) callback(value - 1)
        }}
      >
        <div style={styles.buttonText}>-</div>
      </button>
      <div>{value}</div>
      <button
        onClick={() => {
          if (value < 180) callback(value + 1)
        }}
      >
        <div style={styles.buttonText}>+</div>
      </button>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    width: '120px',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '20px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: '20px'
  }
}

export default TempoSetter
