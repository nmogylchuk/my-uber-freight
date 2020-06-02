import React from "react";


const DriverWelcome = () => {
    return (
        <div className="driver-welcome">
            <div className="driver-welcome__container">
                <div className="driver-welcome__title title">
                    Welcome to driver page!
                    </div>
                <div className="driver-welcome__description">When you inherit a truck from your father, you decide to take your chance and move to a new city. Here, it’s up to you to make a name for yourself and earn the respect of the local community. Work with all kinds of people ranging from a constructor to a lumberjack and honor your uncle by making it as a Truck Driver!</div>
                <ul className="driver-welcome advantages">
                    <li className="advantages__item"><b className="advantages__item-mark">Enjoy</b> a trucking experience focused on your career as a truck driver</li>
                    <li className="advantages__item"><b className="advantages__item-mark">Build</b> stronger relationships with the local community with each job</li>
                    <li className="advantages__item"><b className="advantages__item-mark">Customize</b> your truck with tons of parts and tune it to your liking</li>
                    <li className="advantages__item"><b className="advantages__item-mark">Navigate</b> through beautiful landscapes and fully explorable cities</li>
                    <li className="advantages__item"><b className="advantages__item-mark">Get</b>new jobs and utilise empty capacity</li>
                    <li className="advantages__item"><b className="advantages__item-mark">Daily</b>notifications about return loads</li>
                </ul>
            </div>
        </div>
    )
}

export default DriverWelcome;