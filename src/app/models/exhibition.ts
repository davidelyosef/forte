export class Exhibition {

    public constructor(
        public _id?: string,
        public exhibitionName?: string,
        public exhibitionArtist?: string,
        public opening?: string,
        public closing?: string,
        public exhibitionDetails?: any[],
        public imgSrc?: string,
        public imgCover?: string,
        public address?: string,
        public status?: string,
        public exhibitionImages?: any[],
        public exhibitionDetailsImageCover?: any,
        public about?: string,
        public currator?: { artist?: string, existArtsist?: boolean }
    ) { };
}