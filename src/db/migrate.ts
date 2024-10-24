import path from "path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";

(async () => {
	console.log("Running migrations ...");
	await migrate(db, {
		migrationsFolder: path.join(__dirname, "../../migrations"),
	});
	console.log("Migrations ran successfully.");
})();
