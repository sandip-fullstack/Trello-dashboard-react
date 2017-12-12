import React from 'react';
import './Header.css';

const Header = (props) => {
    return(
        <div className={`Header-main Header-fixed Header-title Theme-${props.theme}`}>
            {props.children}
        </div>
    )
}
export default Header;