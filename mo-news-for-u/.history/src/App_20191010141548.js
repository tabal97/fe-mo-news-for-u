import './App.css';
import Header from './Components/Header';
import Nav from './Components/Nav';
import { Router } from "@reach/router";
import ArticlesList from "./Components/ArticlesList"
import SingleArticle from './Components/SingleArticle';

import React, { Component } from 'react';
import LoginSection from './Components/LoginSection';
import UserProfile from './Components/UserProfile';

class App extends Component {
  state = {
    users: ["", "jessjelly", "weegembump", "happyamy2016", "grumpy19", "tickle122"]
  }
  render() {
    const { users } = this.state;
    return (
      <div className="app">
        <Header />
        <Nav />
        <Router>
          <UserProfile path="/users/:username" />
          <LoginSection path="/login" changeUser={this.changeUser} users={users} />
          <ArticlesList path="/" />
          <ArticlesList path="/articles" />
          <ArticlesList path="/topics/:topic" />
          <SingleArticle path="/articles/:article_id" />
        </Router>
      </div>
    );
  }
  changeUser = (currentUser) => {
    this.setState({ currentUser });
  }
}

export default App;
