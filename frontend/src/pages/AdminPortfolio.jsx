import { useEffect, useState } from 'react';
import {
  getAdminPortfolio,
  createAdminPortfolio,
  updateAdminPortfolio,
  toggleAdminPortfolioPublish,
  getAdminPortfolioCategories,
} from '../services/adminApi';
import './AdminDashboard.css';

function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
  portfolio_category_id: '',
  title: '',
  slug: '',
  description: '',
  image: null,
  is_featured: false,
  is_published: true,
  display_order: 0,
});

  useEffect(() => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    window.location.href = '/admin/login';
    return;
  }

  loadPortfolio();
  loadCategories();
}, []);

  async function loadPortfolio() {
    try {
      setLoading(true);
      setError('');

      const response = await getAdminPortfolio();

      setItems(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load portfolio.');
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
async function loadCategories() {
  try {
    const response = await getAdminPortfolioCategories();
    setCategories(response.data || []);
  } catch (err) {
    console.error('Category error:', err);
  }
}
  async function handleSubmit(event) {
  event.preventDefault();

  try {
    if (editingId) {
      const data = {
        ...formData,
        portfolio_category_id: Number(
          formData.portfolio_category_id
        ),
        display_order: Number(formData.display_order),
      };

      delete data.image;

      await updateAdminPortfolio(editingId, data);
    } else {
      const data = new FormData();

      data.append(
        'portfolio_category_id',
        formData.portfolio_category_id
      );

      data.append('title', formData.title);
      data.append('slug', formData.slug);
      data.append('description', formData.description || '');

      data.append(
        'is_featured',
        formData.is_featured ? '1' : '0'
      );

      data.append(
        'is_published',
        formData.is_published ? '1' : '0'
      );

      data.append(
        'display_order',
        formData.display_order || '0'
      );

      if (formData.image) {
        data.append('image', formData.image);
      }

      await createAdminPortfolio(data);
    }

    resetForm();
    await loadPortfolio();

    } catch (err) {
  console.error('Portfolio save error:', err.response?.data);

  alert(
    err.response?.data?.message ||
    'Unable to save portfolio item.'
  );
}
}
  function handleEdit(item) {
    setEditingId(item.id);

    setFormData({
      portfolio_category_id:
        item.portfolio_category_id || '',
      title: item.title || '',
      slug: item.slug || '',
      description: item.description || '',

      image_path: item.image_path || '',
      thumbnail_path: item.thumbnail_path || '',
      is_featured: Boolean(item.is_featured),
      is_published: Boolean(item.is_published),
      display_order: item.display_order || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function handleTogglePublish(id) {
    try {
      await toggleAdminPortfolioPublish(id);
      await loadPortfolio();
    } catch (err) {
      console.error(err);
      alert('Unable to change publish status.');
    }
  }

  function resetForm() {
  setEditingId(null);

  setFormData({
    portfolio_category_id: '',
    title: '',
    slug: '',
    description: '',
    image: null,
    image_path: '',
    thumbnail_path: '',
    is_featured: false,
    is_published: true,
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
            onClick={() =>
              (window.location.href = '/admin/dashboard')
            }
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              (window.location.href = '/admin/services')
            }
          >
            Services
          </button>

          <button className="active">
            Portfolio
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Manage Portfolio</h1>
            <p>Add, edit and publish your creative work.</p>
          </div>
        </div>

        <section className="admin-section">
          <div className="admin-section-title">
            <h2>
              {editingId
                ? 'Edit Portfolio Item'
                : 'Add Portfolio Item'}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
  Category
  <select
    name="portfolio_category_id"
    value={formData.portfolio_category_id}
    onChange={handleChange}
    required
  >
    <option value="">Choose a category</option>

    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
</label>

            <label>
              Title
              <input
                name="title"
                value={formData.title}
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
                placeholder="wedding-album-design"
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
<label>
  Portfolio Image
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setFormData({
        ...formData,
        image: e.target.files[0],
      })
    }
  />
</label>
            <label>
              Image Path
              <input
                name="image_path"
                value={formData.image_path}
                onChange={handleChange}
                placeholder="/images/portfolio/example.jpg"
              />
            </label>

            <label>
              Thumbnail Path
              <input
                name="thumbnail_path"
                value={formData.thumbnail_path}
                onChange={handleChange}
                placeholder="/images/portfolio/thumb.jpg"
              />
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
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
              />
              Featured
            </label>

            <label>
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
              />
              Published
            </label>

            <div>
              <button
                className="admin-logout"
                type="submit"
              >
                {editingId
                  ? 'Update Portfolio'
                  : 'Add Portfolio'}
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
            <h2>Portfolio Items</h2>
            <span>{items.length} total</span>
          </div>

          {loading && (
            <p className="admin-message">
              Loading portfolio...
            </p>
          )}

          {error && (
            <p className="admin-message">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="admin-message">
              No portfolio items found.
            </p>
          )}

          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>

                      <td>
                        <strong>{item.title}</strong>
                      </td>

                      <td>
                        {item.category?.name ||
                          `Category #${item.portfolio_category_id}`}
                      </td>

                      <td>
                        {item.is_featured
                          ? 'Yes'
                          : 'No'}
                      </td>

                      <td>
                        {item.is_published
                          ? 'Published'
                          : 'Draft'}
                      </td>

                      <td>
                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleTogglePublish(
                              item.id
                            )
                          }
                          style={{
                            marginLeft: '8px',
                          }}
                        >
                          {item.is_published
                            ? 'Unpublish'
                            : 'Publish'}
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

export default AdminPortfolio;