export type AddBookDto = {
    book: {
        title: string;
        author: {
            name: string;
            age: number;
        },
    },
}
