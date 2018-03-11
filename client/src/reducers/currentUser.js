import {USER_LOGIN_SUCCESS, USER_LOGIN_FAILED} from '../actions/users'
import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED } from '../actions/users'

export default function (state = null, action) {
	switch (action.type) {
		case USER_LOGIN_SUCCESS:
			return action.payload
			case USER_SIGNUP_SUCCESS:
				return action.payload
	    case USER_SIGNUP_FAILED:
	      return { error: action.payload }
			case USER_LOGIN_FAILED:
				return { error: action.payload}
		default: return state
	}
}
