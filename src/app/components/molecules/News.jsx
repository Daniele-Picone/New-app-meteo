"use client";
import { useEffect, useState } from "react";
import './News.css'

export default function NewsSection() {
  const [articles, setArticles] = useState([]);

 useEffect(() => {
  fetch("/api/news")
    .then(res => res.json())
    .then(data => setArticles(data.articles || []))
    .catch(err => {
      console.error("Errore news:", err);
      setArticles([]); 
    });
}, []);

  return (
    <div className="card_wrapper" >
      <h2 className="wrapper_news_title" >📰 Ultime notizie</h2>
      {articles.map((a) => (
        <div key={a.id} className="card-news" >
          <div className="img_container">
            <img src={a.urlToImage || "https://via.placeholder.com/150"} alt={a.title} />
          </div>
            <div className="news_context">
              <h3>{a.title}</h3>
              <p>{a.source.name}</p>
            </div>
        </div>
      ))}
    </div>
  );
}
