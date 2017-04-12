import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchTodo, deleteTodo } from '../actions/index';

class TodoView extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount(){
        this.props.fetchTodo(this.props.params.id).then(data => {
            console.log('Data is: ', data);
        });
    }

    onDeleteClick(){
        this.props.deleteTodo(this.props.params.id).then(() => {
           this.context.router.push('/');
        })
    }

    render(){
        const { todo } = this.props;

        if(!todo){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>{todo.title}</h3>
                <button
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger float-right">Delete To Do Item</button>
                <h5>Complete by: {todo.dueDate}</h5>
                <p>{todo.details}</p>
                <p>Created: {todo.created}</p>
                <p>Status: {todo.completed ? 'Completed' : 'Not Completed'}</p>
                <Link to="/" className='btn btn-info'>Go Back</Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { todo: state.todos.todo }
}

export default connect(mapStateToProps, { fetchTodo, deleteTodo })(TodoView);