export interface Post {
    id?: string;
    title: string;
    body: string;
    authorId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface createPostData extends Pick<Post, 'title' | 'body'> { }