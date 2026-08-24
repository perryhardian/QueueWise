"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueEntriesModule = void 0;
const common_1 = require("@nestjs/common");
const queues_module_1 = require("../queues/queues.module");
const queue_entries_controller_1 = require("./queue-entries.controller");
const queue_entries_service_1 = require("./queue-entries.service");
let QueueEntriesModule = class QueueEntriesModule {
};
exports.QueueEntriesModule = QueueEntriesModule;
exports.QueueEntriesModule = QueueEntriesModule = __decorate([
    (0, common_1.Module)({
        imports: [queues_module_1.QueuesModule],
        controllers: [queue_entries_controller_1.QueueEntriesController],
        providers: [queue_entries_service_1.QueueEntriesService],
        exports: [queue_entries_service_1.QueueEntriesService],
    })
], QueueEntriesModule);
//# sourceMappingURL=queue-entries.module.js.map