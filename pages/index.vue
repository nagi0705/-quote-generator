<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">ランダム名言ジェネレーター</h1>

        <!-- ランダムな名言表示 -->
        <p v-if="quote" class="text-xl mb-2">"{{ quote.text }}"</p>
        <p v-if="quote" class="text-gray-600 mb-4">- {{ quote.author }}</p>

        <!-- ランダム名言ボタン -->
        <button @click="getRandomQuote" class="bg-blue-500 text-white px-4 py-2 rounded">
            名言を表示
        </button>

        <!-- お気に入りに追加ボタン -->
        <button @click="addToFavorites" class="bg-green-500 text-white px-4 py-2 rounded mt-2">
            お気に入りに追加
        </button>

        <!-- お気に入りリスト表示 -->
        <h2 class="text-xl font-bold mt-6">お気に入りリスト</h2>
        <ul>
            <li v-for="(fav, index) in favorites" :key="index" class="border-b py-2 flex justify-between items-center">
                <span>
                    "{{ fav.text }}" - {{ fav.author }}
                </span>
                <button @click="removeFromFavorites(index)" class="text-red-500 hover:underline">
                    削除
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from "vue";

// quotesの重複宣言を削除
const quote = ref(null);
const favorites = ref([]);

// シンプルに相対パスを使用
const { data: quotes } = await useFetch('/quotes')

// お気に入りリストをローカルストレージから読み込み
const loadFavorites = () => {
  if (process.client) {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.value = savedFavorites;
  }
};

loadFavorites();
</script>

<style>
body {
    background: radial-gradient(circle, rgba(255, 175, 189, 0.8), rgba(100, 216, 249, 0.8));
    color: #fff;
    /* テキストを白に */
    font-family: 'Arial', sans-serif;
    /* モダンなフォント */
    margin: 0;
    padding: 0;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
</style>