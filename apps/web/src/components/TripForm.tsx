import { useState } from "react";
import { Trip } from "../types/types";

export default function AddTripForm() {
    const [tripTitle, setTripTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
}