import React from 'react';
import Aux from '../../hoc/Auxilliary';  // wrapping element
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


// functional component
const layout = ( props ) => (
    
    <Aux>
        <Toolbar/>
        <SideDrawer/>
        <main className={ classes.Content }>
            {props.children}
        </main>
    </Aux>
);

export default layout;