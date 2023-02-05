import { userService } from '../services/user.service.js'
// import { userService } from '../services/user.service.js'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from '../store/actions/user.action.js'

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const dispatch = useDispatch()
    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }
    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }
    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    return (
        <header className="app-header main-layout full">
            <nav className='app-header-nav'>
                <NavLink to="/"></NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashbord</NavLink>
                {user && <section className="user-info">
                    <p>{user.fullname} <span></span></p>
                    <button onClick={onLogout}>Logout</button>
                </section>}
                {!user && <section className="user-info">
                    <LoginSignup setUser={setUser} />
                </section>}
            </nav>
        </header>
    )
}