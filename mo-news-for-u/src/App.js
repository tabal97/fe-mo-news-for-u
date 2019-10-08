import React from 'react';
import './App.css';
import Header from './Components/Header';
import TopicList from './Components/TopicList';
import { Router } from "@reach/router";
import ArticlesList from "./Components/ArticlesList"
import SingleArticle from './Components/SingleArticle';

function App() {
  return (
    <div className="App">
      <Header />
      <TopicList />
      <Router>
        <ArticlesList path="/" />
        <ArticlesList path="/articles" />
        <SingleArticle path="/articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
