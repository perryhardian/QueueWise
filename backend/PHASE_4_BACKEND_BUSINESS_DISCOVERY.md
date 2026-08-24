# QueueWise - Phase 4 Backend Business Discovery

## Implemented

- `GET /api/businesses/categories`
- `GET /api/businesses`
- `GET /api/businesses/nearby`
- `GET /api/businesses/:id`
- Search by business name/address.
- Category filtering by category slug.
- Queue length sorting.
- Nearby sorting/filtering when latitude and longitude are provided.
- Business detail response with services and live queue summary.
- Seed data for categories, demo merchant, demo businesses, services, open queues, and initial queue entries.

## Query Parameters

- `search`
- `category`
- `queueLength=shortest|longest`
- `latitude`
- `longitude`
- `radiusKm`

## Notes

- Queue counts come from active queue entries in the database.
- This phase exposes queue status for discovery only. Joining and mutating queues starts in Phase 5.