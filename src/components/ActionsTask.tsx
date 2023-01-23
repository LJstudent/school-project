import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Avatar, Divider } from '@mui/material';
import { deepOrange, grey, lightBlue, red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { ApproveRecordByDirector, DeclineRecordByDirector } from '../state/datarecord/dataRecordSlice';

interface IOuterProps {
    dataRecordId: number | undefined;
    user: number | undefined;
}

function ActionsTask(props: IOuterProps) {
    const { dataRecordId, user } = props;
    let disabledApprove = false;
    let disabledBuy = true;

    const dataRecords = useAppSelector((state) => state.datarecords.dataRecords);
    const dispatch = useAppDispatch()
    const list = dataRecords.filter(dataRecord => dataRecord.id === dataRecordId);

    if (user === 1) {
        disabledApprove = true
    }

    if (list[0].approved_by_director === true && list[0].approved_by_purchasing_department === true) {
        disabledBuy = false
    }

    const colorTaskApprove = disabledApprove ? grey[600] : lightBlue[400];
    const colorTaskDecline = disabledApprove ? grey[600] : red[400];
    const colorTaskBuy = disabledBuy ? grey[600] : deepOrange[500];

    const handleApprove = () => {
        if (dataRecordId && user) {
            dispatch(ApproveRecordByDirector({dataRecordId: dataRecordId, user: user}))
        }
    }

    const handleDecline = () => {
        if (dataRecordId && user) {
            dispatch(DeclineRecordByDirector({dataRecordId: dataRecordId, user: user}))
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