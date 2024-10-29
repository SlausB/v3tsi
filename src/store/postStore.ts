import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive } from 'vue';
import { Post } from '@/types/Post';
import { PostData } from '@/types/PostData';

export const usePostStore = defineStore('postStore', {
    state: () => ({
        //originally, supposed to be "posts: [] as Post[]", but posts list was displayed almost never (seems like race-condition), so solution with reactive() found here: https://github.com/vuejs/pinia/discussions/1191
        posts: reactive( [] as Post[] ),
    }),
    actions: {
        async fetchPosts() {
            try {
                const response = await axios.get< PostData[] >( 'https://jsonplaceholder.typicode.com/posts' );

                // Overwrite reactively (again, see https://github.com/vuejs/pinia/discussions/1191 )
                //this.posts = response.data;
                this.posts.splice(
                    0,
                    this.posts.length,
                    ... response.data.map( ( p => new Post( p ) ) )
                );
            }
            catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        },
        
        async addPost( newPost : Omit< Post, 'id' > ) {
            try {
                const response = await axios.post< PostData >( 'https://jsonplaceholder.typicode.com/posts', newPost );
                this.posts.splice( 0, 0, new Post( response.data ) );
            }
            catch (error) {
                console.error('Failed to add post:', error);
            }
        },
        
        async updatePost( data : PostData ) {
            try {
                await axios.put( `https://jsonplaceholder.typicode.com/posts/${data.id}`, data );
                const index = this.posts.findIndex( post => data.id === post.data.id );
                if ( index !== -1 ) {
                    this.posts[ index ].data = data;
                }
            }
            catch (error) {
                console.error('Failed to update post:', error);
            }
        },
        
        async deletePost( postId : number ) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const i = this.posts.findIndex( post => post.data.id == postId )
                this.posts.splice( i, 1 )
            }
            catch (error) {
                console.error('Failed to delete post:', error);
            }
        },
    },
});
