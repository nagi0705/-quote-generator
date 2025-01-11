<template>
    <div class="container">
        <h1>ランダム名言ジェネレーター</h1>
        <button class="button" @click="fetchQuote">名言を表示</button>
        <div v-if="quote" class="quote-container">
            <p>{{ quote.text }}</p>
            <p>- {{ quote.author }}</p>
            <button class="button" @click="addToFavorites">お気に入りに追加</button>
        </div>
        
        <h2>お気に入りリスト</h2>
        <ul>
            <li v-for="(fav, index) in favorites" :key="index" class="favorite-item">
                <p>{{ fav.text }}</p>
                <p>- {{ fav.author }}</p>
                <button class="delete-button" @click="removeFromFavorites(index)">削除</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const quote = ref(null)
const favorites = ref([])

// APIからデータを取得する関数
const fetchQuote = async () => {
  const { data } = await useFetch('/api/quotes')
  if (data.value) {
    const randomIndex = Math.floor(Math.random() * data.value.length)
    quote.value = data.value[randomIndex]
  }
}

// お気に入り機能
const loadFavorites = () => {
  if (process.client) {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    favorites.value = savedFavorites
  }
}

// お気に入りに追加
const addToFavorites = () => {
  if (quote.value && !favorites.value.some(fav => fav.text === quote.value.text)) {
    favorites.value.push(quote.value)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
}

// お気に入りから削除
const removeFromFavorites = (index) => {
  favorites.value.splice(index, 1)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

loadFavorites()
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 2rem;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1, h2 {
  color: #333;
  text-shadow: 1px 1px 3px rgba(255,255,255,0.5);
}

.button {
  background-color: rgba(255, 255, 255, 0.4);
  border: 2px solid #fff;
  color: #333;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.quote-container {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 600px;
  color: #333;
}

.favorite-item {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 8px;
  margin: 10px auto;
  max-width: 600px;
  list-style: none;
  color: #333;
}

.delete-button {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

ul {
  padding: 0;
  margin: 0;
}
</style>