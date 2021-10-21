import React, { Component } from 'react'
import axios from 'axios';
import './login.css'
import { Link } from 'react-router-dom';

const regForName = /^[a-zA-Z ]{2,100}$/;
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$')
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})')

export class Registration extends Component {
    constructor(props){
        super(props);
        this.state={dataList:[],id:'',fname:'',lname:'',username:'',email:'',password:'',cpassword:'',x:'',
        errors:{
            fname:'',
            lname:'',
            username:'',
            email:'',
            password:'',
            cpassword:'',
        } 
    };
   }

   handler=(event)=>{
       debugger;
       const {name,value}=event.target;
       let errors=this.state.errors;
       switch(name){
            case 'fname':
                errors.fname=regForName.test(value)?'':'* Employee first name must be 6 Character long';
                break;
            case 'lname':
                errors.lname=regForName.test(value)?'':'* Employee last name must be 6 Character long';
                break;
            case 'username':
                errors.username=regForName.test(value)?'':'* Username name must be 6 Character long and contained atleast 1 symbol and 1 Number';
                break;
            case 'email':
                errors.email = RegForEmail.test(value)?'':'* Email is in incorrect Format'
                break;
            case 'password':
                errors.password = RegForPassword.test(value)?'':'* Password Should contain atleast 1 Lowercase, 1 Uppercase, 1 Number,  1 Special Symbol and 8 Charaters long'
                break;
            case 'cpassword':
                errors.cpassword= value===this.state.password?'':'* Password did not match'
                break;
            default:
        } 
         this.setState({error:errors,[name]:value})
    }
    mainCall=async()=>{
        try{
            const URL = "http://localhost:3001/users"
            const res = await axios.get(URL)
            this.setState({dataList:res.data})
            }
        catch(err){
            console.log(err)
        }
    }   
    componentDidMount=async()=>{
        this.mainCall()
    } 
    add=async(event)=>{
        try{
            event.preventDefault();
            let formData={id:this.state.id,fname:this.state.fname,lname:this.state.lname,username:this.state.username,email:this.state.email,password:this.state.password,cpassword:this.state.cpassword}
            const URL = "http://localhost:3001/users"
            const res = await axios.post(URL,formData)
            this.setState({dataList:res.data});
            this.mainCall()
        }
        catch(err){
            console.log(err)
        }
        prompt("Sign Up Successfully")
        document.getElementById('myForm').reset();
        this.props.history.push("/login");
    }
    
    render() {
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <Link className="navbar-brand mb-0 h1" to="/">
                            <img src="images/todo.png" width="40" height="40" className="d-inline-block align-top" alt=""/></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/registration">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            </ul>
                        </div>
                </nav>
            <section className="reg">
            <div className="container-fluid reg">
                <div className="content">
                    <div className="text">
                        Register
                    </div>
                    <form onSubmit={this.add.bind(this)} id="myForm">
                    <div className="field">
                            <input type="text" required name="fname" value={this.state.fname} onChange={this.handler} helpertext={this.state.errors.fname}/>
                            <span className="fas fa-user"></span>
                            <label>First Name</label>
                    </div>
                    <span style={{color:'red',fontSize:'15px'}}>{this.state.errors.fname}</span><br/>
                    <div className="field">
                            <input type="text" required name="lname" value={this.state.lname} onChange={this.handler} helpertext={this.state.errors.lname}/>
                            <span className="fas fa-user"></span>
                            <label>Last Name</label>
                    </div>
                    <span style={{color:'red',fontSize:'15px'}}>{this.state.errors.lname}</span><br/>
                    <div className="field">
                            <input type="text" required name="username" value={this.state.username} onChange={this.handler} helpertext={this.state.errors.username}/>
                            <span className="fas fa-user"></span>
                            <label>UserName</label>
                    </div>
                    <span style={{color:'red',fontSize:'15px'}}>{this.state.errors.username}</span><br/>
                    <div className="field">
                            <input type="text" required name="email" value={this.state.email} onChange={this.handler} helpertext={this.state.errors.email}/>
                            <span className="fas fa-at"></span>
                            <label>Email</label>
                    </div>
                    <span style={{color:'red',fontSize:'15px'}}>{this.state.errors.email}</span><br/>
                    <div className="field">
                            <input type="password" required name="password" value={this.state.password} onChange={this.handler} helpertext={this.state.errors.password}/>
                            <span className="fas fa-lock"></span>
                            <label>Password</label>
                    </div>
                    <span style={{color:'red',fontSize:'15px'}}>{this.state.errors.password}</span><br/>
                    <div className="field">
                            <input type="password" required name="cpassword" value={this.state.cpassword} onChange={this.handler} helpertext={this.state.errors.cpassword}/>
                            <span className="fas fa-lock"></span>
                            <label>Confirm Password</label>
                    </div>
                    <span style={{color:'red',fontSize:'15px'}}>{this.state.errors.cpassword}</span><br/>
                        <button type="submit">Sign Up</button>
                        <div className="sign-up">
                            Already a member?
                            <Link to="/login">Sign In now</Link>
                        </div>
                    </form>
                </div>
            </div>
            </section>
          </>
        )
    }
}

export default Registration
