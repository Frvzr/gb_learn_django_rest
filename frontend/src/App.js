import './App.css';
import React from 'react';
import WorkerList from './components/Workers';
import ProjectList from './components/Projects';
import ToDoList from './components/Todo';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './components/Auth';
import Cookies from 'universal-cookie';
import TodoForm from './components/TodoForm';


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
      'workers': [],
      'projects': [],
      'todo': [],
      'token': ''
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

  createToDo(project, text, writer) {
    const headers = this.get_headers()
    const data = { project: project, text: text, writer: writer }
    axios.post('http://127.0.0.1:8000/api/todo/', data, { headers })
      .then(response => {
        let new_todo = response.data
        const project = this.state.projects.filter((item) => item.id == new_todo.project)[0]
        new_todo.project = project
        const text = this.state.text.filter((item) => item.id == new_todo.text)
        new_todo.text = text
        this.setState({ todo: [...this.state.todo, new_todo] })
      }).catch(error => console.log(error))
  }

  deleteToDo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers })
      .then(response => {
        this.setState({ todo: this.state.todo.filter((task) => task.id !== id) })
      }).catch(error => console.log(error))
  }

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers })
      .then(response => {
        this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }

  load_data() {
    const headers = this.get_headers()
    axios.get(`http://127.0.0.1:8000/api/workers/`, { headers })
      .then(response => {
        const workers = response.data
        this.setState(
          {
            'workers': workers['results']
          }
        )
      }).catch(error => console.log(error))

    axios.get(`http://127.0.0.1:8000/api/projects/`, { headers })
      .then(response => {
        const projects = response.data
        this.setState(
          {
            'projects': projects['results']
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
                <Link to='/workers'>Workers</Link>
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
            <Route exact path='/workers' component={() => <WorkerList items={this.state.workers} />} />
            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
            <Route exact path='/todo/create' component={() => <TodoForm createToDo={(project, text, writer) => this.createToDo(project, text, writer)} />} />
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
