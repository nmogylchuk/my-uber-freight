import React, { useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfileDelete = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();

    const deleteProfileHandler = async () => {
        try {
            const data = await request('/api/auth', 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            });
            auth.logout();
            history.push("/");
        }
        catch (error) {
            console.log('Catch error on deleting shipper: ' + error)
        };
    };

    return (
        <div className="account-delete">
            <div className="account-delete__description">Are you sure you want to delete your profile?</div>
            <div className='button__list'>
                <button className='account-delete__button button' onClick={deleteProfileHandler}>Delete</button>
            </div>
        </div>
    );
}

export default ProfileDelete;