import { useEffect, useState } from 'react';
import {
  getAdminServices,
  createAdminService,
  updateAdminService,
  toggleAdminServiceStatus,
} from '../services/adminApi';

import './AdminDashboard.css';

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_description: '',
    description: '',
    icon: '',
    service_type: 'studio',
    is_ai_available: false,
    is_worker_available: true,
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      setLoading(true);

      const response = await getAdminServices();

      setServices(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load services.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = {
        ...formData,
        display_order: Number(formData.display_order),
      };

      if (editingId) {
        await updateAdminService(editingId, data);
      } else {
        await createAdminService(data);
      }

      resetForm();
      await loadServices();
    } catch (err) {
      console.error(err);
      alert('Unable to save service.');
    }
  }

  function handleEdit(service) {
    setEditingId(service.id);

    setFormData({
      name: service.name || '',
      slug: service.slug || '',
      short_description: service.short_description || '',
      description: service.description || '',
      icon: service.icon || '',
      service_type: service.service_type || 'studio',
      is_ai_available: Boolean(service.is_ai_available),
      is_worker_available: Boolean(service.is_worker_available),
      is_active: Boolean(service.is_active),
      display_order: service.display_order || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function handleToggleStatus(id) {
    try {
      await toggleAdminServiceStatus(id);
      await loadServices();
    } catch (err) {
      console.error(err);
      alert('Unable to change service status.');
    }
  }

  function resetForm() {
    setEditingId(null);

    setFormData({
      name: '',
      slug: '',
      short_description: '',
      description: '',
      icon: '',
      service_type: 'studio',
      is_ai_available: false,
      is_worker_available: true,
      is_active: true,
      display_order: 0,
    });
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
            onClick={() => {
              window.location.href = '/admin/dashboard';
            }}
          >
            Dashboard
          </button>

          <button className="active">
            Services
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Manage Services</h1>
            <p>Add, edit and control public services.</p>
          </div>
        </div>

        <section className="admin-section">
          <div className="admin-section-title">
            <h2>
              {editingId ? 'Edit Service' : 'Add Service'}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Service Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Slug
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="graphic-design"
                required
              />
            </label>

            <label>
              Short Description
              <input
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
              />
            </label>

            <label>
              Full Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>

            <label>
              Icon
              <input
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="sparkles"
              />
            </label>

            <label>
              Service Type
              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
              >
                <option value="studio">
                  Studio
                </option>

                <option value="ai">
                  AI
                </option>
              </select>
            </label>

            <label>
              Display Order
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
              />
            </label>

            <label>
              <input
                type="checkbox"
                name="is_ai_available"
                checked={formData.is_ai_available}
                onChange={handleChange}
              />
              AI Available
            </label>

            <label>
              <input
                type="checkbox"
                name="is_worker_available"
                checked={formData.is_worker_available}
                onChange={handleChange}
              />
              Studio Worker Available
            </label>

            <label>
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              Active
            </label>

            <div>
              <button
                className="admin-logout"
                type="submit"
              >
                {editingId
                  ? 'Update Service'
                  : 'Add Service'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section
          className="admin-section"
          style={{ marginTop: '30px' }}
        >
          <div className="admin-section-title">
            <h2>Services</h2>

            <span>
              {services.length} total
            </span>
          </div>

          {loading && (
            <p className="admin-message">
              Loading services...
            </p>
          )}

          {error && (
            <p className="admin-message">
              {error}
            </p>
          )}

          {!loading && services.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>#{service.id}</td>

                      <td>
                        <strong>
                          {service.name}
                        </strong>
                      </td>

                      <td>
                        {service.service_type}
                      </td>

                      <td>
                        {service.display_order}
                      </td>

                      <td>
                        {service.is_active
                          ? 'Active'
                          : 'Inactive'}
                      </td>

                      <td>
                        <button
                          onClick={() =>
                            handleEdit(service)
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleToggleStatus(
                              service.id
                            )
                          }
                          style={{
                            marginLeft: '8px',
                          }}
                        >
                          {service.is_active
                            ? 'Disable'
                            : 'Enable'}
                        </button>
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

export default AdminServices;