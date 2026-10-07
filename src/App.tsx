import React, { useState, useEffect } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"media" | "token" | "security">(
    "media"
  );

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
          padding: "24px 20px",
          background: "#1e293b",
          textAlign: "center",
          borderBottom: "1px solid #334155",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ margin: 0, color: "#38bdf8", fontSize: "24px" }}>
          ⚡ Dev & Creator Workspace
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#94a3b8" }}>
          Media Studio • Token Hub • Security Lab
        </p>
      </header>

      {/* নেভিগেশন মেনু */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          padding: "20px",
          background: "#1e293b",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActiveTab("media")}
          style={getTabStyle(activeTab === "media")}
        >
          🎨 Media Studio
        </button>
        <button
          onClick={() => setActiveTab("token")}
          style={getTabStyle(activeTab === "token")}
        >
          🔑 Token & Data Hub
        </button>
        <button
          onClick={() => setActiveTab("security")}
          style={getTabStyle(activeTab === "security")}
        >
          🛡️ Security Lab
        </button>
      </nav>

      {/* মূল কন্টেন্ট এরিয়া */}
      <main
        style={{
          padding: "30px 20px",
          flex: 1,
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {activeTab === "media" && <MediaStudio />}
        {activeTab === "token" && <TokenHub />}
        {activeTab === "security" && <SecurityLab />}
      </main>
    </div>
  );
}

const getTabStyle = (isActive: boolean) => ({
  padding: "12px 24px",
  background: isActive ? "#38bdf8" : "transparent",
  color: isActive ? "#0f172a" : "#cbd5e1",
  border: isActive ? "1px solid #38bdf8" : "1px solid #475569",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.3s ease",
});

// --- ১. মিডিয়া স্টুডিও কম্পোনেন্ট ---
function MediaStudio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSuccessMsg("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateVideo = () => {
    if (!selectedImage) return;
    setProcessing(true);
    setSuccessMsg("");
    setTimeout(() => {
      setProcessing(false);
      setSuccessMsg(
        "🎉 সফল! ইমেজ থেকে শর্ট ভিডিও জেনারেশন রিকোয়েস্ট প্রসেস করা হয়েছে।"
      );
    }, 2000);
  };

  return (
    <div style={{ ...cardStyle, textAlign: "left" as const }}>
      <h2 style={{ color: "#e2e8f0", marginTop: 0, textAlign: "center" }}>
        🎨 Media & Video Studio
      </h2>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        ছবি আপলোড করুন এবং ভিডিও কনটেন্ট বা কাস্টম ভিজ্যুয়াল মকআপ জেনারেট করুন।
      </p>

      <div
        style={{
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #334155",
          textAlign: "center",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: "15px", color: "#cbd5e1", fontSize: "13px" }}
        />

        {selectedImage ? (
          <div style={{ marginTop: "15px" }}>
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "250px",
                borderRadius: "8px",
                border: "1px solid #475569",
              }}
            />
            <div
              style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}
            >
              ফাইল: {imageName}
            </div>

            <button
              onClick={handleGenerateVideo}
              disabled={processing}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: processing ? "#475569" : "#38bdf8",
                color: "#0f172a",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: processing ? "not-allowed" : "pointer",
              }}
            >
              {processing ? "প্রসেসিং হচ্ছে..." : "🎬 ভিডিও জেনারেট করুন"}
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: "30px",
              border: "2px dashed #475569",
              borderRadius: "8px",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            কোনো ছবি নির্বাচন করা হয়নি। উপরে ফাইল আপলোড অপশন থেকে ছবি দিন।
          </div>
        )}

        {successMsg && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              background: "#1e293b",
              color: "#22c55e",
              borderRadius: "6px",
              fontSize: "13px",
              border: "1px solid #22c55e",
            }}
          >
            {successMsg}
          </div>
        )}
      </div>
    </div>
  );
}

