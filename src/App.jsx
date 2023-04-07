import { useState } from "react";
import wmlogo from "./art/wmlogo.png";
import { ListModular } from "./ListModular";
import "./all.css";

export function App() {

  const [openingScreenVisible, setOpeningScreenVisible] = useState(true);

  return (
    <div style={{ backgroundColor: "#efefef", height: "99vh" }} alt="The List Reveal App!" >

      <div className="head-logo-modular">
        <h1><span style={{ color: "#00008f" }}>#DontBuryTheLead</span></h1>
        <h1><span style={{ color: "#8f0000" }}>PREVIEW:</span></h1>
      </div>

      <div>
        { 
          openingScreenVisible
          ?
          <div className="open-modular">
              <img id="open-logo" src={wmlogo} alt="Large graphic of WrestleMania 39 logo" label="Click this logo to bring up lists" onClick={() => { setOpeningScreenVisible(false) }} />
          </div>
          : <ListModular />
        }
      </div>
      
      <div className="head-logo-modular">
        <h1><span style={{ fontStyle: "italic", fontSize: "8.8vh", textShadow: "0 0 1rem #ffd700", position: "absolute", bottom: "7vh", left: "2vw" }}>Top 5 Matches We Want To See</span></h1>
      </div>

    </div>
  )
}
