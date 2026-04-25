import { useState, useEffect } from 'react';
import { projects } from '../data/mockData';
import { API_BASE_URL as API } from '../api/config';

// Fallback seed from mockData
const mockSeed = projects.map(p => ({
    ...p,
    id: String(p.id),
    price: p.price || (p.id * 50 + 100),
    stock: 100,
    availability: 'In Stock',
    unit: '1 Liter Bottle',
    image: p.image || '/images/polyester-fabric.webp',
}));

/**
 * useProducts — reads live product data from the backend API.
 * Falls back to mockData if nothing is available yet.
 */
export const useProducts = () => {
    const [products, setProducts] = useState(mockSeed);

    // Fetch fresh data from the backend
    useEffect(() => {
        fetch(`${API}/api/products`)
            .then(r => r.json())
            .then(data => {
                if (data.success && Array.isArray(data.products) && data.products.length > 0) {
                    const normalized = data.products.map(p => ({ ...p, id: p._id || p.id }));
                    setProducts(normalized);
                }
            })
            .catch(() => { }); // silent fallback to mockSeed
    }, []);

    return products;
};
