<template>
    <div class="container">
        <button @click="fetchQuote">名言を表示</button>
        <div v-if="quote" class="quote-box">
            <p>{{ quote.text }}</p>
            <p>- {{ quote.author }}</p>
            <button @click="addToFavorites">お気に入りに追加</button>
        </div>
        
        <div class="favorites-section">
            <h2>お気に入りリスト</h2>
            <ul>
                <li v-for="(fav, index) in favorites" :key="index">
                    <p>{{ fav.text }}</p>
                    <p>- {{ fav.author }}</p>
                    <button @click="removeFromFavorites(index)">削除</button>
                </li>
            </ul>
        </div>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.quote-box {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.favorites-section {
  margin-top: 40px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>