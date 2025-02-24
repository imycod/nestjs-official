import { Injectable } from "@nestjs/common";
import { TenantIdService } from "./tenant-id.service";
import { TenantService } from "./tenant.service";
import { TenantConnection } from "./tenant.connection";

@Injectable()
export class TenantConnectionService {

  constructor(private readonly tenantId: TenantIdService, private readonly tenantService: TenantService) { }
  createConnection(): TenantConnection {
    const config = this.tenantService.getConfig(this.tenantId.getTenantId());
    return new TenantConnection(config!);
  }
}