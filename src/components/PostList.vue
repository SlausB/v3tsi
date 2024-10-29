<template>
    <div class="posts-container">
        <PostForm @postAdded="" />
        
        <transition-group name="post-fade" tag="ul" class="posts-list">
            <PostCard
                v-for="post in posts"
                :key="post.data.id"
                :post="post"
                :onDelete="issue_delete"
                :onSave="save_post"
            />
        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { usePostStore } from '@/store/postStore';
import PostForm from './PostForm.vue';
import PostCard from './PostCard.vue';
import { Post } from '@/types/Post';

export default defineComponent({
    components: {
        PostForm,
        PostCard,
    },
    setup() {
        const postStore = usePostStore();
        const { posts, fetchPosts, deletePost } = postStore;

        onMounted(() => {
            fetchPosts();
        });

        const issue_delete = ( post : Post ) => {
            post.deleting = true;
            setTimeout(
                () => deletePost( post.data.id ),
                500,
            );
        };

        const save_post = async (post: any) => {
            await postStore.updatePost({
                id: post.data.id,
                title: post.editTitle,
                body: post.editBody,
            });
            post.data.title = post.editTitle;
            post.data.body = post.editBody;
            post.editing = false;
        };

        return {
            posts,
            fetchPosts,
            issue_delete,
            save_post,
        };
    },
});
</script>

<style scoped>
.posts-container {
    background-color: #f4f6f8;
    padding: 20px;
}

.posts-list {
    list-style-type: none;
    padding: 0;
}

/* Стили переходов для post-fade (плавное красное скрытие удаляемых постов) */
.post-fade-enter-active,
.post-fade-leave-active {
    transition: all 0.5s ease;
}
.post-fade-enter-from,
.post-fade-leave-to {
    opacity: 0;
    transform: translateY(20px); /* Плавный наезд вниз при удалении */
}

</style>
