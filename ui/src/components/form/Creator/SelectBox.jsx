import React, { Component } from 'react'
import { Container, Typography, Paper } from '@material-ui/core'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';


class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isRequired: false,
        };
    }

    types = [
        {
            value: 'string',
            label: 'text',
        },

        {
            value: 'integer',
            label: 'number',
        }
    ];

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleRequired = () => {

        this.setState({ isRequired: !this.state.isRequired })
    }

    handleTypeChange = (event) => {
        this.setState({ inputType: event.target.value });
    }

    handleControlAdd = (event) => {
        event.preventDefault();
        this.handleClose()
        const arrayName = event.target[0].value;
        const recordName = event.target[2].value;
        const requiredRecords = event.target[3].value;
        const typeofInput = this.state.inputType;
        const ifRequired = this.state.isRequired;

        const object = {
            propName: arrayName,
            id: 0,
            isRequired: ifRequired,
            data: {
                type: "array",
                items: {
                    type: typeofInput,
                    title: recordName,
                }
            },
        };
        this.props.Add(object);

    }
    _render = () => {
        return (
            <Container ms={8} >
                <Paper >
                    <form  onSubmit={this.handleControlAdd}>
                        <TextField
                            label="Field name"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            label="Records names"
                            defaultValue=""
                            variant="outlined"
                        />
                        <TextField
                            label="Minimal records"
                            defaultValue="0"
                            variant="outlined"
                            type="numbersfafs"
                        />
                        <TextField
                            id="type"
                            select
                            label="Type"
                            value={this.state.inputType}
                            onChange={this.handleTypeChange}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {this.types.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <Checkbox
                            checked={this.state.isRequired}
                            onChange={this.handleRequired}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Add
                        </Button>
                    </form>
                </Paper>
            </Container>
        )
    }
    render() {
        return (
            <Container>
                <Typography>
                    Select Box
                </Typography>
                <Button type="submit" variant="contained" color="primary" onClick={this.handleOpen}>
                    Add
                </Button>
                <Modal
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {this._render()}
                </Modal>
            </Container>
        )
    }
}
export default SelectBox;