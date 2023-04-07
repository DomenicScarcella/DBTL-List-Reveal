import { useState } from "react";
import spotlight from "./art/spotlight.png";
import wmlogo from "./art/wmlogo.png";
import { listL } from "./dataJohn.js";
import { listR } from "./dataDom.js";
import "./all.css";

export function ListModular() {
    const [active, setActive] = useState("WrestleMania 39 logo");
    const [matchImage, setMatchImage] = useState(wmlogo);
    const [dummy, setDummy] = useState("");

    function ListSingle(arr, L_R) {
        return (
            <div className="single-list">
                <h2 className="list-name">{arr[0][0]}</h2>
                {arr.slice(1, arr.length).map(item => {
                    const i = arr.indexOf(item).toString();
                    return (
                        <button 
                            className={"list-item " + item[2]}
                            onClick={() => {
                                if (item[2] == "hide") {
                                    item[2] = "unhide";
                                    setDummy(i.concat(L_R == "L" ? "a" : "z"));
                                    if (matchImage != item[1]) { setMatchImage(item[1]) };
                                    setActive(item[0]);
                                } else {
                                    item[2] = "hide";
                                    setDummy(i.concat(L_R == "L" ? "b" : "y"));
                                    if (matchImage == item[1]) { setMatchImage(wmlogo); setActive("WrestleMania 39 logo") }
                                }
                            }}
                            id={ (String(active).valueOf() == String(item[0]).valueOf())
                                && (item[2] == "unhide")
                                ? ((L_R == "L") ? "active-left" : "active-right")
                                : "" }
                        >
                            {i}. {item[0]}
                        </button>
                    )
                }) }
            </div>
        )
    }
    
    return (
        <div className="list-modular">
            { ListSingle(listL, "L") }
            <div className="featured-match">
                { matchImage == wmlogo && dummy.length >= 0
                    ? <img id="null-image" src={matchImage} alt="Small graphic of WrestleMania 39 logo" label="awaiting match graphic" />
                    : <img id="featured-image" src={matchImage} alt={"WWE graphic featuring ".concat(active)} label="main image on page" onClick={() => { setMatchImage(wmlogo); setActive("WrestleMania 39 logo") }}  />
                }
                <img id="spotlight" src={spotlight} alt="A pair of hanging spotlights shining on the main image" />
            </div>
            { ListSingle(listR, "R") }            
        </div>
    )
}
