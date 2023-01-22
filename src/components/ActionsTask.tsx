import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Avatar, Divider } from '@mui/material';
import { deepOrange, grey, lightBlue } from '@mui/material/colors';


function ActionsTask() {
    const disabled = false;
    const colorTaskBuy = disabled ? grey[600] : deepOrange[500];
    const colorTaskApprove = disabled ? grey[600] : lightBlue[400];
    return (
        <Stack
            direction="row"
            justifyContent="end"
            alignItems="end"
            spacing={1}
        >
            <IconButton size='small' disabled={disabled}>
                <Avatar sx={{ bgcolor: colorTaskApprove }}>A</Avatar>
            </IconButton>
            <IconButton size='small' disabled={disabled}>
                <Avatar sx={{ bgcolor: colorTaskBuy }}>B</Avatar>
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
                <AddIcon />
            </IconButton>
            <IconButton>
                <DeleteIcon />
            </IconButton>
            <IconButton>
                <EditIcon />
            </IconButton>
        </Stack>
    )
}

export default ActionsTask;