<template>
    <form @submit.prevent="handleSubmit" class="add-post-form">
        <h3 class="form-title">Add New Post</h3>
        <input type="text" v-model="title" placeholder="Title" class="form-input" required />
        <textarea v-model="body" placeholder="Body" class="form-textarea" required></textarea>
        <button type="submit" class="form-submit-btn">Add Post</button>
    </form>
</template>

  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePostStore } from '@/store/postStore';

export default defineComponent({
    emits: ['postAdded'],
    setup(_, { emit }) {
        const postStore = usePostStore();
        const title = ref('');
        const body = ref('');

        const handleSubmit = async () => {
            await postStore.addPost({
                title: title.value,
                body: body.value,
            });
            emit('postAdded');
            title.value = '';
            body.value = '';
        };

        return {
            title,
            body,
            handleSubmit,
        };
    },
});
</script>
  
<style scoped>
.add-post-form {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.form-title {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.form-input,
.form-textarea {
    padding: 10px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
    border-color: #007bff;
    outline: none;
}

.form-submit-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-self: center;
    width: 100px;
}

.form-submit-btn:hover {
    background-color: #0056b3;
}
</style>
  