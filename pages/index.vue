<template>
    <div class="container">
        <button class="button">名言を表示</button>
        <div v-if="quote" class="quote-container">
            <p>{{ quote.text }}</p>
            <p>- {{ quote.author }}</p>
            <button class="button favorite-button">お気に入りに追加</button>
        </div>
        
        <div class="favorites">
            <h2>お気に入りリスト</h2>
            <ul>
                <li v-for="(fav, index) in favorites" :key="index" class="favorite-item">
                    <p>{{ fav.text }}</p>
                    <p>- {{ fav.author }}</p>
                    <button class="button delete-button" @click="removeFromFavorites(index)">削除</button>
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
  font-family: Arial, sans-serif;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
}

.button:hover {
  background-color: #45a049;
}

.quote-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 20px 0;
}

.favorites {
  margin-top: 40px;
}

.favorite-item {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 10px 0;
  list-style: none;
}

.delete-button {
  background-color: #ff4444;
}

.delete-button:hover {
  background-color: #cc0000;
}

ul {
  padding: 0;
}
</style>