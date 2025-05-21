import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Player from "./Player";

const bgStyle = {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(120deg, #d8eafe 0%, #e0c3fc 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
};

const playersContainer = {
    display: "flex",
    flexDirection: "row",
    gap: "32px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "40px",
};

const headingStyle = {
    fontFamily: "Heebo, Segoe UI, sans-serif",
    fontWeight: 900,
    fontSize: "2.1rem",
    color: "#333",
    letterSpacing: "2px",
    margin: "32px 0 0 0",
    textShadow: "0 2px 8px #d2d2ff66"
};

const winMsgStyle = {
    fontSize: "2rem",
    color: "#7ed957",
    fontWeight: 900,
    marginTop: "24px"
};

const Home = () => {
    const location = useLocation();
    const [players, setPlayers] = useState(location.state?.players);
    const playId = location.state?.game?._id;
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(false);

    // הגנה על טעינת הדף מחדש
    if (!players || !players.player1 || !players.player2) {
        return <div>לא התקבלו נתונים</div>;
    }

    // פונקציה לביצוע מהלך
    const handleMove = async (action, playerKey) => {
        if (loading || winner) return;
        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:4321/api/play/${playId}/move`, {
                player: playerKey, // 'player1' או 'player2'
                action
            });

            setPlayers(res.data.players);
            if (res.data.winner) setWinner(res.data.winner);
        } catch (err) {
            alert("שגיאה בביצוע מהלך");
        }
        setLoading(false);
    };

    return (
        <div style={bgStyle}>
            <div style={playersContainer}>
                <Player
                    {...players.player1}
                    number={1}
                    onMove={action => handleMove(action, "player1")}
                    disabled={!players.player1.active || loading || !!winner}
                />
                <Player
                    {...players.player2}
                    number={2}
                    onMove={action => handleMove(action, "player2")}
                    disabled={!players.player2.active || loading || !!winner}
                />
            </div>
            <h1 style={headingStyle}>ברוכות הבאות למשחק!</h1>
            {winner && (
                <div style={winMsgStyle}>{winner} ניצחה!</div>
            )}
        </div>
    );
};

export default Home;