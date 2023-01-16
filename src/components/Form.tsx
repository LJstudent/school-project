import { Paper, Grid, TextField } from "@mui/material";
import React from "react";
import StyledFormPreview from "./styled/StyledFormPreview";

function Form() {
    return (
        <React.Fragment>
            <StyledFormPreview>
                <Paper>
                    <Grid container item={true} direction="row">
                        <form>
                            <Grid container item={true} direction="row" spacing={2}>
                                <Grid item={true} className="grid-item">
                                    <TextField
                                        id="standard-read-only-input"
                                        label="ID"
                                        defaultValue="1"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true} className="grid-item">
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Item"
                                        defaultValue="coffee cups"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true} className="grid-item">
                                    <TextField
                                        id="standard-read-only-input"
                                        label="amount"
                                        defaultValue="10 000"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true} className="grid-item">
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Purchase price"
                                        defaultValue="$10 000"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item={true} className="grid-item">
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Approved by"
                                        defaultValue="Director"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </StyledFormPreview>
        </React.Fragment>
    );
}

export default Form;
