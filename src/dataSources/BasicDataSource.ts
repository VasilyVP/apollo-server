import { DataSource } from 'apollo-datasource';
import { KeyValueCache } from 'apollo-server-core';
import { ResolverContext } from '../commonTypes';

export type KeyValStore<T> = { [key: string]: T };

type ArrayStore<T> = T[];

type DataSourceTypes<T> = KeyValStore<T | undefined> | ArrayStore<T | undefined>;

export class BasicDataSource<T> extends DataSource {
    private context?: ResolverContext;
    private cache?: KeyValueCache;

    constructor(public dataSource: DataSourceTypes<T>) {
        super();
    }

    initialize({ context, cache }: { context: ResolverContext, cache: KeyValueCache }) {
        this.context = context;
        this.cache = cache;
    }

    getCacheKey(key: string, suffix?: string) {
        const suffixStr = suffix ? suffix + '-' : '';
        return `some-source-key-${suffixStr}${key}`;
    }

    setToCache(key: string, value: any) {
        this.cache?.set(this.getCacheKey(key), JSON.stringify(value));
    }

    async getFromCache(key: string) {
        const cached = await this.cache?.get(this.getCacheKey(key));

        return cached ? JSON.parse(cached) : undefined;
    }
}
