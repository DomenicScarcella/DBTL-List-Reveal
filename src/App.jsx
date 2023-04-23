import { useState } from "react";
import wmlogo from "./art/wmlogo.png";
import { ListModular } from "./ListModular";
import "./App.css";

export function App() {
  const [openingScreenVisible, setOpeningScreenVisible] = useState(true);

  return (
    <div style={{ backgroundColor: "#efefef", height: "99vh" }}>
      <div className="header">
        <h1 style={{ color: "#00008f" }}>#DontBuryTheLead</h1>
        <h1 style={{ color: "#8f0000" }}>PREVIEW:</h1>
      </div>
      <div>
        { 
          openingScreenVisible
          ?
          <div className="open-modular">
              <img 
                id="open-logo"
                src={wmlogo} 
                alt="Large graphic of WrestleMania 39 logo" 
                label="Click this logo to bring up lists" 
                onClick={() => { setOpeningScreenVisible(false) }}
              />
          </div>
          : <ListModular />
        }
      </div>
      <div className="footer">
        <h1>Top 5 Matches We Want To See</h1>
      </div>
    </div>
  )
}
