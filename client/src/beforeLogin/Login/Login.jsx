import "./Login.css";
import React from "react";
import {Link} from 'react-router-dom'
function template() {
  const {template}=this.state;
  return (
    <div className="login container-fluid">
      <h1 className="mt-3 mb-5">Login</h1>
       {template}
       <div className="row">
           <div className="offset-sm-5 col-sm-7 text-start">
                <button onClick={this.fnLogin} className="btn btn-primary me-3">Login</button>
                <Link to='/register'>Click Here To Register</Link>
           </div>
       </div>
    </div>
  );
};

export default template;
