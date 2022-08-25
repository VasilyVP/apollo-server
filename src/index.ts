import { join } from 'path';
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/resolver';
import type { ResolverInitialContext } from './commonTypes';
import { AuthorsDataSource } from './dataSources/AuthorsDataSource';


const typeDefs = loadSchemaSync(join(__dirname, 'schemas/**/*.g*ql'), {
    loaders: [new GraphQLFileLoader()]
});

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
    //typeDefs,
    schema: executableSchema,
    resolvers,
    context: ({ req }): ResolverInitialContext => {
        return {
            user: {
                name: 'Vasily',
            }
        }
    },
    csrfPrevention: true,
    cache: 'bounded',
    mocks: undefined, /* {
        Int: () => Math.round(Math.random() * 10),
        Float: () => Math.random() * 10,
        String: () => 'Random string',
        Author: () => ({
            name: 'Author Name',
            age: 33,
            books: undefined,
        }),
        Book: () => ({
            title: 'Book name',
        }),
        Film: () => ({
            title: 'Film name',
            producer: 'Producer name',
        }),
    }, */
    dataSources: () => ({
        authors: new AuthorsDataSource(),
    }),
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
});
