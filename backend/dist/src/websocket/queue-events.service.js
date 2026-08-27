"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueEventsService = void 0;
const common_1 = require("@nestjs/common");
let QueueEventsService = class QueueEventsService {
    server;
    attachServer(server) {
        this.server = server;
    }
    emitQueueEvent(payload) {
        if (!this.server)
            return;
        this.emitToRooms(payload.event, payload);
        if (payload.event !== 'queue.updated') {
            this.emitToRooms('queue.updated', { ...payload, event: 'queue.updated' });
        }
    }
    emitToRooms(event, payload) {
        if (!this.server)
            return;
        this.server.to(`queue:${payload.queueId}`).emit(event, payload);
        if (payload.businessId) {
            this.server.to(`business:${payload.businessId}`).emit(event, payload);
        }
        if (payload.userId) {
            this.server.to(`user:${payload.userId}`).emit(event, payload);
        }
    }
};
exports.QueueEventsService = QueueEventsService;
exports.QueueEventsService = QueueEventsService = __decorate([
    (0, common_1.Injectable)()
], QueueEventsService);
//# sourceMappingURL=queue-events.service.js.map