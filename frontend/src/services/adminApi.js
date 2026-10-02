import api from './api';

export async function getAdminEnquiries() {
  const token = localStorage.getItem('admin_token');

  const response = await api.get('/admin/enquiries', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateEnquiryStatus(id, status) {
  const token = localStorage.getItem('admin_token');

  const response = await api.patch(
    `/admin/enquiries/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
export async function adminLogout() {
  const token = localStorage.getItem('admin_token');

  const response = await api.post(
    '/admin/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
export async function getAdminServices() {
  const token = localStorage.getItem('admin_token');

  const response = await api.get('/admin/services', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createAdminService(data) {
  const token = localStorage.getItem('admin_token');

  const response = await api.post('/admin/services', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateAdminService(id, data) {
  const token = localStorage.getItem('admin_token');

  const response = await api.put(`/admin/services/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function toggleAdminServiceStatus(id) {
  const token = localStorage.getItem('admin_token');

  const response = await api.patch(
    `/admin/services/${id}/toggle-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
export async function getAdminPortfolio() {
  const token = localStorage.getItem('admin_token');

  const response = await api.get('/admin/portfolio', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createAdminPortfolio(data) {
  const token = localStorage.getItem('admin_token');

  const response = await api.post('/admin/portfolio', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}


export async function updateAdminPortfolio(id, data) {
  const token = localStorage.getItem('admin_token');

  const response = await api.put(
    `/admin/portfolio/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function toggleAdminPortfolioPublish(id) {
  const token = localStorage.getItem('admin_token');

  const response = await api.patch(
    `/admin/portfolio/${id}/toggle-publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
export async function getAdminPortfolioCategories() {
  const token = localStorage.getItem('admin_token');

  const response = await api.get('/admin/portfolio-categories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}