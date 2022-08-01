import React from "react"

const TextArea=(props)=>{
    const {lbl,name,fnChange,value,errorMsg,isShowError}=props.dataObj
      
      return <div className="row mb-3">
            <div className="col-sm-5 text-end">
                <b>{lbl}:</b>
            </div>
            <div className="col-sm-3 text-start">
                 <textarea value={value} onChange={fnChange} name={name} className="form-control"></textarea>
            </div>
            <div className="col-sm-4 text-start">
            {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>

      </div>
}

export default TextArea