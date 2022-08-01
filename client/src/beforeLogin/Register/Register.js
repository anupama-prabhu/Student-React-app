import React    from "react";
import template from "./Register.jsx";
import Input from "../../common/Input.js";
import Select from "../../common/Select.js";
import TextArea from "../../common/TextArea.js";
import ServerCall from '../../ServerCall'
const inputControls=[
  {
    lbl:'User Id',
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
  },
  {
    lbl:'Photo',
    type:'file',
    name:'photo',
    value:'',
    errorMsg:'Please Select Photo',
    isShowError:false
  }
]

class Register extends React.Component {

  state={
    template:''
  }

  componentDidMount(){
    this.fnPrepareTemplate()
  }

  fnChange=(eve)=>{
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
        this.fnUpdateTemplate(inputControlObj,inputControlObj.value)
        break;
      case 'file':
        let fileObj=files[0]
        const reader=new FileReader()
        reader.readAsDataURL(fileObj)
        reader.onload=()=>{
            let result=reader.result
            inputControlObj.value=result
            this.fnUpdateTemplate(inputControlObj,value)
        }
        reader.onerror=()=>{
            inputControlObj.value=''
            this.fnUpdateTemplate(inputControlObj,value)
        }
        break;
      default:
        inputControlObj.value=value
        this.fnUpdateTemplate(inputControlObj,value)
    }
    
  }
  fnUpdateTemplate=(inputControlObj,value)=>{
    inputControlObj.isShowError=value ? false : true
    this.fnPrepareTemplate()
  }
  fnPrepareTemplate=()=>{
    let inputControlsArr= inputControls.map((obj)=>{
          switch(obj.type){
            case 'text':
            case 'password':
            case 'file':
            case 'radio':
            case 'checkbox':
            case 'number':
            case 'email':
              return <Input dataObj={{...obj,fnChange:this.fnChange}} />
            case 'select':
              return <Select dataObj={{...obj,fnChange:this.fnChange}} />
            case 'textarea':
              return <TextArea dataObj={{...obj,fnChange:this.fnChange}} />
          }
      })
    this.setState({
      template:inputControlsArr
    })
  }
  fnRegister=()=>{
    let isFormValid=true
    let dataObj={}
    inputControls.forEach((obj)=>{
        dataObj[obj.name]=obj.value
        if(!obj.value){
          obj.isShowError=true
          isFormValid=false
        }
    })
    this.fnPrepareTemplate()
    if(!isFormValid)return;
    ServerCall.fnPost('std/reg-std',{data:dataObj})
    .then((res)=>{
        const {acknowledged,insertedId}=res.data
        if(acknowledged && insertedId){
          alert('Succesffully registered')
          inputControls.forEach((obj)=>{
              if(obj.name=='country'){
                obj.value='IND'
              }else{
                obj.value=''
              }
          })
          this.fnPrepareTemplate()
          document.querySelector('[name=photo]').value='';
        }else{
          alert('Not Inserted, try again')
        }
    })
    .catch((res)=>{
        alert('Something went wrong')
    })
  }
  render() {
    return template.call(this);
  }
}

export default Register;
