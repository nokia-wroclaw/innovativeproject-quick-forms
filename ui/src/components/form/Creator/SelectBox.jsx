import React, { Component } from 'react';
import { Container, Typography, Paper } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { ReactSortable } from 'react-sortablejs';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isRequired: false,
            options: [],
            numberOfOptions: 0,
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleRequired = () => {
        this.setState({ isRequired: !this.state.isRequired });
    };

    handleTypeChange = event => {
        this.setState({ inputType: event.target.value });
    };
    handleOptionAdd = event => {
        event.preventDefault();

        const newOption = {
            id: this.state.numberOfOptions,
            name: event.target[0].value,
        };
        this.myFormOption.reset();
        this.setState({ numberOfOptions: this.state.numberOfOptions + 1 });
        this.setState({ options: [...this.state.options, newOption] });
    };

    removeOption(removedID) {
        const array = this.state.options.filter(function (obj) {
            return obj.id !== removedID;
        });
        this.setState({ options: array });
    }

    handleControlAdd = event => {
        event.preventDefault();
        this.handleClose();
        const selectName = event.target[0].value;
        const codeName = selectName.replace(/\s/g, '');

        const selectOptions = this.state.options.map(function (obj) {
            return obj.name
        });

        const object = {
            propName: codeName,
            id: 0,
            isRequired: this.state.ifRequired,
            data: {
                type: "string",
                title: selectName,
                enum: selectOptions
            },
        };

        this.props.Add(object);
    };
    _render = () => {
        return (
            <Container ms={8}>
                <Paper>
                    <form onSubmit={this.handleControlAdd}>
                    <TextField label="Field name" defaultValue="" variant="outlined" />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">                     
                        Add
                    </Button>
                    <Checkbox
                        checked={this.state.isRequired}
                        onChange={this.handleRequired}
                    />
                    </form>
                    <form onSubmit={this.handleOptionAdd} ref={(el) => this.myFormOption = el}>
                        <TextField label="Option name" defaultValue="" variant="outlined" />
                        <Button type="submit" variant="contained">
                            Add option
                        </Button>
                    </form>
                    <ReactSortable
                        list={this.state.options}
                        setList={newState => this.setState({ options: newState })}>
                        {this.state.options.map(item => (
                            <ListItem key={item.id}>
                                {item.name}
                                <IconButton
                                    edge="end"
                                    aria-label="comments"
                                    onClick={() => this.removeOption(item.id)}>
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </ReactSortable>
                </Paper>
            </Container>
        );
    };
    render() {
        return (
            <Container>
                <Typography>Select Box</Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.handleOpen}>
                    Add
        </Button>
                <Modal
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}>
                    {this._render()}
                </Modal>
            </Container>
        );
    }
}
export default SelectBox;
