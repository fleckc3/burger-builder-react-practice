import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

// functional component with function body
const sideDrawer = (props) => {
    // ... conditonaly attach css classses to play animation when drawer opens/close
    return (
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    );
};

export default sideDrawer;