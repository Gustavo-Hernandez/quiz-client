import React from "react";

import { makeStyles } from "@material-ui/core/styles";


const Reaction = ({sendReaction}) => {
    const emojis = ["👹","😎"];
    const buttons = emojis.map((val,index)=>
    <button value={val} key={index}>{val}</button>);
    return (
        <div>{buttons}</div>
    );
}

export default Reaction;