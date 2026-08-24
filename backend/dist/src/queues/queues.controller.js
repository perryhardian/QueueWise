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
exports.QueuesController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const enums_1 = require("../generated/prisma/enums");
const open_queue_dto_1 = require("./dto/open-queue.dto");
const queues_service_1 = require("./queues.service");
let QueuesController = class QueuesController {
    queuesService;
    constructor(queuesService) {
        this.queuesService = queuesService;
    }
    getBusinessQueue(businessId) {
        return this.queuesService.getBusinessQueue(businessId);
    }
    getQueueStatus(queueId) {
        return this.queuesService.getQueueStatus(queueId);
    }
    getMerchantDashboard(user, queueId) {
        return this.queuesService.getMerchantDashboard(user.id, queueId);
    }
    getMerchantQueueEntries(user, queueId) {
        return this.queuesService.getMerchantQueueEntries(user.id, queueId);
    }
    openQueue(user, businessId, dto) {
        return this.queuesService.openQueue(user.id, businessId, dto);
    }
    closeQueue(user, queueId) {
        return this.queuesService.closeQueue(user.id, queueId);
    }
    pauseQueue(user, queueId) {
        return this.queuesService.pauseQueue(user.id, queueId);
    }
};
exports.QueuesController = QueuesController;
__decorate([
    (0, common_1.Get)('businesses/:businessId/queue'),
    __param(0, (0, common_1.Param)('businessId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueuesController.prototype, "getBusinessQueue", null);
__decorate([
    (0, common_1.Get)('queues/:queueId/status'),
    __param(0, (0, common_1.Param)('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueuesController.prototype, "getQueueStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Get)('merchant/queues/:queueId/dashboard'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueuesController.prototype, "getMerchantDashboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Get)('merchant/queues/:queueId/entries'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueuesController.prototype, "getMerchantQueueEntries", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/businesses/:businessId/queues/open'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('businessId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, open_queue_dto_1.OpenQueueDto]),
    __metadata("design:returntype", void 0)
], QueuesController.prototype, "openQueue", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queues/:queueId/close'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueuesController.prototype, "closeQueue", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.MERCHANT),
    (0, common_1.Post)('merchant/queues/:queueId/pause'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('queueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QueuesController.prototype, "pauseQueue", null);
exports.QueuesController = QueuesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [queues_service_1.QueuesService])
], QueuesController);
//# sourceMappingURL=queues.controller.js.map