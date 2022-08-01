import React    from "react";
import template from "./Login.jsx";
import Input from "../../common/Input.js";
import ServerCall from '../../ServerCall'
import {store} from '../../store/appStore'
const inputControls=[
  {
    lbl:'User ID',
    type:'text',
    name:'uid',
    value:'',
    errorMsg:'Please Enter Uid',
    isShowError:false
  },
  {
    lbl:'Password',
    type:'password',
    name:'pwd',
    value:'',
    errorMsg:'Please Enter Password',
    isShowError:false
  }
  
]
class Login extends React.Component {
  state={
    template:''
  }
  componentDidMount(){
    this.prepareTemplate()
  }
  prepareTemplate=()=>{
    let inputControlsArr=  inputControls.map((obj,index)=>{
           return <Input key={index} dataObj={{...obj,fnChange:this.fnChange}} />
      })
    
      this.setState({
        template:inputControlsArr
      })
  }
  fnChange=(eve)=>{
    const {name,value}=eve.target
    const inputControlObj=inputControls.find((obj)=>{
        return obj.name==name
    })
    inputControlObj.value=value;
    inputControlObj.isShowError=false 
    if(!value){
      inputControlObj.isShowError=true
    }
    // if(name=='uid' && value !=''){
    //    if(value.length < 5){
    //     inputControlObj.isShowError=true;
    //     inputControlObj.errorMsg='Min 5 chars'
    //    }
    // }
    this.prepareTemplate()
  }
  fnLogin=async ()=>{
    let isFormValid=true
    let dataObj={}
      inputControls.forEach((obj)=>{
      dataObj[obj.name]=obj.value
        if(!obj.value){
          obj.isShowError=true
          isFormValid=false
        }
    })
    this.prepareTemplate()
    if(!isFormValid)return;
    const res=await ServerCall.fnPost('std/login',{data:dataObj})
    const {status,data}=res;
    if(status==200){
        if(data.length > 0){
          const {token,uid}=data[0]
          sessionStorage.token=token;
          sessionStorage.uid=uid;
          store.dispatch({
            type:'LOGIN',
            payload:true
          })
        }else{
          alert('Please check entered uid or pwd')
        }
    }else{
      alert('Something went wrong')
    }
  }
  render() {
    return template.call(this);
  }
}

export default Login;
