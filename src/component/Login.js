import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$')
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})')

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:[],email:"",password:"",
            error:{email:"",password:""},
            e_email:"",
            e_password:"",
        };
    };

    componentDidMount(){
        fetch('http://localhost:3001/users')
        .then(res=>res.json())
        .then(data=>{
            this.setState({dataList:data})
        })
        if(localStorage.getItem("status")==="isLogged"){
            this.props.history.push("/todo")
        }
        else{
            localStorage.setItem("status",null)
        }
    }
    
    handler = (event) =>{
        const {name,value} = event.target
        let errors = this.state.error
        let {e_email,e_password} = ""
        switch(name){
            case 'email':
                errors.email = RegForEmail.test(value)?'':'Email is incorrect Format'
                if(errors.email !== ""){e_email="error"}
                else{e_email=""}
                break
            case 'password':
                errors.password = RegForPassword.test(value)?'':'Password Should contain atleast 1 Lowercase, 1 Uppercase, 1 Number,  1 Special Symbol and 8 Charaters long'
                if(errors.password !== ""){e_password="error"}
                else{e_password=""}
                break
            default:
        }
        this.setState({error:errors,[name]:value,e_email:e_email,e_password:e_password})
    }
    
    
    formSubmit=(event)=>{
        event.preventDefault();
        if(this.validate(this.state.error))
        {
            let data = this.state.dataList
            if(data.some(data=>data.email===this.state.email && data.password === this.state.password)){
                let id = data.findIndex(i=>i.email===this.state.email)
                id=parseInt(id)+1
                this.state.password=data[id-1].password
                // this.state.name=data[id-1].name
                // this.state.age=data[id-1].age
                // this.state.designation=data[id-1].designation
                // this.state.city=data[id-1].city
                localStorage.setItem("status","isLogged")
                localStorage.setItem("id",id)
                localStorage.setItem("email",this.state.email)
                localStorage.setItem("password",this.state.password)
                // localStorage.setItem("name",this.state.name)
                // localStorage.setItem("age",this.state.age)
                // localStorage.setItem("designation",this.state.designation)
                // localStorage.setItem("city",this.state.city)
                this.props.history.push("/todo")
                alert("Logged in Successfully");
                
            }
            else{
                alert("User dose not exist !")
            }
        }
        else
        {
            alert("Failed to Login")
        }
    }

    validate=(errors)=>{
        let valid=true;
        Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
        if(this.state.email==="" || this.state.password===""){valid=false}
        return valid;
    }
    handleLogout = () => {
        localStorage.clear();
        this.props.history.push("/");
      };

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
            <section>
            <div className="container-fluid ">
                <div className="log">
                    <div className="text">
                        Login
                    </div>
                    <form onSubmit={this.formSubmit}>
                        <div className="field">
                            <input type="text" required name="email" value={this.state.email} onChange={this.handler} helpertext={this.state.error.email}/>
                            <span className="fas fa-user"></span>
                            <label>Email</label>
                        </div>
                        <span style={{color:'red',fontSize:'15px'}}>{this.state.error.email}</span><br/>
                        <div className="field">
                            <input type="password" required name="password" value={this.state.password} onChange={this.handler} helpertext={this.state.error.password}/>
                            <span className="fas fa-lock"></span>
                            <label>Password</label>
                        </div>
                        <span style={{color:'red',fontSize:'15px'}}>{this.state.error.password}</span><br/>
                        <div className="forgot-pass">
                            <Link to="">Forgot Password?</Link>
                        </div>
                        <button type="submit">Sign in</button>
                        <div className="sign-up">
                            Not a member?
                            <Link to="/registration">signup now</Link>
                        </div>
                    </form>
                </div>
            </div>
            
           
            </section>
            
        </>
        )
        
    }
}

export default Login
