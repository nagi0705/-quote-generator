import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  const quotes = [
    { text: "自分が嫌っている誰かは、影に潜んでいる自分の姿。", author: "ロコ" },
    { text: "心動かされるのは、全力を出し切った未完成。", author: "ノア" },
    { text: "答えは誰も教えてくれない。答えは1人1人違うから。", author: "きなこ" },
    { text: "悔しいと感じなくなった時が、やめるべきタイミング。", author: "ベル" },
    { text: "笑顔が消えてしまうほど、頑張らなくていい。", author: "フィル" },
    { text: "嫌われることを恐れていたら、自分自身を嫌いになっていくだけ。", author: "アン" },
    { text: "失敗にするか、教訓にするかは、自分次第。", author: "terisuke" },
    { text: "外見は中身の一番外側。", author: "Lull" }
  ]
  return quotes
})
