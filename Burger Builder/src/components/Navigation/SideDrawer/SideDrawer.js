import React from 'react';
import Logo from '../../Logo/Logo' ;
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {
    let attachedCalsses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedCalsses = [classes.SideDrawer, classes.Open];
    }

    return(
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedCalsses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo /> 
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;