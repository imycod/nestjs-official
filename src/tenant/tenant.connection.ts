import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { IConfig } from "./interface/connection.type";

@Injectable()
export class TenantConnection {
    private static connectionPools = new Map<string, DataSource>();

    constructor(private readonly config: IConfig) { }

    private async getConnection(): Promise<DataSource> {
        const poolKey = `${this.config.host}-${this.config.database}`;

        if (!TenantConnection.connectionPools.has(poolKey)) {
            const dataSource = new DataSource({
                type: 'mysql',
                host: this.config.host,
                port: this.config.port,
                username: this.config.username,
                password: this.config.password,
                database: this.config.database,
                entities: [/* 实体类 */],
                // 连接池配置
                poolSize: 10,
                connectTimeout: 5000,
            });

            await dataSource.initialize();
            TenantConnection.connectionPools.set(poolKey, dataSource);
            console.log(`Created new connection pool for ${poolKey}`);
        }

        return TenantConnection.connectionPools.get(poolKey)!;
    }

    async query(sql: string) {
        const connection = await this.getConnection();
        return connection.query(sql);
    }

    async onDestroy() {
        // 应用关闭时清理连接池
        for (const [key, dataSource] of TenantConnection.connectionPools) {
            await dataSource.destroy();
            console.log(`Closed connection pool for ${key}`);
        }
    }
    onModuleDestroy() {
        this.onDestroy();
    }
}
