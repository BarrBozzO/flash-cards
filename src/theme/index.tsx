import { createContext } from "react";

enum Themes {
    light,
    dark
}

export default createContext(Themes.light);