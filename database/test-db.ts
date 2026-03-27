import { connectToDatabase } from "../database/mongoose";

async function main() {
    try {
        await connectToDatabase();
        console.log("OK : Database connected");
        process.exit(0);
    } catch (err) {
        console.error("ERROR : Database connected");
        console.error(err);
        process.exit(1);
    }
}

main()