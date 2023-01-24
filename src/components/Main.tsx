import CancelIcon from '@mui/icons-material/Cancel';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../state/hooks';
import { useGetDataRecordsQuery } from '../state/services/dataRecord.services';
import Actions from './Actions';
import ActionsTask from './ActionsTask';
import Form from './Form';
import StyledMain from './styled/StyledMain';
import UserForm from './UserForm';

function Main() {
    // start of getting data
    useGetDataRecordsQuery()

    const dataRecords = useAppSelector((state) => state.datarecords.dataRecords)

    const [dataRecordId, setDataRecordId] = React.useState<number | undefined>(undefined);
    const [user, setUser] = React.useState<number | undefined>(1);

    const handleRowClick = (dataRecordId: number) => {
        setDataRecordId(dataRecordId)
    }

    return (
        <StyledMain>
            <UserForm setUser={setUser} />
            <ActionsTask dataRecordId={dataRecordId} user={user}  />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
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
