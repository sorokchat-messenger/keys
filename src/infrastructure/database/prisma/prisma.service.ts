import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { type AllConfigs } from '../../config/index.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly _pool: Pool;

    public constructor(configService: ConfigService<AllConfigs>) {
        const pool = new Pool({
            connectionString: configService.getOrThrow('database.connectionString', { infer: true }),
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            keepAlive: true
        });
        const adapter = new PrismaPg(pool);
        super({ adapter });
        this._pool = pool;
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    public async onModuleDestroy(): Promise<void> {
        try {
            await this.$disconnect();
        } finally {
            await this._pool.end();
        }
    }
}