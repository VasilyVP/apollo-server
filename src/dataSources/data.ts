export type Author = {
    name: string;
    age: number;
}

export type Authors = { [key: string]: Author }

export const authorsData: Authors = {
    KateChopin: {
        age: 21,
        name: 'Kate Chopin',
    },
    PaulAuster: {
        name: 'Paul Auster',
        age: 33,
    },
};

export type Book = {
    title: string;
    author: Author;
}

export type Books = Book[];

export const booksData: Books = [
    {
        title: 'The Awakening',
        author: authorsData.KateChopin,

    },
    {
        title: 'City of Glass',
        author: authorsData.PaulAuster,
    },
    {
        title: 'some title',
        author: authorsData.PaulAuster,
    },
];

export type Film = {
    title: string;
    producer: string;
}

type Films = Film[];

export const filmsData: Films = [
    {
        title: 'Film 1',
        producer: 'Games Cameron',
    },
    {
        title: 'Film 2',
        producer: 'Stiven Spilberg',
    }
];
