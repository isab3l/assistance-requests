import React, { Component } from 'react';
import Api from './Api.js';
import Alert from './Alert.js';

const ApiBridge = new Api();

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            firstName: '',
            lastName: '',
            email: '',
            serviceType: '',
            requestBody: '',
            acceptTerms: false,
            serviceTypes: [],
            message: '',
            status: '',
            loading: true,
            lastSuccess: {}
        };

        ApiBridge.getServiceTypes()
            .then(result => {
                this.setState({ 
                    serviceTypes: result.data,
                    loading: false
                 });
                 this.setLastSuccess();
            })

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.handleSubmit(this.state)
    }

    handleSubmit = (state) => {
        this.setState({ 
            loading: true
        });

        ApiBridge.createAssistanceRequest(state)
            .then(data => {
                this.setState({
                    message: data.message,
                    status: data.status === 201 ? "info" : "warning",
                    loading: false
                })

                if (201 === data.status) {
                    this.setLastSuccess();
                }
            })
    }

    setLastSuccess = () => {
        this.setState({
            lastSuccess: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                serviceType: this.state.serviceType,
                requestBody: this.state.requestBody
            }
        })
    }

    isLastSuccess = () => {
        if ( this.state.firstName === this.state.lastSuccess.firstName &&
            this.state.lastName === this.state.lastSuccess.lastName &&
            this.state.email === this.state.lastSuccess.email &&
            this.state.serviceType === this.state.lastSuccess.serviceType &&
            this.state.requestBody === this.state.lastSuccess.requestBody) {
                return true;
            }
        return false;
    }

    render() {
        return (
            <div>
                <Alert 
                    message={this.state.message}
                    status={this.state.status} />

                <h3 className="my-3">New Assistance Request</h3> 

                <form onSubmit={this.onFormSubmit}> 
                    <div className="form-group">
                        <input
                            required
                            className="form-control"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input
                            required 
                            className="form-control"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={this.state.lastName}
                            onChange={this.handleChange} />

                    </div>
                    <div className="form-group">
                        <input
                            required
                            className="form-control"
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            value={this.state.email}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <select 
                            required
                            className="custom-select"
                            name="serviceType" 
                            value={this.state.serviceType} 
                            onChange={this.handleChange}>
                                <option value="">Select Service Type</option>
                                {
                                    this.state.serviceTypes.map((type, index) => {
                                        return <option value={type.id} key={index}>{type.display_name}</option>
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea
                            required
                            className="form-control"                     
                            name="requestBody"
                            value={this.state.requestBody}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-check">
                        <input
                            required
                            className="form-check-input"
                            type="checkbox"
                            id="acceptTerms"
                            name="acceptTerms"
                            onChange={this.handleChange} />
                        <label htmlFor="acceptTerms" className="form-check-label">I accept the terms of service.</label>

                    </div>
                    <div className="row justify-content-end px-3 my-2">
                        <button 
                            className="btn btn-primary"
                            type="submit"
                            disabled={this.state.loading || this.isLastSuccess()}>
                                Get Assistance
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
