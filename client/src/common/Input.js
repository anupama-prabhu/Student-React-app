import React from "react"

const Input=(props)=>{
    const {lbl,type,name,options,value,errorMsg,isShowError,fnChange,values}=props.dataObj
      const prepareInputControls=()=>{
            switch(type){
                case 'text':
                case 'number':
                case 'password':
                case 'email':
                    return <input onChange={fnChange} value={value} name={name} type={type} className="form-control" />
                case 'file':
                    return <>
                    <input onChange={fnChange}  name={name} type={type} className="form-control" />
                    <img src={value} width='100px' height='100px'></img>
                    </>
                case 'radio':
                        return options.map((opt,index)=>{
                            return <><input checked={value == values[index]} value={values[index]} onChange={fnChange} name={name} type={type} /> <span className="me-3">{opt}</span></>
                        })
                case 'checkbox':
                    return options.map((opt,index)=>{
                        return <><input checked={value.includes(values[index])} id={values[index]} onChange={fnChange} name={name} type={type} /> <span className="me-3">{opt}</span></>
                    })
            }
      }
      return <div className="row mb-3">
            <div className="col-sm-5 text-end">
                <b>{lbl}:</b>
            </div>
            <div className="col-sm-3 text-start">
                {prepareInputControls()}
            </div>
            <div className="col-sm-4 text-start">
                  {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>

      </div>
}

export default Input