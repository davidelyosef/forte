export class Publication {

    public constructor(
        public _id?: string,
        public fullName?: string,
        public bookName?:string,
        public bookDetails?: string,
        public video?: string,
        public mainImageName?: string, 
        public allImages?: any[],
        public date?: string
    ) {};
}