import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiHeaders, ApiBody, ApiConflictResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

import { ApiKeyGuard } from '@app/guards/api-key.guard';
import { BadRequest } from '@app/dtos/bad-request.dto.';
import { Conflict } from '@app/dtos/conflict.dto';
import { KpiEnum } from '@app/enums/kpi.enum';
import { KpiInfo } from '@app/entities/kpi-info.entity';
import { KpiInfoDto } from '@app/dtos/kpi-info.dto';
import { Unauthorized } from '@app/dtos/unauthorized.dto';
import { UpdateKpiInfoDto } from '@app/dtos/update-kpi-info.dto';

import { KpiInfoService } from './kpi-info.service';


@Controller('/kpi-info')
export class KpiInfoController {

  constructor(private readonly kpiInfoService: KpiInfoService) { }

  @Post()
  @ApiOperation({
    summary: 'Register KPI infos',
    description: 'Register title and description for a KPI ',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
    { name: 'Accept-Language' },
  ])
  @ApiBody({
    type: KpiInfoDto,
  })
  @ApiConflictResponse({ type: Conflict, description: 'Conflict' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiCreatedResponse({ type: KpiInfoDto, description: 'Successful request' })
  @UseGuards(ApiKeyGuard)
  async createKpiInfo(
    @I18n() i18n: I18nContext,
    @Body() dto: KpiInfoDto,
  ): Promise<KpiInfo> {
    const { lang }: { lang: string } = i18n;
    const existingKPI = await this.kpiInfoService.findOne(dto.type, lang);
    if (existingKPI) {
      throw new ConflictException();
    }

    return this.kpiInfoService.createKpiInfo(dto.type, dto.title, dto.description, lang);
  }


  @Patch('/:id')
  @ApiOperation({
    summary: 'Update a KPI infos',
    description: 'Update a KPI info',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
  ])
  @ApiBody({ type: UpdateKpiInfoDto })
  @ApiOkResponse({ type: KpiInfo, description: 'Successful request' })
  @ApiConflictResponse({ type: Conflict, description: 'Conflict' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiExtraModels(UpdateKpiInfoDto, KpiInfo, BadRequest, Conflict, Unauthorized)
  @UseGuards(ApiKeyGuard)
  async updateKPIInfo(
    @Param('id') id: number,
    @Body() dto: UpdateKpiInfoDto,
  ): Promise<KpiInfo | null> {
    const nonEmptyKeys = Object.entries(dto)
      .filter((entry) => entry?.length > 1 && entry[1])
      .map(([key]: string[]) => key);

    //checks if there is a property to update
    if (nonEmptyKeys.length == 0) {
      throw new BadRequestException();
    }
    return this.kpiInfoService.updateKpiInfo(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a KPI info',
    description: 'Delete a KPI info',
  })
  @ApiHeaders([
    { name: 'x-api-key' },
  ])
  @ApiOkResponse({ type: Boolean, description: 'Successful request' })
  @ApiUnauthorizedResponse({ type: Unauthorized, description: 'Unauthorized' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiExtraModels(BadRequest, Unauthorized)
  @UseGuards(ApiKeyGuard)
  async deleteKpiInfo(
    @Param('id') id: number,
  ): Promise<boolean> {
    return this.kpiInfoService.remove(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Display a KPI info',
    description: 'Display a KPI info',
  })
  @ApiHeaders([
    { name: 'Accept-Language' },
  ])
  @ApiQuery({ name: 'type', type: String, example: 'transaction_last_one', description: 'Type of the KPI info to display' })
  @ApiOkResponse({ type: KpiInfo, description: 'Successful request' })
  @ApiBadRequestResponse({ type: BadRequest, description: 'Bad Request' })
  @ApiExtraModels(KpiInfo, BadRequest)
  async getKPIInfo(
    @I18n() i18n: I18nContext,
    @Query('type') type: KpiEnum,
  ): Promise<KpiInfo> {
    const { lang }: { lang: string } = i18n;
    return this.kpiInfoService.getInfo(type, lang);
  }
}
