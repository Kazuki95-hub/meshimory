import { existsSync } from 'fs';
import { useEffect, useRef, useState } from 'react';
import { Trip } from "./types/types";
import AddTripForm from './components/TripForm';

export default function App() {
    const [shopName, setShopName] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState<number>(3);
    const [comment, setComment] = useState('');
    const [records, setRecords] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [image, setImage] = useState<String[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('meshiMoryData') || '[]');
        setRecords(saved);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const today = new Date();
        const formattedDate = today.toLocaleDateString("ja-JP");

        const newData = { shopName, genre, rating, comment, date: formattedDate, image };

        const exisitingData = JSON.parse(localStorage.getItem('meshiMoryData') || '[]');

        //スプレッド構文
        const updated = [...exisitingData, newData];
        localStorage.setItem('meshiMoryData', JSON.stringify(updated));
        setRecords(updated);

        setShopName('');
        setGenre('');
        setRating(3);
        setComment('');
        setImage([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // ←ここでinputの中身を手動でリセット
        }
        alert('記録しました！');
    };

    const handleDelete = (index: number) => {
        const isConfirmed = window.confirm("この記録を削除しますか？");

        if (!isConfirmed) return;
        const upated = records.filter((_, i) => i !== index);
        localStorage.setItem('meshiMoryData', JSON.stringify(upated));
        setRecords(upated);
    }

    const groupedRecords = records.reduce((groups: any, record) => {
        const date = record.date || "日付なし";
        if (!groups[date]) groups[date] = [];
        groups[date].push(record);
        return groups;
    }, {});
    return (
        <main style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
            <h1>MeshiMory 🍜</h1>
            <AddTripForm />
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
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return; // ← ファイルが無いときはここで抜ける

                        // FileList → 配列化
                        const readers = Array.from(files).map((file) => {
                            return new Promise<string>((resolve) => {
                                const reader = new FileReader();

                                reader.onloadend = () => resolve(reader.result as string);
                                reader.readAsDataURL(file);
                            });
                        });

                        // 全部の画像読み込みが終わったら state にセット
                        Promise.all(readers).then((base64Array) => setImage(base64Array));
                    }}
                />
                <button type="submit">記録する</button>
            </form>
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                style={{
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    marginTop: "2rem",
                    marginBottom: "1rem",
                }}> 並び順：{sortOrder === "asc" ? "古い順" : "新しい順"}
            </button>
            {/* 🧾 一覧表示 */}
            <section>
                <h2>これまでの記録</h2>
                {Object.keys(groupedRecords)
                    .sort((a, b) => {
                        if (sortOrder === "asc") {
                            return a > b ? 1 : -1;
                        } else {
                            return a < b ? 1 : -1;
                        }
                    })
                    .map((date) => (
                        <div key={date}>
                            <h2 style={{ marginTop: "2rem", color: "#444" }}>📅 {date}</h2>

                            {groupedRecords[date].map((r: any, i: number) => (
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
                                    <h3>🍽️ {r.shopName}（{r.genre || "ジャンル未設定"}）</h3>
                                    <p>⭐ {r.rating}/5</p>
                                    {r.comment && <p>{r.comment}</p>}
                                    {r.image && Array.isArray(r.image) && (
                                        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
                                            {r.image.map((imgSrc: string, j: number) => (
                                                <img
                                                    key={j}
                                                    src={imgSrc}
                                                    alt={`preview ${j}`}
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleDelete(i)}
                                        style={{
                                            background: "#ff4d4f",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "5px",
                                            padding: "0.3rem 0.6rem",
                                            cursor: "pointer",
                                            marginTop: "0.5rem",
                                        }}
                                    >
                                        削除
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
            </section>
        </main >
    );
}