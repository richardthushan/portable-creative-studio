import { useEffect, useMemo, useState } from 'react';
import {
  getAdminEnquiries,
  updateEnquiryStatus,
  adminLogout,
} from '../services/adminApi';
import './AdminDashboard.css';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');

    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    if (user) {
      setAdmin(JSON.parse(user));
    }

    async function loadEnquiries() {
      try {
        const response = await getAdminEnquiries();
        setEnquiries(response.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load enquiries.');
      } finally {
        setLoading(false);
      }
    }

    loadEnquiries();
  }, []);

  const stats = useMemo(() => {
    return {
      total: enquiries.length,
      newCount: enquiries.filter((item) => item.status === 'new').length,
      contacted: enquiries.filter((item) => item.status === 'contacted').length,
      completed: enquiries.filter((item) => item.status === 'completed').length,
    };
  }, [enquiries]);

  async function handleStatusChange(id, status) {
    try {
      await updateEnquiryStatus(id, status);

      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === id
            ? { ...enquiry, status }
            : enquiry
        )
      );
    } catch (err) {
      console.error(err);
      alert('Unable to update status.');
    }
  }

  async function handleLogout() {
  try {
    await adminLogout();
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');

    window.location.href = '/admin/login';
  }
}
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Portable</h2>
          <p>Creative Studio Admin</p>
        </div>

        <div className="admin-menu">
  <button
    className="active"
    onClick={() => window.location.href = '/admin/dashboard'}
  >
    Dashboard
  </button>
<button
  className="admin-logout"
  onClick={handleLogout}
>
  Logout
</button>
  <button
    onClick={() => window.location.href = '/admin/services'}
  >
    Services
  </button>

  <button
    onClick={() => window.location.href = '/admin/portfolio'}
  >
    Portfolio
  </button>

  <button
    onClick={() => window.location.href = '/admin/enquiries'}
  >
    Enquiries
  </button>
</div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Welcome, {admin?.name || 'Admin'} · {admin?.email}
            </p>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="admin-stats">
          <div className="stat-card purple">
            <span>Total Enquiries</span>
            <h3>{stats.total}</h3>
          </div>

          <div className="stat-card">
            <span>New</span>
            <h3>{stats.newCount}</h3>
          </div>

          <div className="stat-card">
            <span>Contacted</span>
            <h3>{stats.contacted}</h3>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <h3>{stats.completed}</h3>
          </div>
        </div>

        <section className="admin-section">
          <div className="admin-section-title">
            <h2>Contact Enquiries</h2>
            <span>{enquiries.length} total</span>
          </div>

          {loading && (
            <p className="admin-message">
              Loading enquiries...
            </p>
          )}

          {error && (
            <p className="admin-message">
              {error}
            </p>
          )}

          {!loading && !error && enquiries.length === 0 && (
            <p className="admin-message">
              No enquiries found.
            </p>
          )}

          {!loading && !error && enquiries.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Service</th>
                    <th>Message</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id}>
                      <td>#{enquiry.id}</td>

                      <td>
                        <strong>{enquiry.name}</strong>
                      </td>

                      <td>{enquiry.email}</td>

                      <td>
                        {enquiry.service?.name || 'Not selected'}
                      </td>

                      <td>{enquiry.message}</td>

                      <td>
                        <select
                          className={`admin-status status-${enquiry.status}`}
                          value={enquiry.status}
                          onChange={(event) =>
                            handleStatusChange(
                              enquiry.id,
                              event.target.value
                            )
                          }
                        >
                          <option value="new">
                            New
                          </option>

                          <option value="contacted">
                            Contacted
                          </option>

                          <option value="completed">
                            Completed
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;