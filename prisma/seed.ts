import { PrismaClient } from '@prisma/client';
import ccList from '../assets/country-code.json';

const prisma = new PrismaClient();

async function main() {
    for (const cc of ccList) {
        await prisma.countryCode.create({
            data: {
                code: cc.code,
                country: cc.country,
            }
        });
    }
}


main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});
