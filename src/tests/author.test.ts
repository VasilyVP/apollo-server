import { join } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer, gql } from 'apollo-server';
import { resolvers } from '../resolvers/resolver';
import { AuthorsDataSource } from '../dataSources/AuthorsDataSource';
import { ResolverInitialContext } from '../commonTypes';

let server: ApolloServer;

beforeAll(() => {
    const typeDefs = loadSchemaSync(join(__dirname, '../schemas/**/*.g*ql'), {
        loaders: [new GraphQLFileLoader()]
    });

    const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

    server = new ApolloServer({
        schema: executableSchema,
        resolvers,
        /* context: ({ req }): ResolverInitialContext => {
            return {
                user: {
                    name: 'Vasily',
                }
            }
        }, */
        /* mocks: undefined, */ /* {
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
    });
})

const AuthorQuery = gql`
    query author($name: String!) {
        author(name: $name) {
            name
            age
        }
    }
`

describe('Author(s) queries', () => {
    test('Author query success', async () => {
        const result = await server.executeOperation({
            query: AuthorQuery,
            variables: {
                name: 'KateChopin',
            },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data?.author.name).toBe('Kate Chopin');
        expect(result.data?.author.age).toBe(21);
    });

    test('Author query error', async () => {
        const result = await server.executeOperation({
            query: AuthorQuery,
            variables: {
                name: 'KateChopin123',
            },
        });

        expect(result.errors).toHaveLength(1);
        expect(result.data?.author?.name).toBeUndefined();
        expect(result.data?.author?.age).toBeUndefined();
    });
});
