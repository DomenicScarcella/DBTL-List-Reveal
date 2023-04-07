import { useState } from "react";
import spotlight from "./art/spotlight.png";
import { listL } from "./dataJohn.js";
import { listR } from "./dataDom.js";
import "./all.css";

export function ListModular() {
    const [active, setActive] = useState("Small graphic of WrestleMania 39 logo");
    const [matchImage, setMatchImage] = useState(null);
    const [lastClick, setLastClick] = useState("");

    function ListSingle(arr, L_R) {
        return (
            <div className="single-list">
                <h2 className="list-name">{arr[0].title}</h2>                
                {
                    arr.slice(1, arr.length).map(item => {
                        const i = arr.indexOf(item).toString();
                        return (
                            <button
                                key={L_R + i} 
                                className={"list-item " + L_R + " " + item.vis}
                                onClick={() => {
                                    if (item.vis == "hide") {
                                        item.vis = "unhide";
                                        if (matchImage != item.pix) { setMatchImage(item.pix) };
                                        setActive(item.title)
                                    } else {
                                        item.vis = "hide";
                                        if (matchImage == item.pix) { setMatchImage(null); setActive("Small graphic of WrestleMania 39 logo") }
                                    }
                                    setLastClick(L_R + i + "_" + item.vis);
                                }}
                                id={
                                    (String(active).valueOf() == String(item.title).valueOf())
                                    && (item.vis == "unhide")
                                    ? ((L_R == "L") ? "active-L" : "active-R")
                                    : ""
                                }
                            >
                                {i}. {item.title}
                            </button>
                        )
                    })
                }
            </div>
        )
    }
    
    return (
        <div className="list-modular">
            { ListSingle(listL, "L") }
            <div className="featured-match">
                {
                    matchImage == null && lastClick.length >= 0
                    ? <img id="null-image" />
                    : <img id="featured-image" src={matchImage} alt={"WWE graphic featuring " + active} onClick={() => { setMatchImage(null); setActive("Small graphic of WrestleMania 39 logo"); setLastClick("matchImage reset") }}  />
                }
                <img id="spotlight" src={spotlight} alt="A pair of hanging spotlights shining on the main image area in the center of the screen" />
            </div>
            { ListSingle(listR, "R") }
        </div>
    )
}
