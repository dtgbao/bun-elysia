declare module "bun" {
	interface Env {
		DATABASE_URL: string;
		PORT?: number;
	}
}
