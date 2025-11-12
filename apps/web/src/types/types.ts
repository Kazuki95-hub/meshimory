export type MealRecord = {
    id: string;
    shopName: string;
    genre: string;
    rating: number;
    comment: string;
    date: string;
    images: string[];
};

export type Trip = {
    id: string;
    tripTitle: string;
    startDate: string;
    endDate: string;
    records: MealRecord[];
};