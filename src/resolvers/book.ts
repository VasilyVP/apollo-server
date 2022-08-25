import { ResolverContext } from "../commonTypes";

type Book = {
    title: string;
}

export const bookResolver = {
    Book: {
        author: (parent: Book, __: {}, { dataSources }: ResolverContext) => dataSources.authors.getAuthorByBookTitle(parent.title),
    },
}
