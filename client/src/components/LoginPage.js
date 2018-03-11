import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/users'
import LoginForm from './LoginForm'
import GameField from './GameField'
import SignupPage from './SignupPage'
import {Link, Redirect} from 'react-router-dom'

class LoginPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {
		if (this.props.currentUser) return (
			<Redirect to="/0hh1/" component={GameField} />
		)

		return (
			<div>
				<h1>Login</h1>

				<LoginForm onSubmit={this.handleSubmit} />

				<br />
				<p>Dont have a Profile yet? Go and</p>
        <Link to={'/signup/'} component={SignupPage} ><button>SIGN UP!</button></Link>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps, {login})(LoginPage)
