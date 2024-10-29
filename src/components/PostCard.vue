<template>
    <li :class="{ deleting: post.deleting }" class="post-card">
        <div class="post-header">

            <!-- Если пост в режиме редактирования, отображаем поля ввода -->
            <template v-if="post.editing">
                <div>
                    <!-- Поле ввода для редактирования заголовка -->
                    <input v-model="post.editTitle" class="post-title-input" />
                    <!-- Кнопка сохранения вместо кнопки редактирования -->
                    <div class="post-actions">
                        <button @click="savePost" class="action-btn">
                            <img :src="saveIcon" alt="Save" />
                        </button>
                    </div>
                </div>

                <!-- Полоса после заголовка -->
                <div class="divider"></div>

                <!-- Поле ввода для редактирования содержимого поста -->
                <textarea v-model="post.editBody" class="post-body-input"></textarea>
            </template>

            <!-- Если пост НЕ в режиме редактирования, отображаем заголовок и тело поста -->
            <template v-else>
                <h3 class="post-title">{{ post.data.title }}</h3>
                <div class="post-actions">
                    <button @click="startEdit" class="action-btn">
                        <img :src="editIcon" alt="Edit" />
                    </button>
                    <button @click="deletePost" class="action-btn">
                        <img :src="deleteIcon" alt="Delete" />
                    </button>
                </div>
            </template>
        </div>

        <!-- Текст поста или поле ввода для редактирования -->
        <p v-if="!post.editing" class="post-body">{{ post.data.body }}</p>
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Post } from '@/types/Post';

import editIcon from '@/assets/edit.svg';
import deleteIcon from '@/assets/delete.svg';
import saveIcon from '@/assets/save.svg';

export default defineComponent({
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
        onDelete: {
            type: Function,
            required: true,
        },
        onSave: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const startEdit = () => {
            props.post.editing = true;
            props.post.editTitle = props.post.data.title;
            props.post.editBody = props.post.data.body;
        };

        const savePost = () => {
            props.onSave(props.post);
        };

        const deletePost = () => {
            props.onDelete( props.post )
        };

        return {
            startEdit,
            savePost,
            deletePost,
            editIcon,
            deleteIcon,
            saveIcon,
        };
    },
});
</script>

<style scoped>

.post-card {
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 15px;
    /* Добавим начальную максимальную высоту для плавного скрытия при удалении */
    transition: max-height 0.5s ease, opacity 0.5s ease;
    max-height: 500px; /* Значение может варьироваться в зависимости от контента */
    overflow: hidden;
}
.deleting {
    max-height: 0;
    opacity: 0;
    padding: 0;
    margin: 0;
    background-color: rgba(255, 0, 0, 0.2);
    overflow: hidden;
}

.post-card:hover {
    transform: translateY(-2px);
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
    margin-bottom: 10px;
    flex-direction: column;
    align-items: flex-start;
}

.post-title {
    font-size: 1.2rem;
    color: #333;
}

.post-body {
    font-size: 1rem;
    color: #555;
    line-height: 1.4;
}

.post-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.action-btn img {
    width: 30px;
    height: 30px;
    filter: grayscale(0.5) opacity(0.7);
    transition: filter 0.3s;
}

.action-btn img:hover {
    filter: grayscale(0) opacity(1);
}

.post-title-input,
.post-body-input {
    width: 100%;
    font-size: 1rem;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.divider {
    height: 1px;
    background-color: #e0e0e0;
    margin: 10px 0;
}


.post-fade-enter-active,
.post-fade-leave-active {
    transition: all 0.5s ease;
}

</style>
