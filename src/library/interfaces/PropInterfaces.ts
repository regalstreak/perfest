import { ReactChild, ReactFragment, ReactPortal } from "react";

export interface ChildInterface {
    children?: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
}