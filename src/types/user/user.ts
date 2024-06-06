export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    lastActive: Date;
}