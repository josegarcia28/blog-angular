export class Post{
    constructor(
        public id: number,
        public user_id: number,
        public category_id: number,
        public title: string,
        public email: string,
        public content: string,
        public image: string,
        public createdAd: any,
        public category?: {
            name: string,
        },
        public user?: {
            name: string,
            surname: string
        },
    ){}
}