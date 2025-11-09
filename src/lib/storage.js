// lib/storage.js
// Local storage helper to store images as base64 for demo (JS version)
const STORAGE_KEY = 'image_app_data_v1';

export async function getImages() {
 const raw = localStorage.getItem(STORAGE_KEY);
 if (!raw) return [];
 try {
 const parsed = JSON.parse(raw);
 return parsed;
 } catch (e) {
 console.error('Failed to parse storage data', e);
 return [];
 }
}

export async function uploadImage(data) {
 const items = await getImages();
 const newItem = {
 id: String(Date.now()),
 ...data,
 };
 items.unshift(newItem);
 localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function deleteImage(id) {
 const items = await getImages();
 const filtered = items.filter((it) => it.id !== id);
 localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
