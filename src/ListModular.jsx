import { useState } from "react";
import spotlight from "./art/spotlight.png";
import { listL } from "./dataJohn.js";
import { listR } from "./dataDom.js";
import "./ListModular.css";

export function ListModular() {
    const [active, setActive] = useState("Small graphic of WrestleMania 39 logo");
    const [matchImage, setMatchImage] = useState(null);
    const [lastClick, setLastClick] = useState("");

    const clearFeaturedMatch = () => {
        setMatchImage(null); setActive("Small graphic of WrestleMania 39 logo")
    }

    const newFeaturedMatch = (p, t) => {
        setMatchImage(p); setActive(t)
    }

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
                                className={"list-item " + L_R + " " + item.vis + " " + L_R+i}
                                onClick={() => {
                                    if (item.vis == "hide") {
                                        item.vis = "unhide";
                                        if (matchImage != item.pix) { newFeaturedMatch(item.pix, item.title) }
                                    } else {
                                        item.vis = "hide";
                                        if (matchImage == item.pix) { clearFeaturedMatch() }
                                    }
                                    setLastClick(L_R + i + "_" + item.vis);
                                }}
                                id={
                                    (String(active).valueOf() == String(item.title).valueOf())
                                    && (item.vis == "unhide")
                                    ? ((L_R == "L") ? "active-match-L" : "active-match-R")
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

    function FeaturedMatch() {
        return (
            <div className="featured-match">
                {
                    matchImage == null 
                    ? <img id="null-image" />
                    : <img
                        className={lastClick} 
                        id="featured-image" 
                        src={matchImage} 
                        alt={"WWE graphic featuring " + active} 
                        onClick={() => {
                            clearFeaturedMatch();
                            setLastClick("matchImage reset")
                        }}
                    />
                }
                <img 
                    id="spotlight"
                    src={spotlight}
                    alt="A pair of hanging spotlights shining on the main image area in the center of the screen"
                />
            </div>
        )
    }
    
    return (
        <div className="list-modular">
            { ListSingle(listL, "L") }
            { FeaturedMatch() }
            { ListSingle(listR, "R") }
        </div>
    )
}
