import { Grid } from '@mui/material';
import { styled } from '@mui/system';


const StyledFormPreview = styled(Grid)(({ theme }) => ({
    '.grid-item' : {
        padding: theme.spacing(4),
    }
}));

export default StyledFormPreview;