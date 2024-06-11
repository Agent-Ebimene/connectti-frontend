export interface User {
    id?: string;
    firstName?: string;
    lastName: string;
    email: string;
    description: string;
    dateOfBirth: Date;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastActive?: Date;
}
export interface CreateUserData extends Pick<User, 'firstName' | 'lastName' | 'email' | 'password' | 'dateOfBirth' | 'description'> { }
export interface RegisterUserData extends Pick<User, 'email' | 'password'> {

}