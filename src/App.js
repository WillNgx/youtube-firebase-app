import { useState, useEffect } from 'react';
import { Camera, Heart, MessageCircle, Share2, Save } from 'lucide-react';

export default function YouTubeFirebaseApp() {
    const [videos, setVideos] = useState([]);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [newVideoTitle, setNewVideoTitle] = useState('');
    const [likes, setLikes] = useState({});

    // Load videos from memory storage on mount
    useEffect(() => {
        const savedVideos = [
            {
                id: '1',
                title: 'React Tutorial for Beginners',
                url: 'https://www.youtube.com/embed/SqcY0GlETPk',
                addedAt: new Date().toISOString()
            }
        ];
        setVideos(savedVideos);

        const savedLikes = {};
        savedVideos.forEach(v => {
            savedLikes[v.id] = 0;
        });
        setLikes(savedLikes);
    }, []);

    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const addVideo = () => {
        if (newVideoUrl && newVideoTitle) {
            const videoId = extractVideoId(newVideoUrl);
            if (videoId) {
                const newVideo = {
                    id: Date.now().toString(),
                    title: newVideoTitle,
                    url: `https://www.youtube.com/embed/${videoId}`,
                    addedAt: new Date().toISOString()
                };

                const updatedVideos = [...videos, newVideo];
                setVideos(updatedVideos);
                setLikes(prev => ({ ...prev, [newVideo.id]: 0 }));

                setNewVideoUrl('');
                setNewVideoTitle('');
            } else {
                alert('URL YouTube không hợp lệ!');
            }
        }
    };

    const handleLike = (videoId) => {
        setLikes(prev => ({
            ...prev,
            [videoId]: (prev[videoId] || 0) + 1
        }));
    };

    const deleteVideo = (videoId) => {
        setVideos(videos.filter(v => v.id !== videoId));
        const newLikes = { ...likes };
        delete newLikes[videoId];
        setLikes(newLikes);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Video Gallery
                        </h1>
                    </div>
                    <p className="text-gray-600 mt-2">Quản lý và chia sẻ video YouTube yêu thích</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Add Video Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Thêm Video Mới</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tiêu đề video
                            </label>
                            <input
                                type="text"
                                value={newVideoTitle}
                                onChange={(e) => setNewVideoTitle(e.target.value)}
                                placeholder="Nhập tiêu đề video..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL YouTube
                            </label>
                            <input
                                type="text"
                                value={newVideoUrl}
                                onChange={(e) => setNewVideoUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <button
                            onClick={addVideo}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Thêm Video
                        </button>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="aspect-video">
                                <iframe
                                    src={video.url}
                                    title={video.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                                    {video.title}
                                </h3>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleLike(video.id)}
                                            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                                        >
                                            <Heart className="w-5 h-5" />
                                            <span className="text-sm font-medium">{likes[video.id] || 0}</span>
                                        </button>

                                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                        </button>

                                        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => deleteVideo(video.id)}
                                        className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                                    >
                                        Xóa
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 mt-3">
                                    {new Date(video.addedAt).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {videos.length === 0 && (
                    <div className="text-center py-16">
                        <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            Chưa có video nào
                        </h3>
                        <p className="text-gray-400">
                            Thêm video YouTube đầu tiên của bạn!
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}