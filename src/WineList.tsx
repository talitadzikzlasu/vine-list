import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Wine {
    name: string;
}

const WineList: React.FC = () => {
    const [wines, setWines] = useState<Wine[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.vivino.com/vintages/_explore', {
                    params: {
                        limit: 50,
                        q: 'cabernet sauvignon'
                    }
                });
                setWines(response.data);
            } catch (error) {
                setError('Failed to fetch wines');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Wine List</h1>
            <ul>
                {wines.map((wine, index) => (
                    <li key={index}>{wine.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default WineList;
