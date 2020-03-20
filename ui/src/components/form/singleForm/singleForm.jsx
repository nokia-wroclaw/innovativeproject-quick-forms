import React from "react";
import axios from "axios";
import Submit from "../addForm";

class SingleForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            form: []
        }
    }
    //5e738e611c9d4400008103ca
    //TODO: hardcoded, change that
    componentDidMount() {
        fetch("./api/forms/5e738e611c9d4400008103ca")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({form: res})
            });
            }

    render(){
        return(
          <div className="singleForm">
              {console.log(this.state.form)}
              <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
              <button onClick={() => Submit(this.state.form)} > Submit</button>
          </div>
        );
    }
}

export default SingleForm;
