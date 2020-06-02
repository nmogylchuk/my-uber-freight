import React from "react";

import delivery_photo from '../../images/shipper/delivery_photo.png'


const ShipperWelcome = () => {
    return (
        <div className="shipper-welcome">
            <div className="shipper-welcome__container">
                <div className="driver-welcome__title title">
                    Welcome to shipper page!
                    </div>
                <div className="shipper-welcome__description">Tell us where you want to ship your FTL load and we will find the best transport provider for your delivery.
We connect individuals and businesses with verified transport providers who deliver loads like yours. Order transportation service for your company. Shipment of various load types: pallets, machinery and equipment, less than truckload, etc.
Thousands of verified transport providers.
All over Europe.</div>
                <ul className="shipper-welcome advantages">
                <li className="advantages__item"><b className="advantages__item-mark">24/7</b> on-demand deliveries with same-day or advance booking options.</li>
                    <li className="advantages__item"><b className="advantages__item-mark">Save</b> up to 60%.</li>
                    <li className="advantages__item">List your items for <b className="advantages__item-mark">free</b></li>
                    <li className="advantages__item">Only <b className="advantages__item-mark">verified</b> transport providers</li>
                    <li className="advantages__item"><b className="advantages__item-mark">No obligation.</b> You don't have to accept any quote</li>
                </ul>
                <div className="shipper-welcome__figure">
                    <img className="shipper-welcome__photo" src={delivery_photo} alt="truck photo" />
                </div>
            </div>
        </div>
    )
}

export default ShipperWelcome;