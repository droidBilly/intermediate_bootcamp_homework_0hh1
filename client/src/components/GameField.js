import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Board from './containers/Board'
import CreateGameButton from './components/CreateGameButton'
import Finished from './components/Finished'
import Progress from './components/Progress'
import {Redirect} from 'react-router-dom'

class GameField extends PureComponent {

	render() {
		if (this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<div>
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

export default connect(null)(GameField)
