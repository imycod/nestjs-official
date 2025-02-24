import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class TenantIdService {
  constructor(@Inject(REQUEST) private readonly request: Request) { }
  getTenantId(): string {
    return this.request.headers["x-tenant-id"] as string;
  }
}