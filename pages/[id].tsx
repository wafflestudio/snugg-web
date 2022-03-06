/*나중에는 [id] 이런 식으로 바꾸면 될 듯 */

import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Profile from "../components/Body/Profile";

const Id = () => {
    const router = useRouter();
    const id = Number(router.query.id)

    return <Profile id={id}/>
};
Id.displayName = "Profile";
export default Id;