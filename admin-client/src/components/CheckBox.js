import React from 'react'

const CheckBox = ({ isChecked, label, checkHandler, index }) => {

  return (
      <div className="form-check form-check-inline">         
          <label htmlFor={`check-box-${index}`}
              className="form-check-label"
          >
              <input                 
                  type="checkbox"
                  className="form-check-input"
                  id={`check-box-${index}`}
                  checked={isChecked}
                  onChange={checkHandler}                  
              />      
              {label}
          </label>
      </div>
  )
}

export default CheckBox