import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/@types/api';
import { Routes } from 'src/routes';
import { OrganizationGuard } from 'src/shared/guards/organization.guard';
import { OrganizationInterceptor } from 'src/shared/interceptors/organization.interceptor';
import { CreateAttributeDTO } from '../models/attribute.dto';
import { AttributeService } from '../services/attribute.service';

@UseGuards(AuthGuard('jwt'), OrganizationGuard)
@UseInterceptors(OrganizationInterceptor)
@Controller(Routes.attribute.root)
export class AttributeController {
  constructor(private attributeService: AttributeService) {}

  @Get()
  async getAll(@Request() request: IRequest) {
    return this.attributeService.getAll(
      request.organizationId,
      request.pagination,
    );
  }

  @Post()
  async createAttribute(
    @Request() request: IRequest,
    @Body() attribute: CreateAttributeDTO,
  ) {
    return this.attributeService.create(request.organizationId, attribute);
  }
}
