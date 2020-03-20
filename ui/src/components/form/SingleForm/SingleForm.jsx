import React from "react";
import GetForm from "../GetForm/GetForm";

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
            let formData = '5e738e611c9d4400008103ca';
            //GetForm(formData);
           this.setState({form: GetForm.res})
            }

    render(){
        return(
          <div className="singleForm.component">
              <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
          </div>
        );
    }
}

export default SingleForm;
