import CancelIcon from '@mui/icons-material/Cancel';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../state/hooks';
import { useGetDataRecordsQuery } from '../state/services/dataRecord.services';
import Actions from './Actions';
import ActionsTask from './ActionsTask';
import Form from './Form';
import StyledMain from './styled/StyledMain';
import UserForm from './UserForm';


const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

function Main() {
    // start of getting data
    useGetDataRecordsQuery('', {
        pollingInterval: 5000
    });

    const dataRecords = useAppSelector((state) => state.datarecords.dataRecords);
    const [listId, setlistId] = React.useState<number | undefined>(undefined);
    const prevDataRecords = usePrevious({ dataRecords, listId });
    const check = JSON.stringify(dataRecords) !== JSON.stringify(prevDataRecords?.dataRecords) ? true : false;

    const [dataRecordId, setDataRecordId] = React.useState<number | undefined>(undefined);
    const [granted, setGranted] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<number | undefined>(1);

    const handleRowClick = (dataRecordId: number) => {
        setDataRecordId(dataRecordId)
    }


    useEffect(() => {
        // Update the document title using the browser API
        if (Notification.permission === 'granted') {
            setGranted(true);
        } else if (Notification.permission !== 'denied') {
            let permission = Notification.requestPermission();
            permission.then((res) => {
                if (res === 'granted') {
                    setGranted(true);
                } else {
                    setGranted(false);
                }
            });
            permission.catch((err) => {
                // This is never called
            });
        }

        if (granted && check && user === 1) {
            const number = checkDataRecordOnApprove();
            setlistId(number);
            if (number) {
                showNotification(number);
            }
        }

    }, [granted, check, user]);

    const checkDataRecordOnApprove = () => {
        const list: any = []
        dataRecords
            .filter(datarecord => datarecord.approved_by_director === 1 && datarecord.approved_by_purchasing_department === 1)
            .map(datarecord => list.push(datarecord.id));
        if (list.length > 0) {
            const latestListId = parseInt(list.slice(-1).pop())
            if (latestListId !== prevDataRecords?.listId) {
                return latestListId;
            }
        } else {
            return undefined
        }
    }

    const showNotification = (id: number) => {
        // create a new notification
        const notification = new Notification(`Order item ${id}`, {
            body: 'Is ready for buy order',
        });

        // close the notification after 10 seconds
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);
    }

    return (
        <StyledMain>
            <UserForm setUser={setUser} />
            <ActionsTask dataRecordId={dataRecordId} user={user} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Id</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Purchase price&nbsp;($)</TableCell>
                            <TableCell align="center">Approved by purchasing department</TableCell>
                            <TableCell align="center">Approved by director</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataRecords.map((dataRecord) => {
                            return (
                                <TableRow
                                    onClick={event => handleRowClick(dataRecord.id)}
                                    key={dataRecord.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                     <TableCell align="left">
                                        {dataRecord.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dataRecord.item}
                                    </TableCell>
                                    <TableCell align="right">{dataRecord.amount}</TableCell>
                                    <TableCell align="right">$ {dataRecord.purchase_price}</TableCell>
                                    <TableCell align="center"> {dataRecord.approved_by_purchasing_department === 1 ? <TaskAltIcon /> :
                                        (dataRecord.approved_by_purchasing_department === -1 ? null : <CancelIcon />)}</TableCell>
                                    <TableCell align="center">
                                        {dataRecord.approved_by_director === 1 ? <TaskAltIcon /> :
                                            (dataRecord.approved_by_director === -1 ? null : <CancelIcon />)}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Actions />
            <Form dataRecordId={dataRecordId} />
        </StyledMain>
    );
}

export default Main;
