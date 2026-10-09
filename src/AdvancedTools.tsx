import React, { useState } from 'react';

const AdvancedTools = () => {
  const [activeTab, setActiveTab] = useState('codegen');

  // --- State for API Code Snippet Generator ---
  const [apiUrl, setApiUrl] = useState('https://api.example.com/data');
  const [apiMethod, setApiMethod] = useState('POST');
  const [apiPayload, setApiPayload] = useState('{\n  "name": "DeveloperToolkit",\n  "status": "active"\n}');
  const [codeLang, setCodeLang] = useState('fetch');

  // --- State for JWT Analyzer ---
  const [jwtToken, setJwtToken] = useState('');
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');
  const [jwtError, setJwtError] = useState('');

  // --- State for Regex Tester ---
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [regexMatches, setRegexMatches] = useState([]);

  // --- State for .env Builder ---
  const [envVars, setEnvVars] = useState([{ key: 'API_KEY', value: 'your_api_key_here' }]);

  // --- Logic for API Code Generator ---
  const generateCode = () => {
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
  const handleJwtDecode = (token) => {
    setJwtToken(token);
    try {
      if (!token) {
        setJwtHeader(''); setJwtPayload(''); setJwtError(''); return;
      }
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      
      const decodeBase64Url = (str) => {
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
      setRegexMatches(matches || []);
    } catch (e) {
      setRegexMatches(['Invalid Regex Pattern']);
    }
  };

  // --- Logic for .env Builder ---
  const addEnvVar = () => setEnvVars([...envVars, { key: '', value: '' }]);
  const updateEnvVar = (index, field, val) => {
    const newVars = [...envVars];
    newVars[index][field] = val;
    setEnvVars(newVars);
  };
  const removeEnvVar = (index) => setEnvVars(envVars.filter((_, i) => i !== index));

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-sans">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Advanced Developer Tools</h2>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
        {['codegen', 'jwt', 'regex', 'env'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-semibold capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            {tab === 'codegen' ? 'API Code Generator' : tab === 'env' ? '.env Builder' : tab + ' Tester'}
          </button>
        ))}
      </div>

      {/* Tab 1: API Code Generator */}
      {activeTab === 'codegen' && (
        <div className="space-y-4">
          <div className="flex space-x-4">
            <select className="bg-gray-800 p-2 rounded border border-gray-700" value={apiMethod} onChange={e => setApiMethod(e.target.value)}>
              <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
            </select>
            <input type="text" className="flex-1 bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500" value={apiUrl} onChange={e => setApiUrl(e.target.value)} placeholder="API URL" />
          </div>
          <textarea className="w-full h-32 bg-gray-800 p-3 rounded border border-gray-700 font-mono text-sm" value={apiPayload} onChange={e => setApiPayload(e.target.value)} placeholder="JSON Payload..."></textarea>
          
          <div className="flex space-x-4 mb-2">
            {['fetch', 'axios', 'curl', 'python'].map(lang => (
              <button key={lang} onClick={() => setCodeLang(lang)} className={`px-3 py-1 rounded capitalize ${codeLang === lang ? 'bg-green-600' : 'bg-gray-700'}`}>{lang}</button>
            ))}
          </div>
          <pre className="bg-black p-4 rounded overflow-x-auto text-green-400 font-mono text-sm border border-gray-700">
            {generateCode()}
          </pre>
        </div>
      )}

      {/* Tab 2: JWT Analyzer */}
      {activeTab === 'jwt' && (
        <div className="space-y-4">
          <textarea className="w-full h-24 bg-gray-800 p-3 rounded border border-gray-700 font-mono text-sm focus:border-blue-500" placeholder="Paste your JWT here..." value={jwtToken} onChange={e => handleJwtDecode(e.target.value)}></textarea>
          {jwtError && <p className="text-red-500">{jwtError}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Header (Algorithm & Type)</h3>
              <pre className="bg-black p-4 rounded min-h-[150px] font-mono text-sm text-purple-300">{jwtHeader || 'No Data'}</pre>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">Payload (Data)</h3>
              <pre className="bg-black p-4 rounded min-h-[150px] font-mono text-sm text-blue-300">{jwtPayload || 'No Data'}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Regex Tester */}
      {activeTab === 'regex' && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input type="text" className="flex-1 bg-gray-800 p-2 rounded border border-gray-700 font-mono" placeholder="Regular Expression (e.g., \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)" value={regexPattern} onChange={e => {setRegexPattern(e.target.value); handleRegexTest();}} />
            <input type="text" className="w-16 bg-gray-800 p-2 rounded border border-gray-700 text-center" placeholder="Flags" value={regexFlags} onChange={e => {setRegexFlags(e.target.value); handleRegexTest();}} />
          </div>
          <textarea className="w-full h-32 bg-gray-800 p-3 rounded border border-gray-700" placeholder="Test String here..." value={testString} onChange={e => {setTestString(e.target.value); handleRegexTest();}}></textarea>
          <div className="bg-black p-4 rounded min-h-[100px] border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">Matches ({regexMatches.length}):</h3>
            <div className="flex flex-wrap gap-2">
              {regexMatches.map((match, i) => (
                <span key={i} className="bg-gray-800 px-2 py-1 rounded text-sm text-yellow-300 border border-gray-600">{match}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: .env Builder */}
      {activeTab === 'env' && (
        <div className="space-y-4">
          <div className="space-y-2">
            {envVars.map((env, index) => (
              <div key={index} className="flex space-x-2">
                <input type="text" className="w-1/3 bg-gray-800 p-2 rounded border border-gray-700 uppercase" placeholder="KEY" value={env.key} onChange={e => updateEnvVar(index, 'key', e.target.value.toUpperCase())} />
                <span className="self-center text-xl">=</span>
                <input type="text" className="flex-1 bg-gray-800 p-2 rounded border border-gray-700" placeholder="VALUE" value={env.value} onChange={e => updateEnvVar(index, 'value', e.target.value)} />
                <button onClick={() => removeEnvVar(index)} className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded font-bold">X</button>
              </div>
            ))}
          </div>
          <button onClick={addEnvVar} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold">+ Add Variable</button>
          <div className="mt-6">
            <h3 className="font-semibold text-green-400 mb-2">Preview (.env file)</h3>
            <pre className="bg-black p-4 rounded font-mono text-sm text-gray-300 border border-gray-700">
              {envVars.map(env => env.key ? `${env.key}=${env.value}` : '').filter(Boolean).join('\n')}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedTools;
