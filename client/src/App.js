import logo from './logo.svg';
import './App.css';
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import { BeforeLogin } from './beforeLogin/BeforeLogin';
import { AfterLogin } from './afterLogin/AfterLogin';
import { connect } from 'react-redux';
import {store} from './store/appStore'
import { useEffect } from 'react';
function App(props) {
 
  useEffect(()=>{
    let token=sessionStorage.token;
    store.dispatch({
     type:'LOGIN',
     payload:token ? true: false
    })
  },[])

  return (
    <div className="App">
        <Header />
          {props.isLoggedIn ? <AfterLogin /> : <BeforeLogin />
          }
         
        <Footer />
    </div>
  );
}

App=connect(
  (state)=>{
      return {
          isLoggedIn:state.appReducer.isLoggedIn
      }
  }
)(App)
export default App;
