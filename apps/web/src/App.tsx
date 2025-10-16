import { existsSync } from 'fs';
import { useEffect, useState } from 'react';

export default function App() {
    const [shopName, setShopName] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState<number>(3);
    const [comment, setComment] = useState('');
    const [records, setRecords] = useState<any[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('meshiMoryData') || '[]');
        setRecords(saved);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newData = { shopName, genre, rating, comment };

        const exisitingData = JSON.parse(localStorage.getItem('meshiMoryData') || '[]');

        //スプレッド構文
        const updated = [...exisitingData, newData];
        localStorage.setItem('meshiMoryData', JSON.stringify(updated));
        setRecords(updated);

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
            {/* 🧾 一覧表示 */}
            <section>
                <h2>これまでの記録</h2>
                {records.length === 0 ? (
                    <p>まだ記録がありません</p>
                ) : (
                    records.map((r, i) => (
                        <div
                            key={i}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "1rem",
                                marginBottom: "1rem",
                                textAlign: "left",
                            }}
                        >
                            <h3>
                                🍽️ {r.shopName}（{r.genre || "ジャンル未設定"}）
                            </h3>
                            <p>⭐ {r.rating}/5</p>
                            {r.comment && <p>{r.comment}</p>}
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}