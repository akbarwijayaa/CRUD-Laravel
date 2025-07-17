import { usePage } from '@inertiajs/react';

interface User {
    id: string | number;
    name: string;
}

interface PageProps {
    gendhelId: string;
    users: User[];
}

const Gendhel = () => {
    const { gendhelId, users } = usePage().props as unknown as PageProps;
    // console.log(users); // Log the users data to the console for debugging

    return (
        <div>
            <h1>Gendhel Page {gendhelId}</h1>
            <h2>Users List</h2>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            <p>This is the Gendhel page content.</p>
        </div>
    );
}

export default Gendhel;