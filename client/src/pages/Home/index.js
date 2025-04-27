import React, { useEffect } from 'react'
import { GetCurrentUser } from '../../api/users'

function Home() {

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await GetCurrentUser();
                console.log(response);
            } catch (err) {
                console.error("Failed to fetch current user:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            Home
        </div>
    )
}

export default Home
