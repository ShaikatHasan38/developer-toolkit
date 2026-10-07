import React, { useState, useEffect } from "react";

export default function App() {
  const [tab, setTab] = useState("token");

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#0f172a",
        color: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* টপ হেডার */}
      <header
        style={{
          padding: "20px",
          background: "#1e293b",
          textAlign: "center",
          borderBottom: "1px solid #334155",
        }}
      >
        <h1 style={{ margin: 0, color: "#38bdf8", fontSize: "22px" }}>
          ⚡ Dev & Security Toolkit
        </h1>
        <p style={{ margin: "5px 0 0", fontSize: "13px", color: "#94a3b8" }}>
          Token Hub • Security Lab
        </p>
      </header>

      {/* নেভিগেশন মেনু */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          padding: "15px",
          background: "#1e293b",
        }}
      >
        <button
          onClick={() => setTab("token")}
          style={tabStyle(tab === "token")}
        >
          🔑 Token Hub
        </button>
        <button
          onClick={() => setTab("security")}
          style={tabStyle(tab === "security")}
        >
          🛡️ Security Lab
        </button>
      </nav>

      {/* মূল কন্টেন্ট এরিয়া */}
      <main
        style={{
          padding: "20px",
          flex: 1,
          maxWidth: "850px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {tab === "token" && <TokenHub />}
        {tab === "security" && <SecurityLab />}
      </main>
    </div>
  );
}

const tabStyle = (active) => ({
  padding: "10px 24px",
  background: active ? "#38bdf8" : "transparent",
  color: active ? "#0f172a" : "#cbd5e1",
  border: active ? "1px solid #38bdf8" : "1px solid #475569",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "13px",
  cursor: "pointer",
});

