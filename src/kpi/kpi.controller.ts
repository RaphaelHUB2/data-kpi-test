import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiHeader, ApiHeaders, ApiOkResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Patch, BadRequestException, Delete, Get, ConflictException, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { ApiKeyGuard } from '@app/guards/api-key.guard';
import { BadRequest } from '@app/dtos/bad-request.dto.';
import { Conflict } from '@app/dtos/conflict.dto';
import { CreateKpi } from '@app/dtos/create-kpi.dto';
import { KPI } from '@app/entities/kpi.entity';
import { KpiDataDto } from '@app/dtos/kpi.dto';
import { KpiEnum } from '@app/enums/kpi.enum';
import { Unauthorized } from '@app/dtos/unauthorized.dto';
import { UpdateKpi } from '@app/dtos/update-kpi.dto';

import { KpiService } from './kpi.service';


@Controller('kpi')
@UsePipes(new ValidationPipe({ transform: true }))
export class KpiController {

  private static readonly DEFAULT_LOCALE: string = 'en';

  constructor(private readonly kpiService: KpiService) { }

  @Post()
  @ApiOperation({
    summary: 'Register a KPI',
    description: 'Create a KPI for display',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
  ])
  @ApiBody({
    type: CreateKpi,
  })
  @ApiConflictResponse({ type: Conflict, description: 'Conflict' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiCreatedResponse({ type: KPI, description: 'Successful request' })
  @ApiExtraModels(CreateKpi, KPI, BadRequest, Conflict, Unauthorized)
  @UseGuards(ApiKeyGuard)
  async createKPI(
    @Body() dto: CreateKpi,
  ): Promise<KPI> {
    const existingKPI = await this.kpiService.findOne(dto.date, dto.type);
    if (existingKPI) {
      throw new ConflictException();
    }
    return this.kpiService.createKpi(dto.date, dto.type, dto.value);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update a KPI',
    description: 'Update a KPI for display',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
  ])
  @ApiBody({ type: UpdateKpi })
  @ApiOkResponse({ type: KPI, description: 'Successful request' })
  @ApiConflictResponse({ type: Conflict, description: 'Conflict' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiExtraModels(UpdateKpi, KPI, BadRequest, Conflict, Unauthorized)
  @UseGuards(ApiKeyGuard)
  async updateKPI(
    @Body() dto: UpdateKpi,
  ): Promise<KPI | null> {
    const nonEmptyKeys = Object.entries(dto)
      .filter((entry) => entry?.length > 1 && entry[1])
      .map(([key]: string[]) => key);

    //requires at least id + another arguments
    if (nonEmptyKeys.length < 2) {
      throw new BadRequestException();
    }

    return this.kpiService.updateKpi(dto);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete a KPI',
    description: 'Delete a KPI',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
  ])
  @ApiQuery({ name: 'id', type: Number, example: 2, description: 'Id of the KPI to delete' })
  @ApiOkResponse({ type: Boolean, description: 'Successful request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiExtraModels(BadRequest, Unauthorized)
  @UseGuards(ApiKeyGuard)
  async deleteKPI(
    @Query('id') id: number,
  ): Promise<boolean> {
    return this.kpiService.remove(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Display a KPI',
    description: 'Display a KPI',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
  ])
  @ApiQuery({ name: 'id', type: Number, example: 2, description: 'Id of the KPI to display' })
  @ApiOkResponse({ type: KPI, description: 'Successful request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiExtraModels(KPI, BadRequest, Unauthorized)
  @UseGuards(ApiKeyGuard)
  async getKPI(
    @Query('id') id: number,
  ): Promise<KPI> {
    return this.kpiService.getKPI(id);
  }

  @Get('list')
  @ApiOperation({
    summary: 'Display a KPI List',
    description: 'Display the KPI List for the given dates and type',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
  ])
  @ApiQuery({ name: 'from', type: Date, description: 'The start date in ISO8601 format', example: '2020-02-23T09:28:47.081Z' })
  @ApiQuery({ name: 'to', type: Date, description: 'The end date in ISO8601 format', example: '2023-02-23T09:28:47.081Z' })
  @ApiQuery({ name: 'type', enum: KpiEnum, description: 'Type of the KPI to display' })
  @ApiOkResponse({ type: KPI, isArray: true, description: 'Successful request' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiExtraModels(KPI, BadRequest, Unauthorized)
  @UseGuards(ApiKeyGuard)
  async getKPIList(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('type') type?: KpiEnum,
  ): Promise<KPI[]> {
    if (!from || !to) {
      throw new BadRequestException();
    }

    return type
      ? this.kpiService.getListKPI(from, to, [type])
      : this.kpiService.getListKPI(from, to);
  }

  @Get('/latest')
  @ApiOperation({
    summary: 'Display mean values for all KPI',
    description: `Display mean values for all registered KPI since 1970.`,
  })
  @ApiHeader({
    name: 'Accept-Language',
    description: `Language used to format response data`,
    example: KpiController.DEFAULT_LOCALE,
    required: false,
  })
  @ApiOkResponse({ type: KpiDataDto, description: 'Successful request' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiExtraModels(KpiDataDto, BadRequest)
  async getLatestKPI(
    @I18n() i18n: I18nContext,
  ): Promise<any[]> {
    const { lang }: { lang: string } = i18n;
    const from = new Date('1970-01-01 00:00:00.000+00');
    const now = new Date();
    return this.kpiService.getLatestKPI(from.toISOString(), now.toISOString(), lang);
  }

  // For the moment return the same data as get /latest
  @Get('/private')
  @ApiOperation({
    summary: 'Display private KPIs',
    description: `Display private KPIs.`,
  })
  @ApiHeader({
    name: 'Accept-Language',
    description: `Language used to format response data`,
    example: KpiController.DEFAULT_LOCALE,
    required: false,
  })
  @ApiOkResponse({ type: KpiDataDto, description: 'Successful request' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiExtraModels(KpiDataDto, BadRequest)
  @UseGuards(ApiKeyGuard)
  async getPrivateKPI(@I18n() i18n: I18nContext): Promise<any[]> {
    const { lang }: { lang: string } = i18n;
    const from = new Date('1970-01-01 00:00:00.000+00');
    const now = new Date();

    return this.kpiService.getLatestKPI(from.toISOString(), now.toISOString(), lang);
  }

  @Get('/raw')
  @ApiOperation({
    summary: 'Display mean values for all KPI',
    description: `Display mean values for all registered KPI since 1970. If a KPI is NotFoundException
    displayed, it means it has not been registered yet`,
  })
  @ApiOkResponse({ type: KpiDataDto, description: 'Successful request' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiExtraModels(KpiDataDto, BadRequest)
  async getKPIRaw(): Promise<KpiDataDto> {
    const from = new Date('1970-01-01 00:00:00.000+00');
    const now = new Date();

    const allTypes = Object.values(KpiEnum);

    return this.kpiService.getRawKPI(from.toISOString(), now.toISOString(), allTypes);
  }

}
