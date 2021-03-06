import React from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateTodo } from '../redux/actions';

class TodoList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            item: { name: '', title: '' }
        }
    }

    componentDidMount() {
        this.setState({
            item: { name: '', title: '' }
        });
    }


    handleModalOpen = (item) => {
        this.setState({
            isModalOpen: true,
            item: item
        });
    };

    handleModalClose = () => {
        this.setState({
            isModalOpen: false,
            item: {}
        });
    };

    updateNotes = (e) => {
        this.setState({
            item: { ...this.state.item, notes: e.target.value }
        });
    }

    updateTitle = (e) => {
        this.setState({
            item: { ...this.state.item, name: e.target.value }
        });
    }

    updateTodo = () => {
        if (this.state.item.name) {
            this.props.dispatch(updateTodo(this.state.item));
            this.handleModalClose();
        } else {
            alert('Title is a required field.');
        }
    }

    render() {
        const { todoList } = this.props;
        return (
            <React.Fragment>
                {this.state.isModalOpen && <Dialog open={this.state.isModalOpen} onClose={this.handleModalClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter new information for this To-Do item.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            required
                            label="Title"
                            value={this.state.item.name}
                            onChange={e => this.updateTitle(e)}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="notes"
                            label="Notes"
                            value={this.state.item.notes}
                            onChange={e => this.updateNotes(e)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.updateTodo} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>}
                <div>
                    {todoList && todoList.map((item, index) => {
                        return <TodoItem handleModalOpen={this.handleModalOpen} key={index} item={item} />
                    })}
                    {todoList.length === 0 && <div style={{ marginLeft: 10 }}>Add something to do!</div>}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        todoList: state
    };
};

export default connect(mapStateToProps)(TodoList);
