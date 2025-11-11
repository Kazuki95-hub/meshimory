import { Trip } from "../types/types";
type Props = {
    trips: Trip[];
};

export default function TripList({ trips }: Props) {
    return (
        <div>
            <h2>✈️ 登録した旅一覧</h2>
            {trips.map((trip) => (
                <div
                    key={trip.id}
                    onClick={() => console.log("クリックされた旅:", trip.id)}
                    style={{ cursor: "pointer", borderBottom: "1px solid #ccc", padding: "8px" }}
                >
                    <h3>{trip.tripTitle}</h3>
                    <p>
                        {trip.startDate} ～ {trip.endDate}
                    </p>
                </div>
            ))}
        </div>
    );
}