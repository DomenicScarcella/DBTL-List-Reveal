import { useState } from "react";
import spotlight from "./art/spotlight.png";
import wmlogo from "./art/wmlogo.png";
import { listL } from "./dataJohn.js";
import { listR } from "./dataDom.js";
import "./ListModular.css";

export function ListModular() {
    const [active, setActive] = useState("WrestleMania 39 logo");
    const [matchImage, setMatchImage] = useState(wmlogo);
    const [lastClick, setLastClick] = useState("");

    const clearFeaturedMatch = () => {
        setMatchImage(wmlogo);
        setActive("WrestleMania 39 logo")
    }

    const newFeaturedMatch = (pix, title) => {
        setMatchImage(pix);
        setActive(title)
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
                                className={"list-item " + L_R + " " + item.vis}
                                onClick={() => {
                                    if (item.vis == "hide") {
                                        item.vis = "unhide";
                                        if (matchImage != item.pix) {
                                            newFeaturedMatch(item.pix, item.title)
                                        }
                                    } else {
                                        item.vis = "hide";
                                        if (matchImage == item.pix) {
                                            clearFeaturedMatch()
                                        }
                                    }
                                    setLastClick(L_R + i + "_" + item.vis);
                                }}
                                id={
                                    (active == item.title) && (item.vis == "unhide")
                                    ? "active-match-" + L_R
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
                <img
                    className={"featured-image " + lastClick}
                    id={(matchImage == wmlogo) ? "no-shadow" : ""}
                    src={matchImage}
                    alt={"WWE graphic featuring " + active}
                    onClick={() => {
                        clearFeaturedMatch();
                        setLastClick("matchImage reset")
                    }}                
                />
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
