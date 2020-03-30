import React from 'react';
import axios from "axios";
import {SingleForm} from "../SingleForm/SingleForm";

class ListOfForms extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listOfForms: []
        };
    }

    componentDidMount() {
        axios
            .get(`/api/forms/templates/`)
            .then(response => {
                this.setState({listOfForms : response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        return(
                <div>
                    {this.state.listOfForms.map(index => (
                        <SingleForm key={index._id} template = {index.template}/>
                    ))}
                </div>
        );
    }
}

export default ListOfForms;