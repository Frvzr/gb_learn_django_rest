import './App.css';
import React from 'react';
import WorkerList from './components/Users';
import ProjectList from './components/Projects';
import ToDoList from './components/Todo';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './components/Auth';
import Cookies from 'universal-cookie';



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

    this.state = {
      'worker': [],
      'project': [],
      'todo': []
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(login, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', { username: login, password: password })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный пароль'))
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json',
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  // createToDo() {
  //   const headers = this.get_headers()
  //   const data = { project: project, text: text, writer: writer, completed: completed }
  //   axios.post('http://127.0.0.1:8000/api/todo', data, { headers })
  //     .then(response => {
  //       let new_todo = response.data
  //       const project = this.state.authors.filter((item) => item.id == new_todo.project)[0]
  //       new_todo.project = project
  //       this.setState({ todo: [...this.state.todo, new_todo] })
  //     })
  // }

  deleteToDo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers })
      .then(response => {
        this.setState({ todo: this.state.todo.filter((task) => task.id !== id) })
      }).catch(error => console.log(error))
  }

  load_data() {
    const headers = this.get_headers()
    axios.get(`http://127.0.0.1:8000/api/users/`, { headers })
      .then(response => {
        const worker = response.data
        this.setState(
          {
            'worker': worker['results']
          }
        )
      }).catch(error => console.log(error))

    axios.get(`http://127.0.0.1:8000/api/projects/`, { headers })
      .then(response => {
        const project = response.data
        this.setState(
          {
            'project': project['results']
          }
        )
      }).catch(error => console.log(error))

    axios.get(`http://127.0.0.1:8000/api/todo/`, { headers })
      .then(response => {
        const todo = response.data
        this.setState(
          {
            'todo': todo['results']
          }
        )
      }).catch(error => console.log(error))

  };

  componentDidMount() {
    this.get_token_from_storage()
  };


  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/todo'>ToDo</Link>
              </li>
              <li>
                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/users' component={() => <WorkerList items={this.state.worker} />} />
            <Route exact path='/projects' component={() => <ProjectList items={this.state.project} />} />
            <Route exact path='/todo' component={() => <ToDoList tasks={this.state.todo} deleteToDo={(id) => this.deleteToDo(id)} />} />
            <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
      </div >
    )
  }
}

export default App;
