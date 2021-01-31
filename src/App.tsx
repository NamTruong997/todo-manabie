import SignInPage from 'components/page/signin/SignInPage';
import ToDoPage from 'components/page/todo/ToDoPage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage}/>
          <Route path="/todo" component={ToDoPage}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
