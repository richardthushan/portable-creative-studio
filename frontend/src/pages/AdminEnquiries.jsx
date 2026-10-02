import React, { useEffect, useState } from 'react';
import {
  getAdminEnquiries,
  updateEnquiryStatus,
} from '../services/adminApi';

import './AdminDashboard.css';

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    loadEnquiries();
  }, []);

  async function loadEnquiries() {
    try {
      setLoading(true);
      setError('');

      const response = await getAdminEnquiries();
      setEnquiries(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load enquiries.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await updateEnquiryStatus(id, status);
      await loadEnquiries();
    } catch (err) {
      console.error(err);
      alert('Unable to update status.');
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
            onClick={() => window.location.href = '/admin/dashboard'}
          >
            Dashboard
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
            className="active"
            onClick={() => window.location.href = '/admin/enquiries'}
          >
            Enquiries
          </button>
        </div>
      </aside>

      <main className="admin-main">

        <div className="admin-header">
          <div>
            <h1>Enquiries</h1>
            <p>Manage customer enquiries</p>
          </div>
        </div>

        <section className="admin-section">
          <div className="admin-section-title">
            <h2>All Enquiries</h2>
            <span>{enquiries.length} enquiries</span>
          </div>

          {loading && (
            <p className="admin-message">Loading...</p>
          )}

          {error && (
            <p className="admin-message">{error}</p>
          )}

          {!loading && !error && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Message</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id}>

                      <td>{enquiry.name}</td>

                      <td>
                        <div>{enquiry.email}</div>
                        <div>{enquiry.phone || '-'}</div>
                      </td>

                      <td>
                        {enquiry.service?.name || '-'}
                      </td>

                      <td>
                        {enquiry.message}
                      </td>

                      <td>
                        <select
                          className="admin-status"
                          value={enquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              enquiry.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
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

export default AdminEnquiries;