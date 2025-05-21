import React from "react";

const boardStyle = {
  background: "rgba(255,255,255,0.92)",
  borderRadius: "20px",
  padding: "2rem",
  margin: "1.2rem",
  boxShadow: "0 4px 16px #bdbaff70",
  minWidth: "220px",
  textAlign: "center",
  fontFamily: "Heebo, Segoe UI, sans-serif",
  position: "relative"
};

const activeStyle = {
  boxShadow: "0 0 20px 4px #8cffed77",
  border: "2px solid #7ed957"
};

const buttonGroup = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "18px",
  gap: "10px"
};

const btn = {
  flex: 1,
  fontWeight: 900,
  fontSize: "1.19rem",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(90deg,#7ed957 40%,#51eaea 100%)",
  color: "#232323",
  boxShadow: "0 2px 8px #b2ffe344",
  transition: "background 0.19s, transform 0.13s"
};

const inactiveBtn = {
  ...btn,
  background: "linear-gradient(90deg,#e0e0e0 40%,#ececec 100%)",
  color: "#b1b1b1",
  cursor: "not-allowed"
};

export default function GameBoard({ player, onMove, disabled }) {
  return (
    <div style={{ ...boardStyle, ...(player.active ? activeStyle : {}) }}>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>
        {player.name}
      </div>
      <div style={{ fontSize: "2.2rem", fontWeight: 900, margin: "14px 0" }}>
        {player.current}
      </div>
      <div>
        <span>התחלה: {player.start} | יעד: {player.end}</span>
      </div>
      <div style={{ margin: "14px 0", fontWeight: 700 }}>צעדים: {player.steps}</div>
      <div style={buttonGroup}>
        {["-1", "+1", "*2", "/2"].map(action => (
          <button
            key={action}
            style={player.active && !disabled ? btn : inactiveBtn}
            disabled={!player.active || disabled}
            onClick={() => onMove(action)}
          >
            {action}
          </button>
        ))}
      </div>
      {!player.active && (
        <div style={{ marginTop: "9px", color: "#7b7b7b", fontSize: "0.99rem" }}>
          לא תורך
        </div>
      )}
    </div>
  );
}