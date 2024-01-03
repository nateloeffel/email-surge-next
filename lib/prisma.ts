import { PrismaClient } from "@prisma/client";

// Declare a type for the global variable to avoid TypeScript errors
declare global {
	var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// // Check if we're in a production environment
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
// Ensure that in development, only one instance of Prisma Client is used across hot reloads
if (!global.prisma) {
	global.prisma = new PrismaClient();
}
prisma = global.prisma;
// }

export default prisma;