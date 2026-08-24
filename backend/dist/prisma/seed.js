"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../src/generated/prisma/client");
const enums_1 = require("../src/generated/prisma/enums");
const datasourceUrl = process.env['DATABASE_URL'];
if (!datasourceUrl) {
    throw new Error('DATABASE_URL is required to seed the database');
}
const prisma = new client_1.PrismaClient({ adapter: new adapter_pg_1.PrismaPg({ connectionString: datasourceUrl }) });
async function main() {
    const categories = await Promise.all([
        ['Barbershop', 'barbershop'],
        ['Salon', 'salon'],
        ['Clinic', 'clinic'],
        ['Workshop', 'workshop'],
        ['Restaurant', 'restaurant'],
        ['Service', 'service'],
        ['Other', 'other'],
    ].map(([name, slug]) => prisma.businessCategory.upsert({
        where: { slug },
        update: { name },
        create: { name, slug },
    })));
    const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
    const passwordHash = await bcrypt.hash('password123', 12);
    const merchantUser = await prisma.user.upsert({
        where: { email: 'merchant@queuewise.test' },
        update: { fullName: 'QueueWise Merchant', role: enums_1.Role.MERCHANT },
        create: {
            fullName: 'QueueWise Merchant',
            email: 'merchant@queuewise.test',
            phoneNumber: '+628111111111',
            passwordHash,
            role: enums_1.Role.MERCHANT,
        },
    });
    const merchant = await prisma.merchant.upsert({
        where: { userId: merchantUser.id },
        update: { displayName: 'QueueWise Demo Merchant' },
        create: { userId: merchantUser.id, displayName: 'QueueWise Demo Merchant' },
    });
    const demoBusinesses = [
        {
            name: 'ABC Barbershop',
            slug: 'barbershop',
            address: 'Jl. Kemang Raya No. 12, Jakarta',
            latitude: -6.2607,
            longitude: 106.8169,
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
            currentNumber: 'A012',
            waiting: 3,
            average: 10,
            services: [['Haircut', 10, 75000], ['Hair wash', 8, 35000]],
        },
        {
            name: 'Sehat Sentosa Clinic',
            slug: 'clinic',
            address: 'Jl. Senopati No. 8, Jakarta',
            latitude: -6.2278,
            longitude: 106.8089,
            rating: 4.6,
            imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d',
            currentNumber: 'B004',
            waiting: 5,
            average: 12,
            services: [['General consultation', 12, 150000], ['Health check', 20, 250000]],
        },
        {
            name: 'Kopi Sore Waiting List',
            slug: 'restaurant',
            address: 'Jl. Cipete Raya No. 21, Jakarta',
            latitude: -6.2765,
            longitude: 106.7972,
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
            currentNumber: 'C021',
            waiting: 2,
            average: 15,
            services: [['Table for 2', 15, null], ['Table for 4', 20, null]],
        },
    ];
    for (const item of demoBusinesses) {
        const category = categoryBySlug.get(item.slug);
        const business = await prisma.business.upsert({
            where: { qrCodeToken: `demo-${item.slug}` },
            update: {
                name: item.name,
                address: item.address,
                latitude: item.latitude,
                longitude: item.longitude,
                rating: item.rating,
                imageUrl: item.imageUrl,
                categoryId: category.id,
            },
            create: {
                merchantId: merchant.id,
                categoryId: category.id,
                name: item.name,
                description: `${item.name} demo business for QueueWise discovery.`,
                address: item.address,
                latitude: item.latitude,
                longitude: item.longitude,
                rating: item.rating,
                imageUrl: item.imageUrl,
                qrCodeToken: `demo-${item.slug}`,
                openingHours: { monday: '09:00-18:00', tuesday: '09:00-18:00', wednesday: '09:00-18:00' },
            },
        });
        for (const [name, duration, price] of item.services) {
            await prisma.service.upsert({
                where: { id: `${business.id}-${name}` },
                update: { name: String(name), estimatedDurationMinutes: Number(duration), price: price == null ? null : Number(price) },
                create: { id: `${business.id}-${name}`, businessId: business.id, name: String(name), estimatedDurationMinutes: Number(duration), price: price == null ? null : Number(price) },
            });
        }
        const queue = await prisma.queue.create({
            data: {
                businessId: business.id,
                status: enums_1.QueueStatus.OPEN,
                currentNumber: item.currentNumber,
                nextSequence: item.waiting + 1,
                averageServiceTimeMinutes: item.average,
                openedAt: new Date(),
            },
        });
        for (let index = 1; index <= item.waiting; index += 1) {
            await prisma.queueEntry.create({
                data: {
                    queueId: queue.id,
                    queueNumber: `${item.currentNumber.charAt(0)}${String(index + 12).padStart(3, '0')}`,
                    sequenceNumber: index,
                    source: enums_1.QueueEntrySource.WALK_IN,
                    status: index === 1 ? enums_1.QueueEntryStatus.CHECKED_IN : enums_1.QueueEntryStatus.WAITING,
                },
            });
        }
    }
}
main()
    .then(async () => prisma.$disconnect())
    .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map