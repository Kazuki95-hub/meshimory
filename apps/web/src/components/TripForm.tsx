import { useState } from "react";
import { Trip } from "../types/types";

type Props = {
    onAddTrip: (trip: Trip) => void;
};

export default function AddTripForm({ onAddTrip }: Props) {
    const [tripTitle, setTripTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTrip: Trip = {
            id: Date.now().toString(),
            tripTitle,
            startDate,
            endDate,
            records: [],
        };

        onAddTrip(newTrip);

        console.log("追加された旅:", newTrip);
        setTripTitle('');
        setStartDate('');
        setEndDate('');
    }
    return (
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
            <button type="submit">旅を追加</button>
        </form>
    )
}