import './App.css';
import React from 'react';
import AuthorList from './components/Author';
import BookList from './components/Books';
import AuthorBookList from './components/AuthorBook';
import UserList from './components/Users';
import ProjectList from './components/Projects';
import ToDoList from './components/Todo';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>
        Страница по адресу `{location.pathname}` не найдена
      </h1>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    const author1 = { id: 1, first_name: 'Александр', last_name: 'Грин', birthday_year: 1880 }
    const author2 = { id: 2, first_name: 'Александр', last_name: 'Пушкин', birthday_year: 1799 }
    const authors = [author1, author2]

    const book1 = { id: 1, name: 'Алые Паруса', author: author1 }
    const book2 = { id: 2, name: 'Лукоморье', author: author2 }
    const book3 = { id: 3, name: 'Капитансая дочка', author: author2 }
    const books = [book1, book2, book3]

    const user1 = { id: 1, first_name: 'Ivan', last_name: 'Ivanov' }
    const user2 = { id: 2, first_name: 'Ivan', last_name: 'Petrov' }
    const user3 = { id: 3, first_name: 'Petr', last_name: 'Ivanov' }
    const user4 = { id: 4, first_name: 'Petr', last_name: 'Petrov' }
    const users = [user1, user2, user3, user4]

    const project1 = { id: 1, name: 'First', link: 'http://ex.com', user: user1 }
    const project2 = { id: 2, name: 'Second', link: 'http://ex2.com', user: user2 }
    const projects = [project1, project2]

    const todo1 = { id: 1, project: project1, text: '12342342', created: '20-Jan-2023' }
    const todo2 = { id: 2, project: project2, text: '1sdsdf2342342', created: '20-Jan-2023' }
    const todo = [todo1, todo2]

    this.state = {
      'authors': authors,
      'books': books,
      'users': users,
      'projects': projects,
      'todo': todo
    }
  }

  // componentDidMount() {
  //   axios.get('http://127.0.0.1:8000/api/authors/')
  //     .then(response => {
  //       const authors = response.data
  //       this.setState(
  //         {
  //           'authors': authors
  //         }
  //       )
  //     }).catch(error => console.log(error))
  // }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Authors</Link>
              </li>
              <li>
                <Link to='/books'>Books</Link>
              </li>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/todo'>ToDo</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={() => <AuthorList authors={this.state.authors} />} />
            <Route exact path='/books' component={() => <BookList items={this.state.books} />} />
            <Route path="/author/:id" component={() => <AuthorBookList items={this.state.books} />} />
            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} />} />
            <Route exact path='/todo' component={() => <ToDoList tasks={this.state.todo} />} />
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
      </div >
    )
  }
}

export default App;
