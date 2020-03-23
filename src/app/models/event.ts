export class MyEvent {
    public constructor(
        public _id?: string,
        public date?: string,
        public eventName?: string,
        public eventDetails?: string,
        public fileName?: string,
        public imageName?: string,
        public eventImages? : any[],
        public status?:string,
        public activeStatus?:boolean,
    ) {};
}