import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Comment from './components/Comment';
import CommentList from './components/CommentList';

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={CommentList} />
        <Route path="/newComment" component={Comment} />
      </div>
    </Router>
  );
}

export default App;
