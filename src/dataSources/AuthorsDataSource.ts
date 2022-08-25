import DataLoader, { BatchLoadFn } from 'dataloader';
import { Author, authorsData, booksData } from "./data";
import { BasicDataSource/* , KeyValStore */ } from "./BasicDataSource";

export class AuthorsDataSource extends BasicDataSource<Author> {
    private sourceName = 'authors';

    // author by names data loader
    private authorsByNamesDLHandler: BatchLoadFn<string, Author | Error> = async names => {
        return names.map(name => authorsData[name] || new Error('No such value'));
    }
    private authorByNameDL = new DataLoader<string, Author | Error>(this.authorsByNamesDLHandler);

    // authors by book title data loader
    private authorsByBookTitlesHandler: BatchLoadFn<string, Author | Error> = async titles => {
        return titles.map(title => booksData.find(book => book.title === title)?.author || Error('No author for such title'));
    }
    private authorByBookTitleDL = new DataLoader<string, Author | Error>(this.authorsByBookTitlesHandler);

    constructor() {
        super(authorsData);
    }

    async getAuthorByName(name: string) {
        const key = this.sourceName + '-' + name;

        const cached = await this.getFromCache(key);
        if (cached) return cached;

        const value = await this.authorByNameDL.load(name);
        this.setToCache(key, value);

        return value;
    }

    async getAuthorByBookTitle(title: string) {
        const key = this.sourceName + '-' + title;

        const cached = await this.getFromCache(key);
        if (cached) return cached;

        const value = await this.authorByBookTitleDL?.load(title);
        this.setToCache(key, value);

        return value;
    }

    async authorsAll() {
        const key = this.getCacheKey('all', this.sourceName);

        const cached = await this.getFromCache(key);
        if (cached) return cached;

        const value = this.dataSource;
        this.setToCache(key, value);

        return value;
    }
}
