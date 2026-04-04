'use server';

import { connectToDatabase } from "@/database/mongoose";


export const getAllUsersforNewsEmail = async () => { 
    try {
        const mongoose = await connectToDatabase();
        const client = mongoose.connection.getClient();
        const db = client.db('user');
        if (!db) throw new Error('Mongoose connection not connected');
        
        const users = await db.collection('signindata').find(
            { email: { $exists: true, $ne: null } },// Only fetch users with a valid email
            { projection: { _id: 1, id: 1,email: 1, name: 1, country: 1 } } // Only return email and name fields
        ).toArray();

        return users.filter((user) => user.email && user.name).map((user) => ({
            id: user.id || user._id?.toString(), // Use 'id' if available, otherwise fallback to '_id'
            email: user.email,
            name: user.name
        })); // Ensure email is a non-empty string
    } catch (e) {
        console.error('Error fetching users for news email:', e);
        return [];
    }
}