import React from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

const StyledButton = styled(MuiButton)(({ theme }) => ({
    margin: theme.spacing(1),
    '& .MuiButton-label': {
        textTransform: 'none',
    },
}));

const Button: React.FC<{ children: React.ReactNode; onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; }> = (props) => {
    const { children, onClick, ...other } = props;

    return (
        <StyledButton
            onClick={onClick}
            {...other}
        >
        </StyledButton>
    );
};

export default Button;
