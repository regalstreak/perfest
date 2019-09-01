import { useState, useEffect } from "react";
import { getUserType } from "../utils/utils";

export const useRtype = () => {
    const [userType, setUserType] = useState();

    useEffect(() => {
        const userTypeLocal = async () => {
            setUserType(await getUserType());
        }
        userTypeLocal();
    })

    return userType;
}