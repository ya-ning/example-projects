import React from 'react';
import burgerLogo from '../../assests/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        {/* <img src="../../assests/images/burger-logo.png" /> */}
        {/* Above doesn't work. Below shows how to add images in React. */}
        <img src={burgerLogo} alt="MyBurger Logo" />
    </div>
);

export default logo;