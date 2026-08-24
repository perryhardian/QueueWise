import { Injectable, NotFoundException } from '@nestjs/common';
import { QueueEntryStatus, QueueStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessQueryDto } from './dto/business-query.dto';

const activeEntryStatuses = [
  QueueEntryStatus.WAITING,
  QueueEntryStatus.CHECKED_IN,
  QueueEntryStatus.CALLED,
  QueueEntryStatus.SERVING,
];

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

  async findCategories() {
    return this.prisma.businessCategory.findMany({ orderBy: { name: 'asc' } });
  }

  async findAll(query: BusinessQueryDto) {
    const businesses = await this.prisma.business.findMany({
      where: {
        ...(query.search
          ? {
              OR: [
                { name: { contains: query.search, mode: 'insensitive' } },
                { address: { contains: query.search, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(query.category ? { category: { slug: query.category } } : {}),
      },
      include: this.businessInclude(),
      orderBy: { name: 'asc' },
    });

    let items = businesses.map((business) => this.toBusinessSummary(business, query.latitude, query.longitude));

    if (query.latitude != null && query.longitude != null && query.radiusKm != null) {
      items = items.filter((business) => business.distanceKm != null && business.distanceKm <= query.radiusKm!);
    }

    if (query.queueLength === 'shortest') {
      items.sort((a, b) => a.queue.peopleWaiting - b.queue.peopleWaiting);
    }

    if (query.queueLength === 'longest') {
      items.sort((a, b) => b.queue.peopleWaiting - a.queue.peopleWaiting);
    }

    return items;
  }

  async findNearby(query: BusinessQueryDto) {
    if (query.latitude == null || query.longitude == null) {
      return this.findAll(query);
    }

    const businesses = await this.findAll({ ...query, radiusKm: query.radiusKm ?? 25 });
    return businesses.sort((a, b) => (a.distanceKm ?? Number.MAX_VALUE) - (b.distanceKm ?? Number.MAX_VALUE));
  }

  async findOne(id: string) {
    const business = await this.prisma.business.findUnique({
      where: { id },
      include: this.businessInclude(),
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    return this.toBusinessDetail(business);
  }

  private businessInclude() {
    return {
      category: true,
      services: { orderBy: { name: 'asc' as const } },
      queues: {
        where: { status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] } },
        orderBy: { openedAt: 'desc' as const },
        take: 1,
        include: {
          entries: {
            where: { status: { in: activeEntryStatuses } },
            orderBy: { sequenceNumber: 'asc' as const },
          },
        },
      },
    };
  }

  private toBusinessSummary(business: BusinessWithQueue, latitude?: number, longitude?: number) {
    const queue = business.queues[0];
    const peopleWaiting = queue?.entries.length ?? 0;
    const averageServiceTimeMinutes = queue?.averageServiceTimeMinutes ?? 10;

    return {
      id: business.id,
      name: business.name,
      description: business.description,
      imageUrl: business.imageUrl,
      rating: business.rating == null ? null : Number(business.rating),
      address: business.address,
      distanceKm: this.distanceKm(business, latitude, longitude),
      category: business.category,
      queue: {
        id: queue?.id ?? null,
        status: queue?.status ?? QueueStatus.CLOSED,
        currentNumber: queue?.currentNumber ?? null,
        peopleWaiting,
        estimatedWaitingTimeMinutes: peopleWaiting * averageServiceTimeMinutes,
        averageServiceTimeMinutes,
      },
    };
  }

  private toBusinessDetail(business: BusinessWithQueue) {
    const summary = this.toBusinessSummary(business);
    return {
      ...summary,
      openingHours: business.openingHours,
      services: business.services.map((service) => ({
        id: service.id,
        name: service.name,
        estimatedDurationMinutes: service.estimatedDurationMinutes,
        price: service.price == null ? null : Number(service.price),
      })),
    };
  }

  private distanceKm(business: BusinessWithQueue, latitude?: number, longitude?: number) {
    if (latitude == null || longitude == null || business.latitude == null || business.longitude == null) {
      return null;
    }

    const lat1 = latitude;
    const lon1 = longitude;
    const lat2 = Number(business.latitude);
    const lon2 = Number(business.longitude);
    const earthRadiusKm = 6371;
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    return Math.round(earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
  }

  private toRadians(value: number) {
    return (value * Math.PI) / 180;
  }
}

type BusinessWithQueue = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  rating: unknown;
  address: string;
  latitude: unknown;
  longitude: unknown;
  openingHours: unknown;
  category: { id: string; name: string; slug: string; createdAt: Date; updatedAt: Date };
  services: Array<{ id: string; name: string; estimatedDurationMinutes: number | null; price: unknown }>;
  queues: Array<{
    id: string;
    status: QueueStatus;
    currentNumber: string | null;
    averageServiceTimeMinutes: number;
    entries: Array<{ id: string }>;
  }>;
};