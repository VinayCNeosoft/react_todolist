import React from 'react'
import { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'

class ToDoo extends Component {
    constructor() {
      super();
  
      this.state = {
        currentTodo: "",
        priority:'',
        todos: [
          {
            todo: "bake a cake",
            priority:3,
            isCompleted: true
          },
          {
            todo: "go for a walk",
            priority:2,
            isCompleted: false
          },
          {
            todo: "Complete assign Work",
            priority:5,
            isCompleted: false
          }
        ]
      };
      this.click=this.click.bind(this);
    }
  
    createNewTodo(currentTodo,priority) {
      let todosArray = [...this.state.todos];
      todosArray.push({
        todo: currentTodo,
        priority:priority,
        isCompleted: false
      });
      this.setState({ todos: todosArray });
    }
    updateTask(event) {
        this.setState({
          currentTodo: event.target.value,
        });
      }
      updatePriority(event) {
        this.setState({
          priority: event.target.value,
        });
      }
    completeTodo(index) {
      let todosArray = [...this.state.todos];
      todosArray[index].isCompleted = !todosArray[index].isCompleted;
      this.setState({ todos: todosArray });
    }
  
    deleteTodo(index) {
      let todosArray = [...this.state.todos];
      todosArray.splice(index, 1);
      this.setState({ todos: todosArray });
    }

    click(event){
        event.preventDefault();
        this.createNewTodo(this.state.currentTodo,this.state.priority);
        this.setState({ currentTodo: "",priority: "" });
    }
    handleLogout = () => {
      this.props.history.push("/");
      localStorage.clear();
    };
    render() {
      return (
        <>
        <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link className="navbar-brand mb-0 h1" to="/">
                        <img src="images/todo.png" width="40" height="40" className="d-inline-block align-top" alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/todo">Todo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.handleLogout}>Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.handleLogout}>{localStorage.getItem("email")}</Link>
                        </li>
                        </ul>
                    </div>
            </nav>
        </Router>
        <div className="container">
        <form onSubmit={this.click}>
        <div className="row">
            <div className="col-7">
                <input className="todo-input" type="text" value={this.state.currentTodo} onChange={this.updateTask.bind(this)} placeholder="Add Task"/>
            </div>
          
            <div className="col-3">
                <input className="todo-input" type="number" value={this.state.priority} onChange={this.updatePriority.bind(this)} placeholder="Priority"/>
            </div>

            <div className="col-2">
                <button type="submit" className="btn btn-success">Add</button></div>
            </div>
        </form>
        </div>
        {/* {this.state.todos.length > 0 && `${this.state.todos.length} items`} */}
        <div className="container">
            <center>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Priority</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.todos.map((todo, index) => (
                            <tr key={index}>
                                <td key={index} className={todo.isCompleted ? "done" : ""}>{todo.todo}</td>
                                <td className={todo.isCompleted ? "done" : ""}>{todo.priority}</td>
                                <td className="checkbox" onClick={() => this.completeTodo(index)}><span>&#x2714;</span>
                                {todo.isCompleted }
                                </td>
                                <td key={todo} className="delete" onClick={() => this.deleteTodo(index)}>&#128465;</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </center>
        </div>
        </>
      );
      
    }
  }
  export default ToDoo;