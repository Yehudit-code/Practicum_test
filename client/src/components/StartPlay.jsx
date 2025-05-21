import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(120deg, #d8eafe 0%, #e0c3fc 100%)",
  fontFamily: "Heebo, Segoe UI, sans-serif"
};

const cardStyle = {
  background: "rgba(255,255,255,0.9)",
  borderRadius: "22px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
  padding: "2.5rem 2.5rem 2rem 2.5rem",
  minWidth: "320px",
  maxWidth: "95vw",
  textAlign: "center",
  border: "1px solid #e0e7ff",
  backdropFilter: "blur(2px)"
};

const inputStyle = {
  width: "85%",
  padding: "12px",
  fontSize: "1.1rem",
  margin: "14px 0",
  borderRadius: "14px",
  border: "1px solid #cfd8dc",
  outline: "none",
  background: "#f7faff",
  transition: "border 0.2s",
  fontFamily: "inherit"
};

const buttonStyle = {
  width: "92%",
  padding: "13px",
  margin: "16px 0 0 0",
  fontSize: "1.17rem",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(90deg,#7ed957 40%,#51eaea 100%)",
  color: "#232323",
  fontWeight: 800,
  cursor: "pointer",
  boxShadow: "0 2px 8px #b2ffe388",
  letterSpacing: "1px",
  transition: "background 0.19s, transform 0.13s"
};

const disabledButton = {
  ...buttonStyle,
  background: "linear-gradient(90deg,#d3d3d3 40%,#ececec 100%)",
  color: "#a1a1a1",
  cursor: "not-allowed",
  boxShadow: "none"
};

const labelStyle = {
  fontWeight: 700,
  fontSize: "1.04rem",
  color: "#374151",
  marginTop: "12px"
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: 900,
  color: "#23223b",
  margin: "0 0 18px 0",
  letterSpacing: "1.5px",
  textShadow: "0 2px 8px #d2d2ff33"
};

const errorStyle = {
  color: "#ff6868",
  fontWeight: 600,
  marginTop: "7px"
};

export default function StartPlay() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // שליחת השמות לשרת
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if ((currentStep === 1 && !name1.trim()) || (currentStep === 2 && !name2.trim())) {
      setError("נא למלא שם חוקי");
      return;
    }
    setLoading(true);
    try {
      if (currentStep === 1) {
        setCurrentStep(2);
        setLoading(false);
      } else {
        // שליחת שני השמות לשרת
        const res = await axios.post('http://localhost:4321/api/play', { name1: name1.trim(), name2: name2.trim() })
        if (!res) throw new Error("אירעה שגיאה בשרת");
        // מעבר למסך הבית
        // navigate("/home");
        navigate("/home", { state: res.data });
      }
    } catch (err) {
      setError("שגיאה בשליחת הנתונים, נסה שוב.");
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form style={cardStyle} onSubmit={handleSubmit} dir="rtl" autoComplete="off">
        <div style={titleStyle}>התחילי משחק חדש</div>

        {currentStep === 1 && (
          <>
            <label style={labelStyle} htmlFor="name1">שם שחקנית ראשונה:</label>
            <input
              style={inputStyle}
              id="name1"
              type="text"
              placeholder="הקלידי שם..."
              value={name1}
              disabled={loading}
              onChange={e => setName1(e.target.value)}
              autoFocus
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <label style={labelStyle} htmlFor="name2">שם שחקנית שנייה:</label>
            <input
              style={inputStyle}
              id="name2"
              type="text"
              placeholder="הקלידי שם..."
              value={name2}
              disabled={loading}
              onChange={e => setName2(e.target.value)}
              autoFocus
            />
          </>
        )}

        {error && <div style={errorStyle}>{error}</div>}

        <button
          type="submit"
          style={
            (currentStep === 1 && !name1.trim()) ||
            (currentStep === 2 && !name2.trim()) ||
            loading
              ? disabledButton
              : buttonStyle
          }
          disabled={
            (currentStep === 1 && !name1.trim()) ||
            (currentStep === 2 && !name2.trim()) ||
            loading
          }
        >
          {loading
            ? "שולחת..."
            : currentStep === 1
              ? "המשיכי לשחקנית שנייה"
              : "התחילי משחק!"}
        </button>
      </form>
    </div>
  );
}