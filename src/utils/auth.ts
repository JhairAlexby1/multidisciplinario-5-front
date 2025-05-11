"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            router.push('/login');
        }
    }, [router]);

    const logout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    const getCurrentUser = () => {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    };

    return { logout, getCurrentUser };
};