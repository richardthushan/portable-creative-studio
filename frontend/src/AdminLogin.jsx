import { useState } from 'react';
import api from '../services/api';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/admin/login', {
        email,
        password,
      });

      const token = response.data?.data?.token;

      if (token) {
        localStorage.setItem('admin_token', token);
        localStorage.setItem(
          'admin_user',
          JSON.stringify(response.data.data.user)
        );

        setSuccess('Admin login successful.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <h1>Admin Login</h1>

        <p>Portable Creative Studio</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Admin email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </label>

          {error && <p>{error}</p>}
          {success && <p>{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;