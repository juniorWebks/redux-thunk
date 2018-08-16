//kaczka set user akcja asynchroniczna
import { auth as firebaseAuth } from '../firebaseConfig'
import {fetchUsersAction} from './fetchUsers'

const EMAIL_CHANGE = 'auth/EMAIL_CHANGE'
const PASSWORD_CHANGE = 'auth/PASSWORD_CHANGE'
const SET_USER = 'auth/SET_USER'


export const onEmailChangeAction = value => ({
    type: EMAIL_CHANGE,
    value
})

export const setUserAction = user => ({
    type: SET_USER,
    user
})

export const initAuthStateListening = () => (dispatch, getstate) => {
    firebaseAuth.onAuthStateChanged(user => {
        dispatch(setUserAction(user))  //user is null if user is logged out
        if (user) {
dispatch(fetchUsersAction())//dispatch after login actions
        } else {
//dispatch after logout actions
        }
        
    }
    )
}

export const onPasswordChangeAction = value => ({
    type: PASSWORD_CHANGE,
    value
})
export const logOutAction = () => (dispatch, getState) => {
    firebaseAuth.signOut()
    .then (() => console.log('SIGNOUT OK'))
    .then (() => console.log('SIGNOUT ERROR'))
}

export const onLogInClickAction = () => (dispatch, getState) => {
    const state = getState()

    firebaseAuth.signInWithEmailAndPassword(
        state.auth.email,
        state.auth.password
    )
        .then(() => console.log('login ok'))
        .catch(() => console.log('login error'))
}

const initialState = {

    email: '',
    password: '',
    user: null
}
//ma być czysta funkcja nie zmienia nic tylko w swoim skopie na zewnatrz nic
export default (state = initialState, action) => {

    switch (action.type) {
        case EMAIL_CHANGE:
            return {
                ...state, //wszystko ze starego stanu
                email: action.value

            }
    }
    switch (action.type) {
        case PASSWORD_CHANGE:
            return {
                ...state,
                password: action.value
            }
        }
        switch(action.type){
            case SET_USER:
            return {
                ...state,
                user:action.user
            }




        default:
            return state
    }
}