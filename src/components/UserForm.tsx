import { MenuItem, TextField } from '@mui/material';
import React from 'react';

const users = [
    {
        value: 1,
        label: 'Purchase assistant',
    },
    {
        value: 2,
        label: 'Head of purchasing department',
    },
    {
        value: 3,
        label: 'Director',
    },
];

interface IOuterProps {
    setUser: React.Dispatch<React.SetStateAction<number | undefined>>
}

function UserForm(props : IOuterProps) {

    const handleChangeUsers = (value: number) => {
        props.setUser(value);
    }

    return (
        <TextField
            id="standard-select-currency"
            select
            defaultValue={1}
            helperText="Please select your user"
            variant="standard"
        >
            {users.map((option) => (
                <MenuItem key={option.value} value={option.value} onClick={event => handleChangeUsers(option.value)}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default UserForm;