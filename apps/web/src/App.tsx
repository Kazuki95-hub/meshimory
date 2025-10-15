import { existsSync } from 'fs';
import { useState } from 'react';

export default function App() {
    const [shopName, setShopName] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState<number>(3);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newData = { shopName, genre, rating, comment };

        const exisitingData = JSON.parse(localStorage.getItem('meshiMoryData') || '[]');

        const updated = [...exisitingData, newData];
        localStorage.setItem('meshiMoryData', JSON.stringify(updated));

        setShopName('');
        setGenre('');
        setRating(3);
        setComment('');
        alert('記録しました！');
    };

    return (
        <main style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
            <h1>MeshiMory 🍜</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    type="text"
                    placeholder="店名を入力"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ジャンル（例：ラーメン、カフェ）"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <label>
                    評価（1〜5）：
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </label>
                <textarea
                    placeholder="コメント"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">記録する</button>
            </form>
        </main>
    );
}