// --- ২. টোকেন ও ডেটা হাব কম্পোনেন্ট ---
function TokenHub() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [jsonError, setJsonError] = useState("");

  const [tokenInput, setTokenInput] = useState("");
  const [tokenData, setTokenData] = useState<any>(null);
  const [savedTokens, setSavedTokens] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("dev_workspace_tokens") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("dev_workspace_tokens", JSON.stringify(savedTokens));
  }, [savedTokens]);

  const handleFormatJson = (beautify: boolean) => {
    setJsonError("");
    try {
      if (!jsonInput.trim()) {
        setJsonOutput("");
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(
        beautify ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
      );
    } catch (err: any) {
      setJsonError("❌ ভুল JSON সিনট্যাক্স: " + err.message);
      setJsonOutput("");
    }
  };

  const handleDecodeJwt = (token: string) => {
    setTokenInput(token);
    try {
      const parts = token.split(".");
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
    if (!tokenInput.trim()) return;
    if (!savedTokens.includes(tokenInput)) {
      setSavedTokens([tokenInput, ...savedTokens]);
    }
  };

  return (
    <div style={{ ...cardStyle, textAlign: "left" as const }}>
      <h2 style={{ color: "#e2e8f0", marginTop: 0, textAlign: "center" }}>
        🔑 Token & Data Hub
      </h2>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        JSON পেলোড ফরম্যাটার এবং অ্যাক্সেস টোকেন / JWT অ্যানালাইজার।
      </p>

      <div
        style={{
          marginBottom: "25px",
          background: "#0f172a",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #334155",
        }}
      >
        <h3 style={{ color: "#38bdf8", fontSize: "15px", marginTop: 0 }}>
          📦 JSON Payload Beautifier & Editor
        </h3>
        <textarea
          rows={3}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"key": "value", ...}'
          style={textareaStyle}
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={() => handleFormatJson(true)}
            style={btnStyle(false)}
          >
            Beautify / Format
          </button>
          <button
            onClick={() => handleFormatJson(false)}
            style={btnStyle(false)}
          >
            Minify
          </button>
        </div>
        {jsonError && (
          <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "8px" }}>
            {jsonError}
          </div>
        )}
        {jsonOutput && (
          <textarea
            rows={4}
            readOnly
            value={jsonOutput}
            style={{
              ...textareaStyle,
              marginTop: "10px",
              color: "#38bdf8",
              background: "#1e293b",
            }}
          />
        )}
      </div>

      <div
        style={{
          background: "#0f172a",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #334155",
        }}
      >
        <h3 style={{ color: "#38bdf8", fontSize: "15px", marginTop: 0 }}>
          🏷️ Access Token & JWT Inspector
        </h3>
        <input
          type="text"
          value={tokenInput}
          onChange={(e) => handleDecodeJwt(e.target.value)}
          placeholder="JWT টোকেন বা অ্যাক্সেস টোকেন এখানে পেস্ট করুন..."
          style={{ ...textareaStyle, height: "40px", marginBottom: "10px" }}
        />
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            onClick={saveToken}
            style={{
              ...btnStyle(true),
              flex: "initial",
              padding: "8px 16px",
              fontSize: "12px",
            }}
          >
            টোকেন সেভ করুন
          </button>
        </div>

        {tokenData && (
          <div
            style={{
              background: "#1e293b",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#f8fafc",
              maxHeight: "180px",
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
          <div style={{ marginTop: "15px" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#94a3b8",
                marginBottom: "5px",
              }}
            >
              সংরক্ষিত টোকেনসমূহ ({savedTokens.length}):
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
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
                    onClick={() => handleDecodeJwt(t)}
                    style={{
                      background: "#38bdf8",
                      color: "#0f172a",
                      border: "none",
                      borderRadius: "4px",
                      padding: "3px 8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "11px",
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

// --- ৩. সিকিউরিটি ল্যাব কম্পোনেন্ট ---
function SecurityLab() {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [mode, setMode] = useState<
    "b64_enc" | "b64_dec" | "url_enc" | "url_dec"
  >("b64_enc");

  const handleProcess = (selectedMode: typeof mode, text: string) => {
    setMode(selectedMode);
    try {
      if (selectedMode === "b64_enc") {
        setOutputVal(btoa(unescape(encodeURIComponent(text))));
      } else if (selectedMode === "b64_dec") {
        setOutputVal(decodeURIComponent(escape(atob(text))));
      } else if (selectedMode === "url_enc") {
        setOutputVal(encodeURIComponent(text));
      } else if (selectedMode === "url_dec") {
        setOutputVal(decodeURIComponent(text));
      }
    } catch (error) {
      setOutputVal("❌ ত্রুটি: ইনপুট ফরম্যাট সঠিক নয় বা ডিকোড করা যাচ্ছে না!");
    }
  };

  return (
    <div style={{ ...cardStyle, textAlign: "left" as const }}>
      <h2 style={{ color: "#e2e8f0", marginTop: 0, textAlign: "center" }}>
        🛡️ Security Lab & Encoder
      </h2>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        টেস্টিং ও সিকিউরিটি কাজের জন্য দ্রুত Base64 এবং URL এনকোড/ডিকোড করার
        টুল।
      </p>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            color: "#cbd5e1",
          }}
        >
          ইনপুট ডেটা বা টেক্সট:
        </label>
        <textarea
          rows={4}
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            handleProcess(mode, e.target.value);
          }}
          placeholder="এখানে টেক্সট বা পেলোড লিখুন..."
          style={textareaStyle}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => handleProcess("b64_enc", inputVal)}
          style={btnStyle(mode === "b64_enc")}
        >
          Base64 Encode
        </button>
        <button
          onClick={() => handleProcess("b64_dec", inputVal)}
          style={btnStyle(mode === "b64_dec")}
        >
          Base64 Decode
        </button>
        <button
          onClick={() => handleProcess("url_enc", inputVal)}
          style={btnStyle(mode === "url_enc")}
        >
          URL Encode
        </button>
        <button
          onClick={() => handleProcess("url_dec", inputVal)}
          style={btnStyle(mode === "url_dec")}
        >
          URL Decode
        </button>
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            color: "#cbd5e1",
          }}
        >
          আউটপুট রেজাল্ট:
        </label>
        <textarea
          rows={4}
          readOnly
          value={outputVal}
          placeholder="আউটপুট এখানে দেখা যাবে..."
          style={{ ...textareaStyle, background: "#0f172a", color: "#38bdf8" }}
        />
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #334155",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "#f8fafc",
  fontSize: "14px",
  boxSizing: "border-box" as const,
  outline: "none",
};

const btnStyle = (isActive: boolean) => ({
  flex: 1,
  padding: "10px",
  background: isActive ? "#38bdf8" : "#334155",
  color: isActive ? "#0f172a" : "#f8fafc",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold" as const,
  fontSize: "12px",
  cursor: "pointer",
});
