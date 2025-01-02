
import "./App.css";
import GameBoard from "../GameBoard/gameboard.component";
import deck from "../assets/deck.png";
import p1 from "../assets/profile/P1.png";
import R1 from "../assets/red/R1.png"
import alter from "../assets/power/ALTER.png"
import g2 from "../assets/green/G2.png"
function App() {
  const inputData = [
    { value: 7, color: 'R' },
    { value: 2, color: 'B' },
    { value: 4, color: 'G' },
    { value: 1, color: 'R' },
    { value: 8, color: 'G' },
    { value: 3, color: 'B' },
    { value: 0, color: 'R' },
    { value: 5, color: 'G' },
    { value: 9, color: 'B' },
    { value: 6, color: 'R' },
    { value: 2, color: 'G' },
    { value: 7, color: 'B' },
    { value: 4, color: 'R' },
    { value: 1, color: 'G' },
    { value: 8, color: 'B' },
    { value: 3, color: 'R' },
    { value: 0, color: 'G' },
    { value: 5, color: 'B' },
    { value: 9, color: 'R' },
    { value: 6, color: 'G' },
    { value: 2, color: 'R' },
    { value: 7, color: 'G' },
    { value: 4, color: 'B' },
    { value: 1, color: 'R' },
    { value: 8, color: 'G' },
    { value: 3, color: 'B' },
    { value: 0, color: 'R' },
    { value: 5, color: 'G' },
    { value: 9, color: 'B' },
    { value: 6, color: 'R' },
    { value: 2, color: 'G' },
    { value: 7, color: 'B' },
    { value: 4, color: 'R' },
    { value: 1, color: 'G' },
    { value: 8, color: 'B' },
    { value: 3, color: 'R' },
    { value: 0, color: 'G' },
    { value: 5, color: 'B' },
    { value: 9, color: 'R' },
    { value: 6, color: 'G' },
    { value: 2, color: 'B' },
    { value: 7, color: 'G' },
    { value: 4, color: 'B' },
    { value: 1, color: 'R' },
    { value: 8, color: 'G' },
    { value: 3, color: 'B' },
    { value: 0, color: 'R' },
    { value: 5, color: 'G' },
    { value: 9, color: 'B' },
    { value: 6, color: 'R' },
    { value: 2, color: 'G' },
    { value: 7, color: 'B' },
    { value: 4, color: 'R' },
    { value: 1, color: 'G' },
    { value: 8, color: 'B' },
    { value: 3, color: 'R' },
    { value: 0, color: 'G' },
    { value: 5, color: 'B' },
    { value: 9, color: 'R' },
    { value: 6, color: 'G' }
];
  
  return (
 
    <div className="play-area">
   
    <div className="Game-Board"><GameBoard inputData={inputData} /></div>

    
    <div className="Player Player1"> <img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />
        player 1</div>
    <div className="Player Player2"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 2</div>
    <div className="Player Player3"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 3</div>
    <div className="Player Player4"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 4</div>
    <div className="Player Player5"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 5</div>
    <div className="Player Player6"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 6</div>
    <div className="Player Player7"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 7</div>
    <div className="Player Player8"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 8</div>
    <div className="Player Player9"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 9</div>
    <div className="Player Player10"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 10</div>
    <div className="Player Player11"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 11</div>
    <div className="Player Player12"><img 
          src={p1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer'
          }}
        />Player 12</div>

   
    <div className="Deck"> <img 
          src={deck}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '80px',
            height: '120px',
            cursor: 'pointer'
          }}
        /></div>

   
    <div className="Played-Cards"> <img 
          src={g2}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '120px',
            height: '180px',
            cursor: 'pointer'
          }}
        /></div>

   
    <div className="Claim-Button">Claim</div>

   
    <div className="Timer">Timer</div>


    <div className="Player-Cards">
    <img 
          src={R1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '120px',
            height: '180px',
            cursor: 'pointer'
          }}
        />
        <img 
          src={alter}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '120px',
            height: '180px',
            cursor: 'pointer'
          }}
        />
         <img 
          src={R1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '120px',
            height: '180px',
            cursor: 'pointer'
          }}
        />
        <img 
          src={alter}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '120px',
            height: '180px',
            cursor: 'pointer'
          }}
        /> <img 
        src={R1}
        alt="Pick a card"
        onClick={()=> console.log("pick up card.")}
        style={{
          width: '120px',
          height: '180px',
          cursor: 'pointer'
        }}
      />
      <img 
        src={alter}
        alt="Pick a card"
        onClick={()=> console.log("pick up card.")}
        style={{
          width: '120px',
          height: '180px',
          cursor: 'pointer'
        }}
      />
       <img 
          src={R1}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '120px',
            height: '180px',
            cursor: 'pointer'
          }}
        />
        <img 
          src={alter}
          alt="Pick a card"
          onClick={()=> console.log("pick up card.")}
          style={{
            width: '120px',
            height: '180px',
            cursor: 'pointer'
          }}
        />
    </div>
</div>

  );
}

export default App;
