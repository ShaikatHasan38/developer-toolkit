import React, { useState, useEffect } from "react";

export default function App() {
  const [tab, setTab] = useState("report");

  return (
    <div style={{ fontFamily: "sans-serif", background: "#0f172a", color: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* টপ হেডার */}
      <header style={{ padding: "20px", background: "#1e293b", textAlign: "center", borderBottom: "1px solid #334155" }}>
        <h1 style={{ margin: 0, color: "#38bdf8", fontSize: "22px" }}>⚡ Dev & Security Toolkit</h1>
        <p style={{ margin: "5px 0 0", fontSize: "13px", color: "#94a3b8" }}>All-in-One Developer & Creator Workspace</p>
      </header>

      {/* নেভিগেশন মেনু */}
      <nav style={{ display: "flex", justifyContent: "center", gap: "10px", padding: "15px", background: "#1e293b", flexWrap: "wrap" }}>
        <button onClick={() => setTab("report")} style={tabStyle(tab === "report")}>🛠️ FB Report Assistant</button>
        <button onClick={() => setTab("token")} style={tabStyle(tab === "token")}>🔑 Token Hub</button>
        <button onClick={() => setTab("security")} style={tabStyle(tab === "security")}>🛡️ Security Lab (2FA)</button>
      </nav>

      {/* মূল কন্টেন্ট এরিয়া */}
      <main style={{ padding: "20px", flex: 1, maxWidth: "850px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        {tab === "report" && <ReportAssistant />}
        {tab === "token" && <TokenHub />}
        {tab === "security" && <SecurityLab />}
      </main>
    </div>
  );
}

const tabStyle = (active: boolean) => ({
  padding: "10px 20px",
  background: active ? "#38bdf8" : "transparent",
  color: active ? "#0f172a" : "#cbd5e1",
  border: active ? "1px solid #38bdf8" : "1px solid #475569",
  borderRadius: "6px",
  fontWeight: "bold" as const,
  fontSize: "13px",
  cursor: "pointer",
});

// --- ১. ফেসবুক রিপোর্ট অ্যাসিস্ট্যান্ট (Payload & Workflow) ---
function ReportAssistant() {
  const [targetId, setTargetId] = useState("");
  const [reportType, setReportType] = useState("disabled_appeal");
  const [description, setDescription] = useState("");
  const [generatedPayload, setGeneratedPayload] = useState("");

  const [tasks, setTasks] = useState([
    { id: 1, text: "Verify Access Token Status & Permissions", done: false },
    { id: 2, text: "Analyze Restricted/Disabled Endpoint", done: false },
    { id: 3, text: "Generate Custom Appeal Payload (JSON)", done: false },
    { id: 4, text: "Test 2FA Bypass Logic & Encodings", done: false },
    { id: 5, text: "Submit Graph API Request via Custom Script", done: false }
  ]);

  const handleGenerate = () => {
    const payload = {
      target_account_id: targetId,
      request_category: reportType,
      appeal_context: description,
      timestamp: new Date().toISOString(),
      client_environment: "developer-toolkit-v1",
      security_flags: {
        bypass_2fa_loop: true,
        force_manual_review: true
      }
    };
    setGeneratedPayload(JSON.stringify(payload, null, 2));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, color: "#e2e8f0", textAlign: "center" }}>🛠️ FB Report & Appeal Assistant</h2>
      
      {/* Auto Payload Generator */}
      <div style={innerBox}>
        <h3 style={subTitle}>⚙️ Automated Payload Generator</h3>
        <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: 0 }}>আপিল, বাগ বা রিকভারি রিকোয়েস্টের জন্য ডায়নামিক JSON পেলোড তৈরি করুন।</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
          <input type="text" value={targetId} onChange={(e) => setTargetId(e.target.value)} placeholder="Target Account ID / Profile URL" style={inputStyle} />
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={inputStyle}>
            <option value="disabled_appeal">Disabled Account Appeal</option>
            <option value="locked_profile_recovery">Locked Profile Recovery</option>
            <option value="2fa_loop_bypass">2FA Loop Bypass Request</option>
            <option value="impersonation_report">Impersonation Takedown</option>
          </select>
          <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Custom Message / Exploit Description..." style={textarea} />
          
          <button onClick={handleGenerate} style={{ ...btn(true), width: "100%", padding: "10px" }}>Generate API Payload</button>
        </div>

        {generatedPayload && (
          <div style={{ marginTop: "15px" }}>
            <textarea rows={6} readOnly value={generatedPayload} style={{ ...textarea, background: "#1e293b", color: "#22c55e", fontFamily: "monospace" }} />
          </div>
        )}
      </div>

      {/* Recovery Workflow Tracker */}
      <div style={innerBox}>
        <h3 style={subTitle}>📋 Account Recovery Workflow Tracker</h3>
        <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: 0 }}>কাস্টম কোডিং বা সিস্টেম লজিক প্রয়োগের ধাপে ধাপে চেকলিস্ট।</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px", textAlign: "left" }}>
          {tasks.map(task => (
            <label key={task.id} style={{ display: "flex", alignItems: "center", gap: "10px", color: task.done ? "#64748b" : "#cbd5e1", fontSize: "13px", cursor: "pointer", textDecoration: task.done ? "line-through" : "none" }}>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} style={{ accentColor: "#38bdf8", width: "16px", height: "16px" }} />
              {task.text}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ২. টোকেন হাব (Access Token Manager) ---
function TokenHub() {
  const [jsonIn, setJsonIn] = useState("");
  const [jsonOut, setJsonOut] = useState("");
  const [jsonErr, setJsonErr] = useState("");
  const [token, setToken] = useState("");
  const [tokenData, setTokenData] = useState<any>(null);
  const [savedTokens, setSavedTokens] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("dev_tokens");
    if (saved) {
      try { setSavedTokens(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dev_tokens", JSON.stringify(savedTokens));
  }, [savedTokens]);

  const formatJson = (pretty: boolean) => {
    setJsonErr("");
    try {
      if (!jsonIn.trim()) { setJsonOut(""); return; }
      const parsed = JSON.parse(jsonIn);
      setJsonOut(pretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
    } catch (e: any) {
      setJsonErr("❌ ভুল JSON সিনট্যাক্স: " + e.message);
      setJsonOut("");
    }
  };

  const decodeJwt = (t: string) => {
    setToken(t);
    try {
      const parts = t.split(".");
      if (parts.length !== 3) {
        setTokenData({ error: "এটি স্ট্যান্ডার্ড JWT নয়। এটি ফেসবুক সেশন বা গ্রাফ এপিআই অ্যাক্সেস টোকেন হতে পারে।" });
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
      <h2 style={{ marginTop: 0, color: "#e2e8f0", textAlign: "center" }}>🔑 Access Token & Data Hub</h2>
      
      {/* JWT & Access Token Inspector */}
      <div style={innerBox}>
        <h3 style={subTitle}>🏷️ Token Validator & Manager</h3>
        <input type="text" value={token} onChange={(e) => decodeJwt(e.target.value)} placeholder="অ্যাক্সেস টোকেন বা সেশন কি পেস্ট করুন..." style={{ ...inputStyle, marginBottom: "8px" }} />
        <button onClick={saveToken} style={{ ...btn(true), padding: "6px 14px", fontSize: "11px", marginBottom: "10px" }}>টোকেন সেভ করুন</button>

        {tokenData && (
          <div style={{ background: "#1e293b", padding: "10px", borderRadius: "6px", fontSize: "11px", color: "#f8fafc", maxHeight: "150px", overflowY: "auto", border: "1px solid #475569" }}>
            {tokenData.error ? <span style={{ color: "#f59e0b" }}>{tokenData.error}</span> : <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{JSON.stringify(tokenData, null, 2)}</pre>}
          </div>
        )}

        {savedTokens.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8", marginBottom: "5px" }}>সংরক্ষিত টোকেনসমূহ ({savedTokens.length}):</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {savedTokens.map((t, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", border: "1px solid #334155" }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "250px", color: "#94a3b8" }}>{t}</span>
                  <button onClick={() => decodeJwt(t)} style={{ background: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontWeight: "bold", fontSize: "10px" }}>লোড</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* JSON Formatter */}
      <div style={innerBox}>
        <h3 style={subTitle}>📦 API Payload Formatter</h3>
        <textarea rows={3} value={jsonIn} onChange={(e) => setJsonIn(e.target.value)} placeholder='{"data": "raw_response"}' style={textarea} />
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button onClick={() => formatJson(true)} style={btn(false)}>Format</button>
          <button onClick={() => formatJson(false)} style={btn(false)}>Minify</button>
        </div>
        {jsonErr && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px" }}>{jsonErr}</div>}
        {jsonOut && <textarea rows={3} readOnly value={jsonOut} style={{ ...textarea, marginTop: "8px", background: "#1e293b", color: "#38bdf8" }} />}
      </div>
    </div>
  );
}

// --- ৩. সিকিউরিটি ল্যাব (2FA Testing & Encoders) ---
function SecurityLab() {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [mode, setMode] = useState("b64_enc");

  const handleProcess = (m: string, text: string) => {
    setMode(m);
    try {
      if (m === "b64_enc") setOutputVal(btoa(unescape(encodeURIComponent(text))));
      else if (m === "b64_dec") setOutputVal(decodeURIComponent(escape(atob(text))));
      else if (m === "url_enc") setOutputVal(encodeURIComponent(text));
      else if (m === "url_dec") setOutputVal(decodeURIComponent(text));
    } catch (error) {
      setOutputVal("❌ ত্রুটি: ফরম্যাট সঠিক নয় বা ডিকোড করা যাচ্ছে না!");
    }
  };

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, color: "#e2e8f0", textAlign: "center" }}>🛡️ Security Lab & 2FA Tools</h2>
      <p style={{ color: "#94a3b8", fontSize: "12px", textAlign: "center", marginBottom: "15px" }}>2FA বাইপাস লজিক টেস্টিং এবং পেলোড এনকোড/ডিকোড করার টুল।</p>
      
      <div style={{ marginBottom: "12px" }}>
        <textarea rows={4} value={inputVal} onChange={(e) => { setInputVal(e.target.value); handleProcess(mode, e.target.value); }} placeholder="এখানে পেলোড বা 2FA কি (Key) ইনপুট দিন..." style={textarea} />
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "15px" }}>
        <button onClick={() => handleProcess("b64_enc", inputVal)} style={actionBtn(mode === "b64_enc")}>B64 Encode</button>
        <button onClick={() => handleProcess("b64_dec", inputVal)} style={actionBtn(mode === "b64_dec")}>B64 Decode</button>
        <button onClick={() => handleProcess("url_enc", inputVal)} style={actionBtn(mode === "url_enc")}>URL Encode</button>
        <button onClick={() => handleProcess("url_dec", inputVal)} style={actionBtn(mode === "url_dec")}>URL Decode</button>
      </div>

      <div>
        <label style={{ fontSize: "12px", color: "#cbd5e1", display: "block", marginBottom: "5px" }}>প্রসেসড রেজাল্ট:</label>
        <textarea rows={4} readOnly value={outputVal} style={{ ...textarea, background: "#0f172a", color: "#38bdf8" }} />
      </div>
    </div>
  );
}

const card = { background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155" };
const innerBox = { background: "#0f172a", padding: "15px", borderRadius: "8px", border: "1px solid #334155", marginBottom: "20px" };
const subTitle = { color: "#38bdf8", fontSize: "13px", marginTop: 0, marginBottom: "10px" };
const textarea = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#f8fafc", fontSize: "12px", boxSizing: "border-box" as const, outline: "none", resize: "vertical" as const };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#f8fafc", fontSize: "12px", boxSizing: "border-box" as const, outline: "none" };
const btn = (primary: boolean) => ({ padding: "8px 14px", background: primary ? "#38bdf8" : "#334155", color: primary ? "#0f172a" : "#f8fafc", border: "none", borderRadius: "6px", fontWeight: "bold" as const, fontSize: "12px", cursor: "pointer" });
const actionBtn = (active: boolean) => ({ flex: 1, padding: "8px", background: active ? "#38bdf8" : "#334155", color: active ? "#0f172a" : "#f8fafc", border: "none", borderRadius: "6px", fontWeight: "bold" as const, fontSize: "11px", cursor: "pointer" });
