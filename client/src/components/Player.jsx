import React from "react";

const playerCardStyle = {
  background: "rgba(255,255,255,0.85)",
  borderRadius: "18px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
  padding: "2.5rem 2rem",
  margin: "24px",
  maxWidth: "340px",
  minWidth: "260px",
  textAlign: "center",
  transition: "transform 0.22s cubic-bezier(.4,2,.3,1)",
  fontFamily: "Heebo, Segoe UI, sans-serif",
  border: "1px solid #e0e7ff",
  backdropFilter: "blur(3px)",
  cursor: "pointer",
  position: "relative"
};

const playerCardHover = {
  transform: "scale(1.04) translateY(-10px)",
  boxShadow: "0 16px 32px 0 rgba(31, 38, 135, 0.21)"
};

const titleStyle = {
  fontSize: "1.5rem",
  fontWeight: 800,
  color: "#374151",
  marginBottom: "20px",
  letterSpacing: "1.2px"
};

const dataRow = {
  fontSize: "1.09rem",
  color: "#4B5563",
  margin: "10px 0",
  borderBottom: "1px solid #ececec",
  paddingBottom: "5px"
};

const badgeActive = {
  display: "inline-block",
  background: "linear-gradient(90deg,#7ed957 30%,#51eaea 100%)",
  color: "#232323",
  borderRadius: "12px",
  fontWeight: 700,
  padding: "3px 15px",
  margin: "10px 0 0 0",
  fontSize: "1rem"
};

const badgeInactive = {
  ...badgeActive,
  background: "linear-gradient(90deg,#ffb067 30%,#ff6868 100%)",
  color: "#fff"
};

export default function Player({ name, start, end, current, active, steps, number, onMove, disabled }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div /* style וכו' */>
    <div>{name}</div>
    <div>מספר נוכחי: {current}</div>
    <div>התחלה: {start} | יעד: {end}</div>
    <div>צעדים: {steps}</div>
    <div>
        {["-1", "+1", "*2", "/2"].map(action => (
            <button
                key={action}
                onClick={() => onMove(action)}
                disabled={disabled}
                style={{
                    margin: "0 4px",
                    opacity: disabled ? 0.4 : 1,
                    fontWeight: 700
                }}
            >
                {action}
            </button>
        ))}
    </div>
    {!active && <div style={{color: "#888"}}>לא תורך</div>}
</div>
  );
}