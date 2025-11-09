import React, { useState, useEffect } from 'react';

function pad2(n) {
 return n <10 ? `0${n}` : String(n);
}

export default function UploadForm({ onUpload }) {
 const [file, setFile] = useState(null);
 const [name, setName] = useState('');
 const [date, setDate] = useState({ day: '', month: '', year: '' });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 useEffect(() => {
 async function fetchTime() {
 try {
 const res = await fetch('https://worldtimeapi.org/api/timezone/Asia/Dubai');
 if (!res.ok) throw new Error('Time API error');
 const data = await res.json();
 const dt = new Date(data.datetime);
 const day = pad2(dt.getUTCDate());
 const month = pad2(dt.getUTCMonth() +1);
 const year = String(dt.getUTCFullYear());
 setDate({ day, month, year });
 } catch (e) {
 console.error('Failed to fetch time', e);
 setError('Unable to fetch time from server, using local time');
 const now = new Date();
 const gmtPlus4 = new Date(now.getTime() +4 *60 *60 *1000);
 setDate({
 day: pad2(gmtPlus4.getUTCDate()),
 month: pad2(gmtPlus4.getUTCMonth() +1),
 year: String(gmtPlus4.getUTCFullYear()),
 });
 }
 }

 fetchTime();
 }, []);

 const handleFileChange = (e) => {
 if (e.target.files?.[0]) setFile(e.target.files[0]);
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setError('');
 if (!file || !name.trim()) return setError('Please provide a name and select a file');
 setLoading(true);
 try {
 const reader = new FileReader();
 reader.onload = () => {
 const base64 = reader.result;
 onUpload({
 name: name.trim(),
 url: base64,
 day: date.day,
 month: date.month,
 year: date.year,
 timestamp: new Date().toISOString(),
 });
 setFile(null);
 setName('');
 e.target.reset();
 };
 reader.readAsDataURL(file);
 } catch (err) {
 console.error('Upload failed', err);
 setError('Upload failed');
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="bg-white p-6 rounded-lg shadow-md card">
 <h2 className="text-xl font-semibold mb-4">Upload</h2>
 {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1">Image Name *</label>
 <input
 type="text"
 required
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 input"
 placeholder="Enter name..."
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1">Date (GMT+4)</label>
 <div className="flex gap-2">
 <input type="text" value={date.day} readOnly className="w-20 px-3 py-2 border rounded-lg bg-gray-50 text-center" />
 <input type="text" value={date.month} readOnly className="w-20 px-3 py-2 border rounded-lg bg-gray-50 text-center" />
 <input type="text" value={date.year} readOnly className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-center" />
 </div>
 <p className="text-xs text-gray-500 mt-1">Time retrieved from GMT+4 API</p>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1">Select file *</label>
 <input
 type="file"
 accept="image/*"
 required
 onChange={handleFileChange}
 className="w-full text-sm text-gray-500"
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed btn"
 >
 {loading ? 'Uploading...' : 'Upload Image'}
 </button>
 </form>
 </div>
 );
}
