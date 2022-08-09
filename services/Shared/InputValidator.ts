import { Space } from "./Model";

export class MissingFieldError extends Error {}

export function validateAsSpaceEntry(args: any){
    if(!(args as Space).name){
        throw new MissingFieldError('Value for name Required')
    }
    if(!(args as Space).location){
        throw new MissingFieldError('Value for location Required')
    }
    if(!(args as Space).spaceId){
        throw new MissingFieldError('Value for spaceId Required')
    }
}