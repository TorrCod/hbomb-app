import { useState } from "react";

const useHoverStyle:useHoverStyle = (hoverStyle:React.CSSProperties) => {
    const [style, setStyle] = useState<React.CSSProperties>({})

    return {
        state:style,
        props:{
            onMouseEnter:() => {
                setStyle(hoverStyle)
            },
            onMouseLeave: () => {
                setStyle({})
            }
        }
    }
}

export default useHoverStyle;

type useHoverStyle = (hoverStyle:React.CSSProperties) => useHoverStyleRET;
type useHoverStyleRET = {
    state: React.CSSProperties;
    props:React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}