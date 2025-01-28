export interface Teacher {
    id: number;
    name: string;
    email: string;
    subject: string;
}

export const teachers: Teacher[] = [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Math" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Science" },
];