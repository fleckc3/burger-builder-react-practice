import React from 'react';
import Auxilliary from '../../hoc/Auxilliary';  // wrapping element
import classes from './Layout.css';

// functional component
const layout = ( props ) => (
    
    <Auxilliary>
        <div>toolbar, SideDrawer, Backdrop</div>
        <main className={ classes.Content }>
            {props.children}
        </main>
    </Auxilliary>
);

export default layout;