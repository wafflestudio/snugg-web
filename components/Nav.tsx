import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href={"/"}>
                        <a >/</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/Test1"}>
                        <a>Test1</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/Test2"}>
                        <a>Test2</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

Nav.propTypes = {

};

export default Nav;