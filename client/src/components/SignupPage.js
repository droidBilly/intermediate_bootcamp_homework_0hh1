import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {signup} from '../actions/users'
import SignupForm from './SignupForm'
import LoginPage from './LoginPage'
import {Link, Redirect} from 'react-router-dom'

class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.signup(data.email, data.password)
	}

	render() {
		if (this.props.currentUser) return (
			<Redirect to="/0hh1/" />
		)

		return (
			<div>
				<h1>Sign up</h1>

				<SignupForm onSubmit={this.handleSubmit} />

				<br />
				<p>Already have a profile? Go to</p>
        <Link to={'/login/'} component={LoginPage} ><button>Login!</button></Link>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps, {signup})(SignupPage)
