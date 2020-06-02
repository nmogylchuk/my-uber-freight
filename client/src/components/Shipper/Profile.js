import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import shipper_avatar from '../../images/shipper/shipper_avatar.png';

const ProfileShipper = () => {

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
            <div className="shipper-profile">
                <div className="shipper-profile__container isSmall">
                    <div className="shipper-profile__image-wrapper">
                        <img className="shipper-profile__image" src={shipper_avatar} alt="person" />
                    </div>
                </div>
                <div className="shipper-profile__container isBig">
                    <div className="shipper-profile__info">
                        <div className="shipper-profile__title title">Your details</div>
                        <div className="shipper-profile__description">Here you can check your personal details. Please note that providing up-to-date information is mandatory</div>
                        <div className="shipper-profile__list">
                            <div className="shipper-profile__characteristic">
                                <div className="shipper-profile__name shipper-profile__element">Name:</div>
                                <div className="shipper-profile__lastname shipper-profile__element">Last Name:</div>
                                <div className="shipper-profile__email shipper-profile__element">Email:</div>
                            </div>
                            <div className="shipper-profile__characteristic">
                                <div className="shipper-profile__item">{profile.firstName}</div>
                                <div className="shipper-profile__item">{profile.lastName}</div>
                                <div className="shipper-profile__item">{profile.email}</div>
                            </div>
                        </div>
                        <div className="submit__item">
                            <NavLink to='/shipper/profile/password' className="button__link">
                                <button className='password-change__button button'>Change password</button>
                            </NavLink>
                            <NavLink to='/shipper/profile/delete' className="button__link">
                                <button className='profile-delete__button button'>Delete Profile</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ProfileShipper;