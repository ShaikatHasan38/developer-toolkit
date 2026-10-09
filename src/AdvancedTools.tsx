import React, { useState } from 'react';

const AdvancedTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('codegen');

  // --- State for API Code Snippet Generator ---
  const [apiUrl, setApiUrl] = useState<string>('https://api.example.com/data');
  const [apiMethod, setApiMethod] = useState<string>('POST');
  const [apiPayload, setApiPayload] = useState<string>('{\n  "name": "DeveloperToolkit",\n  "status": "active"\n}');
  const [codeLang, setCodeLang] = useState<string>('fetch');

  // --- State for JWT Analyzer ---
  const [jwtToken, setJwtToken] = useState<string>('');
  const [jwtHeader, setJwtHeader] = useState<string>('');
  const [jwtPayload, setJwtPayload] = useState<string>('');
  const [jwtError, setJwtError] = useState<string>('');

  // --- State for Regex Tester ---
  const [regexPattern, setRegexPattern] = useState<string>('');
  const [regexFlags, setRegexFlags] = useState<string>('g');
  const [testString, setTestString] = useState<string>('');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);

  // --- State for .env Builder ---
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([{ key: 'API_KEY', value: 'your_api_key_here' }]);

  // --- Logic for API Code Generator ---
  const generateCode = (): string | undefined => {
    if (codeLang === 'fetch') {
      return `fetch('${apiUrl}', {\n  method: '${apiMethod}',\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify(${apiPayload.trim()})\n})\n.then(res => res.json())\n.then(data => console.log(data));`;
    } else if (codeLang === 'axios') {
      return `axios({\n  method: '${apiMethod.toLowerCase()}',\n  url: '${apiUrl}',\n  data: ${apiPayload.trim()}\n})\n.then(response => console.log(response.data));`;
    } else if (codeLang === 'curl') {
      return `curl -X ${apiMethod} ${apiUrl} \\\n-H "Content-Type: application/json" \\\n-d '${apiPayload.trim()}'`;
    } else if (codeLang === 'python') {
      return `import requests\nimport json\n\nurl = "${apiUrl}"\npayload = json.dumps(${apiPayload.trim()})\nheaders = {\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.request("${apiMethod}", url, headers=headers, data=payload)\nprint(response.text)`;
    }
  };

  // --- Logic for JWT Analyzer ---
  const handleJwtDecode = (token: string) => {
    setJwtToken(token);
    try {
      if (!token) {
        setJwtHeader(''); setJwtPayload(''); setJwtError(''); return;
      }
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      
      const decodeBase64Url = (str: string) => {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        const pad = str.length % 4;
        if (pad) str += new Array(5 - pad).join('=');
        return decodeURIComponent(escape(atob(str)));
      };

      setJwtHeader(JSON.stringify(JSON.parse(decodeBase64Url(parts[0])), null, 2));
      setJwtPayload(JSON.stringify(JSON.parse(decodeBase64Url(parts[1])), null, 2));
      setJwtError('');
    } catch (err) {
      setJwtError('Invalid Token. Please check your JWT.');
      setJwtHeader(''); setJwtPayload('');
    }
  };

  // --- Logic for Regex Tester ---
  const handleRegexTest = () => {
    try {
      if (!regexPattern) { setRegexMatches([]); return; }
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = testString.match(regex);
      setRegexMatches(matches ? Array.from(matches) : []);
    } catch (e) {
      setRegexMatches(['Invalid Regex Pattern']);
    }
  };

  // --- Logic for .env Builder ---
  const addEnvVar = () => setEnvVars([...envVars, { key: '', value: '' }]);
  const updateEnvVar = (index: number, field: 'key' | 'value', val: string) => {
    const newVars = [...envVars];
    newVars[index][field] = val;
    setEnvVars(newVars);
  };
  const removeEnvVar = (index: number) => setEnvVars(envVars.filter((_, i) => i !== index));

  return (
    <div style={{ background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155" }}>
      <h2 style={{ marginTop: 0, color: "#e2e8f0", textAlign: "center" }}>⚙️ Advanced Tools</h2>
      
      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #334155", paddingBottom: "10px", overflowX: "auto" }}>
        {['codegen', 'jwt', 'regex', 'env'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ padding: "8px 14px", background: activeTab === tab ? "#38bdf8" : "#334155", color: activeTab === tab ? "#0f172a" : "#cbd5e1", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "12px", cursor: "pointer", textTransform: "capitalize" }}
          >
            {tab === 'codegen' ? 'Code Generator' : tab === 'env' ? '.env Builder' : tab + ' Tester'}
          </button>
        ))}
      </div>

      {/* Tab 1: API Code Generator */}
      {activeTab === 'codegen' && (
        <div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <select style={inputStyle} value={apiMethod} onChange={e => setApiMethod(e.target.value)}>
              <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
            </select>
            <input type="text" style={{ ...inputStyle, flex: 1 }} value={apiUrl} onChange={e => setApiUrl(e.target.value)} placeholder="API URL" />
          </div>
          <textarea style={{ ...textarea, height: "100px", fontFamily: "monospace" }} value={apiPayload} onChange={e => setApiPayload(e.target.value)} placeholder="JSON Payload..."></textarea>
          
          <div style={{ display: "flex", gap: "8px", margin: "15px 0" }}>
            {['fetch', 'axios', 'curl', 'python'].map(lang => (
              <button key={lang} onClick={() => setCodeLang(lang)} style={{ padding: "5px 10px", background: codeLang === lang ? "#22c55e" : "#334155", color: "#fff", border: "none", borderRadius: "4px", fontSize: "11px", cursor: "pointer", textTransform: "capitalize" }}>{lang}</button>
            ))}
          </div>
          <pre style={{ background: "#0f172a", padding: "15px", borderRadius: "6px", color: "#22c55e", overflowX: "auto", fontSize: "12px", border: "1px solid #475569" }}>
            {generateCode()}
          </pre>
        </div>
      )}

      {/* Tab 2: JWT Analyzer */}
      {activeTab === 'jwt' && (
        <div>
          <textarea style={{ ...textarea, height: "80px", fontFamily: "monospace" }} placeholder="Paste your JWT here..." value={jwtToken} onChange={e => handleJwtDecode(e.target.value)}></textarea>
          {jwtError && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "5px" }}>{jwtError}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
            <div>
              <h3 style={{ fontSize: "13px", color: "#c084fc", margin: "0 0 8px" }}>Header (Algorithm & Type)</h3>
              <pre style={{ background: "#0f172a", padding: "15px", borderRadius: "6px", color: "#d8b4fe", minHeight: "100px", fontSize: "12px", border: "1px solid #475569" }}>{jwtHeader || 'No Data'}</pre>
            </div>
            <div>
              <h3 style={{ fontSize: "13px", color: "#38bdf8", margin: "0 0 8px" }}>Payload (Data)</h3>
              <pre style={{ background: "#0f172a", padding: "15px", borderRadius: "6px", color: "#bae6fd", minHeight: "100px", fontSize: "12px", border: "1px solid #475569" }}>{jwtPayload || 'No Data'}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Regex Tester */}
      {activeTab === 'regex' && (
        <div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input type="text" style={{ ...inputStyle, flex: 1, fontFamily: "monospace" }} placeholder="Regex (e.g., \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)" value={regexPattern} onChange={e => {setRegexPattern(e.target.value); handleRegexTest();}} />
            <input type="text" style={{ ...inputStyle, width: "70px", textAlign: "center" }} placeholder="Flags" value={regexFlags} onChange={e => {setRegexFlags(e.target.value); handleRegexTest();}} />
          </div>
          <textarea style={{ ...textarea, height: "100px", marginBottom: "15px" }} placeholder="Test String here..." value={testString} onChange={e => {setTestString(e.target.value); handleRegexTest();}}></textarea>
          <div style={{ background: "#0f172a", padding: "15px", borderRadius: "6px", minHeight: "80px", border: "1px solid #475569" }}>
            <h3 style={{ fontSize: "13px", color: "#22c55e", margin: "0 0 10px" }}>Matches ({regexMatches.length}):</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {regexMatches.map((match, i) => (
                <span key={i} style={{ background: "#1e293b", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", color: "#fde047", border: "1px solid #475569" }}>{match}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: .env Builder */}
      {activeTab === 'env' && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
            {envVars.map((env, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input type="text" style={{ ...inputStyle, width: "30%", textTransform: "uppercase" }} placeholder="KEY" value={env.key} onChange={e => updateEnvVar(index, 'key', e.target.value.toUpperCase())} />
                <span style={{ color: "#94a3b8", fontWeight: "bold" }}>=</span>
                <input type="text" style={{ ...inputStyle, flex: 1 }} placeholder="VALUE" value={env.value} onChange={e => updateEnvVar(index, 'value', e.target.value)} />
                <button onClick={() => removeEnvVar(index)} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "10px 15px", cursor: "pointer", fontWeight: "bold" }}>X</button>
              </div>
            ))}
          </div>
          <button onClick={addEnvVar} style={{ padding: "8px 14px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>+ Add Variable</button>
          
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontSize: "13px", color: "#22c55e", margin: "0 0 8px" }}>Preview (.env file)</h3>
            <pre style={{ background: "#0f172a", padding: "15px", borderRadius: "6px", color: "#cbd5e1", fontSize: "12px", border: "1px solid #475569" }}>
              {envVars.map(env => env.key ? `${env.key}=${env.value}` : '').filter(Boolean).join('\n')}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles to match your existing app theme
const textarea = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#f8fafc", fontSize: "12px", boxSizing: "border-box" as const, outline: "none", resize: "vertical" as const };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#f8fafc", fontSize: "12px", boxSizing: "border-box" as const, outline: "none" };

export default AdvancedTools;
