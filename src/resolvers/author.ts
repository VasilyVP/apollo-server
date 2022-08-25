import { booksData } from "../dataSources/data";
import { Author } from "../dataSources/data";

export const authorResolver = {
    Author: {
        books: (parent: Author) => {
            return booksData
                .filter(book => book.author.age === parent.age && book.author.name === parent.name)
                .map(book => ({ title: book.title }));
        },
    }
}
