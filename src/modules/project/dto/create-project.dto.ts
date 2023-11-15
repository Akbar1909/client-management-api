import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClientStatusEntity } from 'src/modules/client-status/entity/client-status.entity';
import { TicketSideEntity } from 'src/modules/ticket-side/entity/ticket-side.entity';
import { TicketTypeEntity } from 'src/modules/ticket-type/entity/ticket-type.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsBoolean()
  @IsOptional()
  hasSide?: boolean;

  @IsBoolean()
  @IsOptional()
  hasModule?: boolean;

  @IsBoolean()
  @IsOptional()
  hasClientStatus?: boolean;

  @IsOptional()
  @IsArray()
  sides?: TicketSideEntity[];

  @IsOptional()
  @IsArray()
  modules?: TicketTypeEntity[];

  @IsOptional()
  @IsArray()
  clientStatuses?: ClientStatusEntity[];
}
