import 'dotenv/config';
import mongoose from 'mongoose';
import dns from 'node:dns/promises';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function main() {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
        console.log('ERROR: No DB present');
        process.exit(1);
    }

    try {
        const startedAt = Date.now();
        await mongoose.connect(uri, { bufferCommands: false });
        const elapsed = Date.now() - startedAt;
        
        const dbName = mongoose.connection?.name || '(unknown)';
        const host = mongoose.connection?.host || '(unknown)';

        console.log(`OK: Connected to MongoDB [db="${dbName}" , host="${host}", time="${elapsed}" ] `);

        await mongoose.connection.close();
        process.exit(0);

    } catch (err) {
        console.error('ERROR: Database connection failed');
        console.log(err);
        try {
            await mongoose.connection.close();
        } catch { }
        
        process.exit(1);
    }
}

main();