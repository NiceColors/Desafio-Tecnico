

import type { CSSProp } from "styled-components";
import { theme } from "./theme";

type ThemeType = typeof theme;

declare module "styled-components" {
    interface DefaultTheme extends ThemeType { }
}

declare module "react" {
    interface DOMAttributes<T> {
        css?: CSSProp;
    }
}
