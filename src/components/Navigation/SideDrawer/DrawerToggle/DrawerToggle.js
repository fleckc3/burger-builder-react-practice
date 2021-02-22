import React from 'react';

import classes from './DrawerToggle.css';


// functional component - burger menu to toggle sidedrawer
const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default  drawerToggle;