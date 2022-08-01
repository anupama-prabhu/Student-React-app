import React, { useEffect, useState } from 'react'
import Input from "../common/Input.js";
import Select from "../common/Select.js";
import TextArea from "../common/TextArea.js";
import ServerCall from '../ServerCall'
import { store } from '../store/appStore.js';
const inputControls=[
  {
    lbl:'Password',
    type:'text',
    name:'pwd',
    value:'',
    errorMsg:'Please Enter Password',
    isShowError:false
  },
  {
    lbl:'Phone',
    type:'number',
    name:'phone',
    value:'',
    errorMsg:'Please Enter Phone',
    isShowError:false
  },
  {
    lbl:'Email',
    type:'email',
    name:'email',
    value:'',
    errorMsg:'Please Enter Email',
    isShowError:false
  },
  {
    lbl:'Gender',
    type:'radio',
    name:'gen',
    options:['Male','Female'],
    value:'',
    values:['M','F'],
    errorMsg:'Please Select Gender',
    isShowError:false
  },
  {
    lbl:'Hobbies',
    type:'checkbox',
    name:'hobbies',
    options:['Cricket','Hockey','FootBall'],
    values:['CRIC','HOC','FB'],
    value:'',
    errorMsg:'Please Select Hobbies',
    isShowError:false
  },
  {
    lbl:'Country',
    name:'country',
    options:['India','US','China'],
    type:'select',
    value:'IND',
    values:['IND','US','CHI'],
    errorMsg:'Please Select Country',
    isShowError:false
  },
  {
    lbl:'Address',
    name:'address',
    type:'textarea',
    value:'',
    errorMsg:'Please Enter Address',
    isShowError:false
  }
]
export const Profile = () => {
  const [template,setTemplate]=useState('')
  const [user,setUser]=useState({})
  useEffect(()=>{
    ServerCall.fnGet(`std/get-std-uid?uid=${sessionStorage.uid}`)
    .then((res)=>{
      if(res.data.length>0){
           let _user=res.data[0]
           setUser(_user)
           inputControls.forEach((obj)=>{
                obj.value=_user[obj.name]
           })
           fnPrepareTemplate()
      }
    })
    .catch((res)=>{

    })
 
  },[])

  const fnUpdate=()=>{
    let isFormValid=true
    let dataObj={}
    inputControls.forEach((obj)=>{
        dataObj[obj.name]=obj.value
        if(!obj.value){
          obj.isShowError=true
          isFormValid=false
        }
    })
    fnPrepareTemplate()
    if(!isFormValid)return;

    ServerCall.fnPut(`std/update-std/${sessionStorage.uid}`,{data:dataObj})
    .then((res)=>{
        console.log(res.data)
        const {acknowledged,modifiedCount}=res.data
        if(acknowledged && modifiedCount>0){
          alert('Succesffully Updated')
        }else{
          alert('Not Updated, try again')
        }
    })
    .catch((res)=>{
        alert('Something went wrong')
    })
  }

  const fnTerminate=()=>{
    let isOk=window.confirm('R u Sure...')
    if(isOk){
       alert('std/delete-std?uid='+sessionStorage.uid)
       ServerCall.fnDelete('std/delete-std?uid='+sessionStorage.uid)
       .then((res)=>{
        const {acknowledged,deletedCount}=res.data
        if(acknowledged && deletedCount>0){
          alert('Succesffully Terminated')
          sessionStorage.clear();
          store.dispatch({
            type:'LOGOUT'
          })
        }else{
          alert('Not Terminated, try again')
        }
       })
       .catch((res)=>{
        alert('Something went wrong')
       })
    }
  }
 
  const fnChange=(eve)=>{
    const {name,value,type,id,checked,files}=eve.target
    let inputControlObj=inputControls.find((obj)=>{
        return obj.name==name
    })
    switch(type){
      case 'checkbox':
        let valuesArr=inputControlObj.value=='' ? [] : inputControlObj.value.split(',')
        if(checked){
          valuesArr.push(id)
        }else{
            let _index=valuesArr.indexOf(id)
            valuesArr.splice(_index,1)
        }
        inputControlObj.value=valuesArr.join()
        fnUpdateTemplate(inputControlObj,inputControlObj.value)
        break;
      default:
        inputControlObj.value=value
        fnUpdateTemplate(inputControlObj,value)
    }
  }
  const fnUpdateTemplate=(inputControlObj,value)=>{
    inputControlObj.isShowError=value ? false : true
    fnPrepareTemplate()
  }
 const fnPrepareTemplate=()=>{
  let inputControlsArr= inputControls.map((obj)=>{
    switch(obj.type){
      case 'text':
      case 'password':
      case 'radio':
      case 'checkbox':
      case 'number':
      case 'email':
        return <Input dataObj={{...obj,fnChange}} />
      case 'select':
        return <Select dataObj={{...obj,fnChange}} />
      case 'textarea':
        return <TextArea dataObj={{...obj,fnChange}} />
    }
})
 setTemplate(inputControlsArr)
  }
  return (
    <div className='form-control mb-5'>
      <h3 className='mt-3 mb-3'>Profile</h3>
      {template}
      <img className='profile-img' src={user.photo} width={150} height={150} ></img>
      <b className='profile-name'>{user.uid}</b>
      <div className="row">
           <div className="offset-sm-5 col-sm-7 text-start">
                <button onClick={fnUpdate} className="btn btn-primary me-3">Update</button>
                <button onClick={fnTerminate} className="btn btn-primary me-3">Terminate</button>
           </div>
       </div>
    </div>
  )
}
