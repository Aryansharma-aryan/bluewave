import { useState } from "react";
import API_URL from "../config/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
  }

  body {
    background: linear-gradient(135deg, #f8fafc, #eef2ff);
  }

  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .card {
    width: 100%;
    max-width: 400px;
    padding: 40px 32px;
    border-radius: 16px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
    transition: 0.3s;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.12);
  }

  .title {
    font-size: 24px;
    font-weight: 600;
    color: #0f172a;
  }

  .subtitle {
    font-size: 13px;
    color: #64748b;
    margin-top: 6px;
    margin-bottom: 28px;
  }

  .input-group {
    margin-bottom: 18px;
  }

  .input {
    width: 100%;
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    transition: 0.2s;
    outline: none;
    background: rgba(255,255,255,0.9);
  }

  .input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
  }

  .input:disabled {
    background: #f1f5f9;
    cursor: not-allowed;
  }

  .btn {
    width: 100%;
    padding: 14px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: 0.25s;
    margin-top: 8px;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(99,102,241,0.25);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Toast */
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    padding: 14px 18px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.3s ease;
    border-left: 4px solid;
  }

  .toast.success {
    border-color: #22c55e;
    color: #166534;
  }

  .toast.error {
    border-color: #ef4444;
    color: #7f1d1d;
  }

  @keyframes slideIn {
    from { transform: translateX(40px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .footer {
    margin-top: 18px;
    text-align: center;
    font-size: 12px;
    color: #94a3b8;
  }
`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        showToast("success", "Login successful");

        setTimeout(() => {
          window.location.href = "/admin";
        }, 1200);

        return; // keep loading until redirect
      } else {
        showToast("error", data.message || "Invalid credentials");
      }
    } catch {
      showToast("error", "Server error");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="container">
        <div className="card">
          <div className="title">Welcome back</div>
          <div className="subtitle">Sign in to your admin account</div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="input"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button className="btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="footer">
            Secure admin access • Blue Waves Consultancy
          </div>
        </div>
      </div>
    </>
  );
}