// --- ১. টোকেন ও ডেটা হাব কম্পোনেন্ট ---
function TokenHub() {
  const [jsonIn, setJsonIn] = useState("");
  const [jsonOut, setJsonOut] = useState("");
  const [jsonErr, setJsonErr] = useState("");
  const [token, setToken] = useState("");
  const [tokenData, setTokenData] = useState(null);
  const [savedTokens, setSavedTokens] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("dev_tokens");
    if (saved) {
      try {
        setSavedTokens(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dev_tokens", JSON.stringify(savedTokens));
  }, [savedTokens]);

  const formatJson = (pretty) => {
    setJsonErr("");
    try {
      if (!jsonIn.trim()) {
        setJsonOut("");
        return;
      }
      const parsed = JSON.parse(jsonIn);
      setJsonOut(
        pretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
      );
    } catch (e) {
      setJsonErr("❌ ভুল JSON সিনট্যাক্স: " + e.message);
      setJsonOut("");
    }
  };

  const decodeJwt = (t) => {
    setToken(t);
    try {
      const parts = t.split(".");
      if (parts.length !== 3) {
        setTokenData({
          error:
            "এটি স্ট্যান্ডার্ড JWT টোকেন নয় (৩টি অংশ প্রয়োজন)। সাধারণ অ্যাক্সেস টোকেন হতে পারে।",
        });
        return;
      }
      const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));
      const header = JSON.parse(decodeURIComponent(escape(atob(parts[0]))));
      setTokenData({ header, payload });
    } catch (e) {
      setTokenData({ error: "টোকেন ডিকোড করা যায়নি। ফরম্যাট সঠিক নয়।" });
    }
  };

  const saveToken = () => {
    if (!token.trim()) return;
    if (!savedTokens.includes(token)) {
      setSavedTokens([token, ...savedTokens]);
    }
  };

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, color: "#e2e8f0", textAlign: "center" }}>
        🔑 Token & Data Hub
      </h2>

      {/* JSON Beautifier */}
      <div style={innerBox}>
        <h3 style={subTitle}>📦 JSON Payload Beautifier & Formatter</h3>
        <textarea
          rows={3}
          value={jsonIn}
          onChange={(e) => setJsonIn(e.target.value)}
          placeholder='{"key": "value"}'
          style={textarea}
        />
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button onClick={() => formatJson(true)} style={btn(false)}>
            Beautify / Format
          </button>
          <button onClick={() => formatJson(false)} style={btn(false)}>
            Minify
          </button>
        </div>
        {jsonErr && (
          <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px" }}>
            {jsonErr}
          </div>
        )}
        {jsonOut && (
          <textarea
            rows={3}
            readOnly
            value={jsonOut}
            style={{
              ...textarea,
              marginTop: "8px",
              background: "#1e293b",
              color: "#38bdf8",
            }}
          />
        )}
      </div>

      {/* JWT & Access Token Inspector */}
      <div style={innerBox}>
        <h3 style={subTitle}>🏷️ Access Token & JWT Inspector</h3>
        <input
          type="text"
          value={token}
          onChange={(e) => decodeJwt(e.target.value)}
          placeholder="JWT বা অ্যাক্সেস টোকেন পেস্ট করুন..."
          style={{ ...textarea, height: "38px", marginBottom: "8px" }}
        />
        <button
          onClick={saveToken}
          style={{
            ...btn(true),
            padding: "6px 14px",
            fontSize: "11px",
            marginBottom: "10px",
          }}
        >
          টোকেন সেভ করুন
        </button>

        {tokenData && (
          <div
            style={{
              background: "#1e293b",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "11px",
              color: "#f8fafc",
              maxHeight: "150px",
              overflowY: "auto",
              border: "1px solid #475569",
            }}
          >
            {tokenData.error ? (
              <span style={{ color: "#f59e0b" }}>{tokenData.error}</span>
            ) : (
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {JSON.stringify(tokenData, null, 2)}
              </pre>
            )}
          </div>
        )}

        {savedTokens.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#94a3b8",
                marginBottom: "5px",
              }}
            >
              সংরক্ষিত টোকেনসমূহ ({savedTokens.length}):
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {savedTokens.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#1e293b",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    border: "1px solid #334155",
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "250px",
                      color: "#94a3b8",
                    }}
                  >
                    {t}
                  </span>
                  <button
                    onClick={() => decodeJwt(t)}
                    style={{
                      background: "#38bdf8",
                      color: "#0f172a",
                      border: "none",
                      borderRadius: "4px",
                      padding: "3px 8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                  >
                    লোড
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ২. সিকিউরিটি ল্যাব কম্পোনেন্ট ---
function SecurityLab() {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [mode, setMode] = useState("b64_enc");

  const handleProcess = (m, text) => {
    setMode(m);
    try {
      if (m === "b64_enc")
        setOutputVal(btoa(unescape(encodeURIComponent(text))));
      else if (m === "b64_dec")
        setOutputVal(decodeURIComponent(escape(atob(text))));
      else if (m === "url_enc") setOutputVal(encodeURIComponent(text));
      else if (m === "url_dec") setOutputVal(decodeURIComponent(text));
    } catch (error) {
      setOutputVal("❌ ত্রুটি: ফরম্যাট সঠিক নয় বা ডিকোড করা যাচ্ছে না!");
    }
  };

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, color: "#e2e8f0", textAlign: "center" }}>
        🛡️ Security Lab & Encoder
      </h2>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "12px",
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        দ্রুত Base64 এবং URL এনকোড/ডিকোড করার টুল।
      </p>

      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            fontSize: "12px",
            color: "#cbd5e1",
            display: "block",
            marginBottom: "5px",
          }}
        >
          ইনপুট ডেটা বা টেক্সট:
        </label>
        <textarea
          rows={3}
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            handleProcess(mode, e.target.value);
          }}
          placeholder="এখানে টেক্সট বা পেলোড লিখুন..."
          style={textarea}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => handleProcess("b64_enc", inputVal)}
          style={actionBtn(mode === "b64_enc")}
        >
          Base64 Encode
        </button>
        <button
          onClick={() => handleProcess("b64_dec", inputVal)}
          style={actionBtn(mode === "b64_dec")}
        >
          Base64 Decode
        </button>
        <button
          onClick={() => handleProcess("url_enc", inputVal)}
          style={actionBtn(mode === "url_enc")}
        >
          URL Encode
        </button>
        <button
          onClick={() => handleProcess("url_dec", inputVal)}
          style={actionBtn(mode === "url_dec")}
        >
          URL Decode
        </button>
      </div>

      <div>
        <label
          style={{
            fontSize: "12px",
            color: "#cbd5e1",
            display: "block",
            marginBottom: "5px",
          }}
        >
          আউটপুট রেজাল্ট:
        </label>
        <textarea
          rows={3}
          readOnly
          value={outputVal}
          style={{ ...textarea, background: "#0f172a", color: "#38bdf8" }}
        />
      </div>
    </div>
  );
}

const card = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
  border: "1px solid #334155",
};
const innerBox = {
  background: "#0f172a",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #334155",
  marginBottom: "20px",
};
const subTitle = { color: "#38bdf8", fontSize: "13px", marginTop: 0 };
const textarea = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "#f8fafc",
  fontSize: "12px",
  boxSizing: "border-box",
  outline: "none",
};
const btn = (primary) => ({
  padding: "8px 14px",
  background: primary ? "#38bdf8" : "#334155",
  color: primary ? "#0f172a" : "#f8fafc",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "12px",
  cursor: "pointer",
});
const actionBtn = (active) => ({
  flex: 1,
  padding: "8px",
  background: active ? "#38bdf8" : "#334155",
  color: active ? "#0f172a" : "#f8fafc",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "11px",
  cursor: "pointer",
});
