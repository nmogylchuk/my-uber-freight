import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Logout = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = async () => {
        try {
            auth.logout();
            history.push("/");
        }
        catch (error) {
            console.log('Catch error on logout: ' + error)
        };
    };

    return (
        <div className="logout">
            <div className="logout__description">Are you sure you want to log out?</div>
            <div className='button__list'>
                <button className='logout__button button' onClick={logoutHandler}>Log out</button>
            </div>
        </div>
    );
}

export default Logout;