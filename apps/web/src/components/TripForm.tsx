import { useState } from "react";
import { Trip } from "../types/types";

export default function AddTripForm() {
    const [tripTitle, setTripTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="旅のタイトル"
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
            required
        />
        <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
        />
        <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
        />
    </form>
}