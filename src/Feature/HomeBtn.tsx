import React from "react";
import { Link } from "react-router-dom";

const HomeBtn = (props:Props) => {
    return (
        <Link to='/'>
            {props.children}
        </Link>
    )
}

type Props = {
    children : React.ReactNode
}

export default HomeBtn;