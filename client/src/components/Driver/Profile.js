import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import driver_avatar from '../../images/driver/driver_avatar.png';

const ProfileDriver = () => {

    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [profile, setProfile] = useState([]);

    const getProfile = useCallback(async () => {
        try {
            const data = await request('/api/user', 'GET', null,
                { Authorization: `Bearer ${auth.token}` }
            );
            setProfile(data);
        } catch (e) { }
    }, [auth.token, request]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return (
        <div className="block">
            <div className="driver-profile">
                <div className="driver-profile__container isSmall">
                    <div className="driver-profile__image-wrapper">
                        <img className="driver-profile__image" src={driver_avatar} alt="person" />
                    </div>
                </div>
                <div className="driver-profile__container isBig">
                <div className="driver-profile__info">
                        <div className="driver-profile__title title">Your details</div>
                        <div className="driver-profile__description">Here you can check your personal details. Please note that providing up-to-date information is mandatory</div>
                        <div className="driver-profile__list">
                            <div className="driver-profile__characteristic">
                                <div className="driver-profile__name driver-profile__element">Name:</div>
                                <div className="driver-profile__lastname driver-profile__element">Last Name:</div>
                                <div className="driver-profile__email driver-profile__element">Email:</div>
                            </div>
                            <div className="driver-profile__characteristic">
                                <div className="driver-profile__item">{profile.firstName}</div>
                                <div className="driver-profile__item">{profile.lastName}</div>
                                <div className="driver-profile__item">{profile.email}</div>
                            </div>
                        </div>
                        <div className='submit__item'>
                            <NavLink to='/driver/profile/password' className="button__link">
                                <button className='password-change__button button'>Change password</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDriver;