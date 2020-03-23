import { ImageProps } from './imageProp';

export class Artist{
    public constructor(
        public _id?: string,
        public fullName?: string,
        public content?:string,
        public readMoreContent?:string,
        public mainImageName?: ImageProps,
        public imageProps?: ImageProps[],
        public status?:string,
        public croppedPicture?: any,
        public cv?: string
    ) { };
}