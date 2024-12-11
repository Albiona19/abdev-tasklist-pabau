import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material'; 

interface Option {
    id: string | number;
    title: string;
}

interface SelectProps {
    name: string;
    label: string;
    value: string | number;
    variant?: 'outlined' | 'filled' | 'standard'; 
    onChange: (event: SelectChangeEvent<string | number>) => void; 
    options: Option[]; 
    error?: string | null; 
}

const Select: React.FC<SelectProps> = (props) => {
    const { name, label, value, variant, onChange, options, error = null } = props;

    return (
        <FormControl
            variant={variant || 'outlined'}
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    options.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.title}
                        </MenuItem>
                    ))
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default Select;
