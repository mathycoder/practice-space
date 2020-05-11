import React from 'react'
import './css/repeat-checkbox.css'
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { connect } from 'react-redux'
import { setRepeatTopNote } from '../../actions/settingsActions.js'

const RepeatCheckbox = ({ repeatTopNote, setRepeatTopNote }) => {
  return (
    <div className="repeat-checkbox-wrapper">
      <p>
        <label>
          <Checkbox
            checked={repeatTopNote}
            onChange={e => {
              setRepeatTopNote(!repeatTopNote)
            }}
          />
          &nbsp; Repeat Top Note?
        </label>
        &nbsp;&nbsp;
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    repeatTopNote: state.settings.repeatTopNote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRepeatTopNote: repeat => dispatch(setRepeatTopNote(repeat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepeatCheckbox)
