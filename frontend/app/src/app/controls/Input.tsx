import React from 'react';
import { TextField } from '@mui/material'; 

interface InputProps {
    name: string;
    label: string;
    value: string | number; 
    variant?: 'outlined' | 'filled' | 'standard'; 
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; 
    error?: string | null; 
    [x: string]: any; 
}

const Input: React.FC<InputProps> = (props) => {
    const { name, label, value, variant, onChange, error = null, ...other } = props;

    return (
        <TextField
            variant={variant || 'outlined'}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    );
};

export default Input;
