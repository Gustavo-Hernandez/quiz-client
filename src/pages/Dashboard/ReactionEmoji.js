import { useEffect } from "react";
import React from "react";

const ReactionEmoji = (popCallback) => {
    useEffect(()=>{
        setTimeout(popCallback, 5000);
    });
};

export default ReactionEmoji;