export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    image: string;
    role: string;
    birthDate: string;
    height: number;
    weight: number;
    bloodGroup: string;
    university: string;

    address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        country: string;
    };

    company: {
        name: string;
        department: string;
        title: string;
    };
}