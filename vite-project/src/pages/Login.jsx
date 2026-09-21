import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("StrongPassword123!");
  const [rememberMe, setRememberMe] = useState(false);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score < 2) return { text: "Weak", color: "red" };
    if (score < 4) return { text: "Medium", color: "orange" };
    return { text: "Strong", color: "green" };
  };

  const strength = calculateStrength(password);

  const login = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and Password are required!");
      return;
    }

    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_payload.simulated_signature";

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("jwt_token", fakeToken);

    if (rememberMe) {
      localStorage.setItem("username", username);
    }

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-icon">📝</div>
        <h1>Task Manager</h1>
        <p>Login to manage your tasks</p>

        <form onSubmit={login} className="login-form">
          <div className="form-group">
            <label>Username (Required)</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Password (Required)</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {password && (
              <div style={{ marginTop: '5px', fontSize: '12px', color: strength.color }}>
                Password Strength: {strength.text}
              </div>
            )}
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ width: 'auto' }} />
            <label htmlFor="remember" style={{ margin: 0, fontWeight: 'normal' }}>Remember Me</label>
          </div>

          <button className="login-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
