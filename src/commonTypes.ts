import { AuthorsDataSource } from "./dataSources/AuthorsDataSource";

export type ResolverInitialContext = {
    user: {
        name: string;
    }
}

type DataSources = {
    authors: AuthorsDataSource;
}

export type ResolverContext = {
    dataSources: DataSources;
} & ResolverInitialContext;
