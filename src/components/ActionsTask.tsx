import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Divider } from '@mui/material';
import { deepOrange, grey, lightBlue, red } from '@mui/material/colors';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useAppSelector } from '../state/hooks';
import { useUpdateDataRecordMutation } from '../state/services/dataRecord.services';

interface IOuterProps {
    dataRecordId: number | undefined;
    user: number | undefined;
}

function ActionsTask(props: IOuterProps) {
    const [updatePost] = useUpdateDataRecordMutation()
    const { dataRecordId, user } = props;
    let disabledApprove = false;
    let disabledBuy = true;

    const dataRecords = useAppSelector((state) => state.datarecords.dataRecords);
    const list = dataRecords.filter(dataRecord => dataRecord.id === dataRecordId);

    if (!dataRecordId || user === 1) {
        disabledApprove = true
    }

    if (list && list[0]?.approved_by_director === 1 && list[0]?.approved_by_purchasing_department === 1) {
        disabledBuy = false
    }


    const colorTaskApprove = disabledApprove ? grey[600] : lightBlue[400];
    const colorTaskDecline = disabledApprove ? grey[600] : red[400];
    const colorTaskBuy = disabledBuy ? grey[600] : deepOrange[500];

    const handleApprove = () => {
        if (dataRecordId && user) {
            if (user === 3) {
                updatePost({ id: dataRecordId, approved_by_director: 1 })
            }
            if (user === 2) {
                updatePost({ id: dataRecordId, approved_by_purchasing_department: 1 })
            }
        }
    }

    const handleDecline = () => {
        if (dataRecordId && user) {
            if (user === 3) {
                updatePost({ id: dataRecordId, approved_by_director: 0 })
            }
            if (user === 2) {
                updatePost({ id: dataRecordId, approved_by_purchasing_department: 0 })
            }
        }
    }
    return (
        <Stack
            direction="row"
            justifyContent="end"
            alignItems="end"
            spacing={1}
        >
            <IconButton size='small' disabled={disabledApprove} onClick={event => handleApprove()}>
                <Avatar sx={{ bgcolor: colorTaskApprove }}>A</Avatar>
            </IconButton>
            <IconButton size='small' disabled={disabledApprove} onClick={event => handleDecline()}>
                <Avatar sx={{ bgcolor: colorTaskDecline }}>D</Avatar>
            </IconButton>
            <IconButton size='small' disabled={disabledBuy}>
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