import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { TestResultsService } from './testresults.service';
import { TestResult } from './testresult.interface';
import { CreateTestResultDto } from './create-testresult.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitParam
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('TestResults')
@Controller('api/v1/testresults')
export class TestResultsController {

  constructor(private readonly testresultsService: TestResultsService) { }

  @Post()
  @ApiOperation({ title: 'Create Test Result' })
  @ApiResponse({ status: 201, description: 'The test result has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createTestResultDto: CreateTestResultDto): Promise<TestResult> {
    return await this.testresultsService.create(createTestResultDto, userId);
  }

  @Get()
  @ApiOperation({ title: 'Get All Test Results' })
  @ApiResponse({ status: 200, description: 'The list of test results has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitQuery({ name: 'projectId', description: 'filter test results by project id', required: false })
  async findAll(@Query('projectId', new QueryIdValidationPipe()) id?: string): Promise<TestResult[]> {
    if (!id) {
      return this.testresultsService.findAll();
    } else {
      return this.testresultsService.findAllByProjectId(id);
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Test Result by id' })
  @ApiResponse({ status: 200, description: 'The single test result has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Result id' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<TestResult> {
    return this.testresultsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Test Result by id' })
  @ApiResponse({ status: 200, description: 'The single test result has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Result id' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createTestResultDto: CreateTestResultDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return await this.testresultsService.update(id, createTestResultDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Test Result by id' })
  @ApiResponse({ status: 200, description: 'The single test result has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Result id' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.testresultsService.delete(id);
  }
}
