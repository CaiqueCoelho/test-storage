import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNotEmpty, IsDate, IsBoolean, IsArray } from 'class-validator';

export class CreateTestrunDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly builds?: Array<string>;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly environments?: Array<string>;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly platforms?: Array<string>;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly testcases?: Array<string>;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiModelPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly archieved?: boolean;

  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly startDate?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly endDate?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly created?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly updated?: Date;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly updatedBy?: string;
}
