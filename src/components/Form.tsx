import { Paper, Grid, TextField } from "@mui/material";
import React from "react";
import { useAppSelector } from "../state/hooks";
import StyledFormPreview from "./styled/StyledFormPreview";


interface IOuterProps {
    dataRecordId: number | undefined
}

function Form(props: IOuterProps) {
    const { dataRecordId } = props;
    const dataRecords = useAppSelector((state) => state.datarecords.dataRecords);
    const list = dataRecords.filter(dataRecord => dataRecord.id === dataRecordId);

    return (
        <React.Fragment>
            <StyledFormPreview>
                <Paper>
                    <Grid container item={true} direction="row">
                        {list.map((dataRecord) => (
                            <form>
                                <Grid container item={true} direction="row" spacing={2}>
                                    <Grid className="grid-item">
                                        <TextField
                                            id="standard-read-only-input"
                                            label="Item"
                                            value={dataRecord.item}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid className="grid-item">
                                        <TextField
                                            id="standard-read-only-input"
                                            label="amount"
                                            value={dataRecord.amount}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid  className="grid-item">
                                        <TextField
                                            id="standard-read-only-input"
                                            label="Purchase price"
                                                value= {`$ ${dataRecord.purchase_price}`}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        ))}
                    </Grid>
                </Paper>
            </StyledFormPreview>
        </React.Fragment>
    );
}

export default Form;
