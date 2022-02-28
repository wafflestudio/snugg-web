import React from 'react';
import PropTypes from 'prop-types';
import Nav from "./Nav";
const Layout = ({children}:any) => {
    return (
        <>
            <Nav/>
            <div>
                {children}
            </div>
        </>
    );
};

Layout.propTypes = {

};

export default Layout;