import { AddBookDto } from "./dto/add-book.dto";
import { Book, booksData, Film, filmsData } from "../dataSources/data";
import type { ResolverContext } from '../commonTypes';
import { GraphQLResolveInfo } from 'graphql';
import { authorResolver } from './author';
import { bookResolver } from './book';


export const resolvers = {
    ...authorResolver,
    ...bookResolver,
    Asset: {
        __resolveType: (obj: Film & Book) => {
            if (obj.author) return 'Book';
            else return 'Film';
        },
    },
    Query: {
        books: () => booksData.map(book => ({ title: book.title })), // booksData
        author: async (_: undefined, { name }: { name: string }, { dataSources }: ResolverContext) => {
            return await dataSources.authors.getAuthorByName(name);
        },
        authors: (parent: undefined, args: {}, ctx: ResolverContext, info: GraphQLResolveInfo) => {
            const authors = booksData.map(book => book.author);

            const uniqueNames = Array.from(new Set(authors.map(author => author.name)));
            const uniqueAuthors = uniqueNames.map(name => authors.find(author => author.name === name));

            return uniqueAuthors;
        },
        assets: async (_: undefined, __: {}, { dataSources }: ResolverContext) => {
            //console.log('data source resolver: ', await dataSources.authors.authorsAll());

            return [...filmsData, ...booksData]
        },
    },
    Mutation: {
        addBook: (_: any, param: AddBookDto) => {
            booksData.push(param.book);

            return param.book;
        }
    },
};
