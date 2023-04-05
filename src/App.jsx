import { useState } from "react";
import wmlogo from "./art/wmlogo.png";
import { ListModular } from "./ListModular";
import "./all.css";

export function App() {

  const [openingScreenVisible, setOpeningScreenVisible] = useState(true);

  return (
    <div style={{ backgroundColor: "#f0f0f0", height: "99vh" }}>

      <div className="head-logo-modular">
        <h1><span style={{ color: "darkblue" }}>#DontBuryTheLead</span></h1>
        <h1><span style={{ color: "darkred" }}>PREVIEW:</span></h1>
      </div>

      <div>
        { openingScreenVisible
          ?
          <div className="open-modular">
              <img id="open-logo" src={wmlogo} onClick={() => { setOpeningScreenVisible(false) }} />
          </div>
          : <ListModular />
        }
      </div>
      
      <div className="head-logo-modular">
        <h1><span style={{ fontStyle: "italic", fontSize: "8.8vh", textShadow: "0 0 1rem gold", border: "",position: "absolute", bottom: "7vh", left: "2vw" }}>Top 5 Matches We Want To See</span></h1>
      </div>

    </div>
  )
}
