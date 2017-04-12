import React, { Component, PropTypes } from 'react';
import { Field , reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createTodo } from '../actions/index';
import { Link } from 'react-router';

const createInput = function(input, type, error){
    const inputClass = `form-control ${error ? 'form-control-danger': ''}`;

    switch(type){
        case 'textarea':
            return (
                <textarea {...input} className={inputClass}></textarea>
            );
        default:
            return (
                <input {...input} className={inputClass} type={type}/>
            )
    }
};

const renderInput = function({ input, label, type, meta: { touched, error } }){
    const hasError = touched && error;
    return (
        <div className={`form-group row ${hasError ? 'has-danger' : ''}` }>
            <label className="col-sm-3 col-form-label">{ label }</label>
            <div className="col-sm-9">
                { createInput(input, type, hasError)}
                <div className='form-control-feedback'>
                    {hasError ? error: ''}
                </div>
            </div>
        </div>
    )
};

class TodoNew extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    onSubmit(formProps){
        this.props.createTodo(formProps).then(() => {
            this.context.router.push('/');
        });
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <div>
                <h2>Create New Todo Item</h2>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="title" component={renderInput} type="text" label="Title" />
                    <Field name="details" component={renderInput} type="textarea" label="Details" />
                    <Field name="completeBy" component={renderInput} type="date" label="Complete By" />
                    <br/>
                    <button className="btn btn-primary">Add Item</button>
                    <Link to='/' type="button" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.title){
        errors.title = "Enter a title";
    }
    if(!values.details){
        errors.details = "Enter some details about you todo item";
    }
    if(!values.completeBy){
        errors.completeBy = "Enter a date to complete by!";
    }
    return errors;
}

export default connect(null, { createTodo })(reduxForm({
    form: 'TodoNew',
    validate
})(TodoNew));