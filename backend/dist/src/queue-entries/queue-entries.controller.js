"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueEntriesController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const enums_1 = require("../generated/prisma/enums");
const check_in_dto_1 = require("./dto/check-in.dto");
const join_queue_dto_1 = require("./dto/join-queue.dto");
const walk_in_dto_1 = require("./dto/walk-in.dto");
const queue_entries_service_1 = require("./queue-entries.service");
let QueueEntriesController = class QueueEntriesController {
    queueEntriesService;
    constructor(queueEntriesService) {
        this.queueEntriesService = queueEntriesService;
    }
    joinQueue(user, queueId, dto) {
        return this.queueEntriesService.joinQueue(user.id, queueId, dto);
    }
    myActiveQueue(user) {
        return this.queueEntriesService.getMyActiveQueue(user.id);
    }
    entryStatus(user, entryId) {
        return this.queueEntriesService.getEntryStatus(user.id, entryId);
    }
    cancel(user, entryId) {
        return this.queueEntriesService.cancelEntry(user.id, entryId);
    }
    checkIn(user, entryId, dto) {
        return this.queueEntriesService.checkIn(user.id, entryId, dto);
    }
    walkIn(user, queueId, dto) {
        return this.queueEntriesService.addWalkIn(user.id, queueId, dto);
    }
    callNext(user, queueId) {
        return this.queueEntriesService.callNext(user.id, queueId);
    }
    callEntry(user, entryId) {
        return this.queueEntriesService.callEntry(user.id, entryId);
    }
    startService(user, entryId) {
        return this.queueEntriesService.startService(user.id, entryId);
    }
    completeService(user, entryId) {
        return this.queueEntriesService.completeService(user.id, entryId);
    }
    markNoShow(user, entryId) {
        return this.queueEntriesService.markNoShow(user.id, entryId);
    }
    skipEntry(user, entryId) {
        return this.queueEntriesService.skipEntry(user.id, entryId);
    }
};
exports.QueueEntriesController = QueueEntriesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.CUSTOMER),
    (0, common_1.Post)('queues/:queueId/join'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('queueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, join_queue_dto_1.JoinQueueDto]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "joinQueue", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.CUSTOMER),
    (0, common_1.Get)('queue-entries/me/active'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "myActiveQueue", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.CUSTOMER),
    (0, common_1.Get)('queue-entries/:entryId/status'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "entryStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.CUSTOMER),
    (0, common_1.Post)('queue-entries/:entryId/cancel'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "cancel", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.CUSTOMER),
    (0, common_1.Post)('queue-entries/:entryId/check-in'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, check_in_dto_1.CheckInDto]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "checkIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queues/:queueId/walk-in'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('queueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, walk_in_dto_1.WalkInDto]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "walkIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queues/:queueId/call-next'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "callNext", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queue-entries/:entryId/call'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "callEntry", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queue-entries/:entryId/start'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "startService", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queue-entries/:entryId/complete'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "completeService", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queue-entries/:entryId/no-show'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "markNoShow", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queue-entries/:entryId/skip'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('entryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueueEntriesController.prototype, "skipEntry", null);
exports.QueueEntriesController = QueueEntriesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [queue_entries_service_1.QueueEntriesService])
], QueueEntriesController);
//# sourceMappingURL=queue-entries.controller.js.map