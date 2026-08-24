import { Controller, Get, Param, Query } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessQueryDto } from './dto/business-query.dto';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get('categories')
  categories() {
    return this.businessesService.findCategories();
  }

  @Get('nearby')
  nearby(@Query() query: BusinessQueryDto) {
    return this.businessesService.findNearby(query);
  }

  @Get()
  findAll(@Query() query: BusinessQueryDto) {
    return this.businessesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessesService.findOne(id);
  }
}