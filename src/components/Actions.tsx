import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";


function Actions() {
    return (
        <Stack
            direction="row"
            justifyContent="end"
            alignItems="end"
            spacing={2}
        >
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

export default Actions;