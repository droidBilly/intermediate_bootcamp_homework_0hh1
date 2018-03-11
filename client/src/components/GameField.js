import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Board from '../containers/Board'
import CreateGameButton from './CreateGameButton'
import Finished from './Finished'
import Progress from './Progress'
import {Redirect} from 'react-router-dom'

class GameField extends PureComponent {

	render() {
		if (!this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<div className="App">
      <div className="actions">
        <CreateGameButton />
      </div>

      <Progress />

      <Board />

      <Finished />
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps)(GameField)
