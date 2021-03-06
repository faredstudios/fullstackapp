import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError} from "./errors";

export function setCurrentUser(user) {
	return{
		type: SET_CURRENT_USER,
		user
	};
}

export function authUser(type, userData){
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall("post", `/api/auth/${type}`, userData).then(({token, ...user}) => {
				localStorage.setItem("jwToken", token)
				dispatch(setCurrentUser(userData.walletID));
				resolve();
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject();
			});
		});
	};
}