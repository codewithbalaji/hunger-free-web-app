import React from "react";

const TextInput = ({ id, placeholder, value, onChange }) => (
    <div className="field">
        <input 
            id={id} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            required 
            type="text" 
            style={{ display: "none" }}
        />
    </div>
);

export default TextInput;
