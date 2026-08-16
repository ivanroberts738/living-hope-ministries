import { Activity, GalleryPhoto, ImpactStats, Programme, WebsiteContent } from '../types';

const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchActivities(filters?: { status?: string; category?: string; search?: string; isAdmin?: boolean }): Promise<Activity[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.category) params.append('category', filters.category);
  if (filters?.search) params.append('search', filters.search);

  const headers: Record<string, string> = {};
  if (filters?.isAdmin) {
    headers['x-admin-request'] = 'true';
  }

  const res = await fetch(`${API_BASE}/activities?${params.toString()}`, { headers });
  if (!res.ok) throw new Error('Failed to fetch activities');
  return res.json();
}

export async function fetchActivityById(id: string): Promise<Activity> {
  const res = await fetch(`${API_BASE}/activities/${id}`);
  if (!res.ok) throw new Error('Activity not found');
  return res.json();
}

export async function createActivity(activityData: Partial<Activity>, token: string): Promise<Activity> {
  const res = await fetch(`${API_BASE}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(activityData)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create activity');
  }
  return res.json();
}

export async function updateActivity(id: string, activityData: Partial<Activity>, token: string): Promise<Activity> {
  const res = await fetch(`${API_BASE}/activities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(activityData)
  });
  if (!res.ok) throw new Error('Failed to update activity');
  return res.json();
}

export async function deleteActivity(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/activities/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete activity');
}

export async function toggleActivityStatus(id: string, status: string, token: string): Promise<Activity> {
  const res = await fetch(`${API_BASE}/activities/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}

export async function fetchProgrammes(): Promise<Programme[]> {
  const res = await fetch(`${API_BASE}/programmes`);
  if (!res.ok) throw new Error('Failed to fetch programmes');
  return res.json();
}

export async function fetchGallery(): Promise<GalleryPhoto[]> {
  const res = await fetch(`${API_BASE}/gallery`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function addGalleryPhoto(photoData: Partial<GalleryPhoto>, token: string): Promise<GalleryPhoto> {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(photoData)
  });
  if (!res.ok) throw new Error('Failed to add gallery photo');
  return res.json();
}

export async function deleteGalleryPhoto(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete photo');
}

export async function fetchStats(): Promise<ImpactStats> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchWebsiteContent(): Promise<Record<string, WebsiteContent>> {
  const res = await fetch(`${API_BASE}/website-content`);
  if (!res.ok) throw new Error('Failed to fetch website content');
  return res.json();
}

export async function updateWebsiteContent(section: string, content: any, token: string): Promise<WebsiteContent> {
  const res = await fetch(`${API_BASE}/website-content/${section}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(content)
  });
  if (!res.ok) throw new Error('Failed to update website content');
  return res.json();
}

export async function uploadImageFile(imageBase64: string): Promise<{ url: string }> {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64 })
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export async function updateProgramme(id: string, progData: Partial<Programme>, token: string): Promise<Programme> {
  const res = await fetch(`${API_BASE}/programmes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(progData)
  });
  if (!res.ok) throw new Error('Failed to update programme');
  return res.json();
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Login failed');
  }
  return res.json();
}

export async function updateAdminCredentials(
  data: { currentEmail?: string; newEmail?: string; newPassword?: string; newName?: string },
  token: string
) {
  const res = await fetch(`${API_BASE}/auth/admin-account`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update administrator account');
  }
  return res.json();
}

export async function clearSampleActivities(token: string) {
  const res = await fetch(`${API_BASE}/activities/clear-sample`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    throw new Error('Failed to clear sample activities');
  }
  return res.json();
}

export async function sendContactMessage(data: {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/contact/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to send message');
  }
  return res.json();
}

export async function fetchContactMessages(token: string) {
  const res = await fetch(`${API_BASE}/contact/messages`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch contact messages');
  }
  return res.json();
}

export async function toggleMessageRead(id: string, token: string) {
  const res = await fetch(`${API_BASE}/contact/messages/${id}/toggle-read`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error('Failed to update message status');
  }
  return res.json();
}

export async function deleteContactMessage(id: string, token: string) {
  const res = await fetch(`${API_BASE}/contact/messages/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error('Failed to delete message');
  }
  return res.json();
}
