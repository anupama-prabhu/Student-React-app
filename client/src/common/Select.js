import React from "react"

const Select=(props)=>{
    const {lbl,type,name,value,options,fnChange,values,isShowError,errorMsg}=props.dataObj
      
      return <div className="row mb-3">
            <div className="col-sm-5 text-end">
                <b>{lbl}:</b>
            </div>
            <div className="col-sm-3 text-start">
                 <select onChange={fnChange} name={name} className="form-control">
                     {
                        options.map((v,i)=>{
                            return <option selected={values[i]==value}  value={values[i]} key={i}>{v}</option>
                        })
                     }
                 </select>
            </div>
            <div className="col-sm-4 text-start">
            {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>

      </div>
}

export default Select