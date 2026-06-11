import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

async function testConnection() {
	try {
		await prisma.$connect();
		console.log("Prisma: conexão bem-sucedida");
		await prisma.$disconnect();
		return true;
	} catch (error) {
		console.error("Prisma: erro de conexão:", error.message || error);
		return false;
	}
}

export { prisma, testConnection };
