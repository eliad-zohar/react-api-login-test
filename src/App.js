import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post("http://localhost:5014/api/login", {
        Username: username,
        Password: password
      }, {
        withCredentials: true // This will include cookies in the request
      });

      setMessage("Login successful. Fetching game info...");

      const gameInfoResponse = await axios.post(
        "http://localhost:5014/api/account/GameHistory",
        {},
        {
          params: {
            "Timezone": 0,
            "SearchDate": "06/01/2024 - 07/31/2024"
          },
          withCredentials: true // This will include cookies in the request
        }
      );

      setMessage(`Game info fetched: ${JSON.stringify(gameInfoResponse.data)}`);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default App;