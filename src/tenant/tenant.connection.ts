import { Injectable } from "@nestjs/common";
import { IConfig } from "./interface/connection.type";


@Injectable()
export class TenantConnection {
    constructor(private readonly config: IConfig) { }

    async query(sql:string){
        console.log(`Execute on ${this.config.host} ${this.config.database}`)
    }
}
