import { PostData } from './PostData'

export class Post {
    data : PostData
    
    deleting : boolean = false
    creating : boolean = false
    updating : boolean = false

    constructor( data : PostData ) {
        this.data = data
    }
}
