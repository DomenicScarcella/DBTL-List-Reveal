import "./all.css";
import { ListModular } from "./ListModular";

function App() {

  return (
    <div style={{ backgroundColor: "#f0f0f0", height: "99vh" }}>

      <div className="head-logo-modular">
        <h1><span style={{ color: "darkblue" }}>#DontBuryTheLead</span></h1>
        <h1><span style={{ color: "darkred" }}>PREVIEW:</span></h1>
      </div>

      <ListModular />
      
      <div className="head-logo-modular">
        <h1><span style={{ fontStyle: "italic", fontSize: "8.8vh", textShadow: "0 0 1rem gold", border: "",position: "absolute", bottom: "7vh", left: "2vw" }}>Top 5 Matches We Want To See</span></h1>
      </div>

    </div>
  )
}

export default App