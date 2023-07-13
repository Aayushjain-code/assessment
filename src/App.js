import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import "./styles.css";
import bannerImage from "./assets/banner.png";
import logo from "./assets/logo.png";
import logoWhite from "./assets/dicelogo.png";

export default function App() {
  const [data, setData] = useState(null);
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("10");
  const [rootColor, setRootColor] = useState("");
  const [loading, setLoading] = useState(true);

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://provider.dice.tech/v1/theme/ANTPZ"
        );
        const jsonData = await response.json();
        setData(jsonData);
        setFontFamily(jsonData.font);
        setRootColor(jsonData.color);
        setFontSize(jsonData.fontSize);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function generateCaptcha() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  function handleCaptchaInputChange(event) {
    setUserCaptchaInput(event.target.value);
  }

  function handleCaptchaReload() {
    setCaptcha(generateCaptcha());
  }

  useEffect(() => {
    handleCaptchaReload();
  }, []);

  return (
    <div className="container" style={{ fontFamily: fontFamily }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="image-section">
            <img className="image-banner" src={bannerImage} alt="banner" />
            <img className="logo-top" src={logoWhite} alt="Logo" />
            <h2 className="finance-dashboard">Finance Dashboard</h2>
            <p className="finance-dashboard-text">{data && data.companyName}</p>
          </div>
          <div className="form-section">
            <form className="form">
              <img className="logo-right" src={logo} alt="Logo" />
              <h1 style={{ color: rootColor }}>Login</h1>
              <p style={{ color: rootColor }}>Hello, welcome back!</p>
              <div>
                <label style={{ color: rootColor }}>Email</label>
                <input
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  style={{ fontSize: `${fontSize}px` }}
                />
              </div>
              <div>
                <label style={{ color: rootColor }}>Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  style={{ fontSize: `${fontSize}px` }}
                />
              </div>
              <div className="captcha-container">
                <div className="captcha">
                  <span style={{ color: rootColor }}>{captcha}</span>
                  <button
                    type="button"
                    onClick={handleCaptchaReload}
                    style={{ backgroundColor: rootColor }}
                  >
                    <FiRefreshCcw size={20} />
                  </button>
                  <div>
                    <input
                      type="text"
                      onChange={handleCaptchaInputChange}
                      value={userCaptchaInput}
                      style={{ fontSize: `${fontSize}px` }}
                    />
                  </div>
                </div>
              </div>
              <p className="forgot-password" style={{ color: rootColor }}>
                Forgot Password?
              </p>
              <p
                className="forgot-password-bottom"
                style={{ color: rootColor }}
              >
                use your corporate email
              </p>
              <button
                className="button"
                type="submit"
                style={{ backgroundColor: rootColor }}
              >
                Login
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
