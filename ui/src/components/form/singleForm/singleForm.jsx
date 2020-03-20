import React from "react";

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
          <div className="singleForm.component">
              {typeof(this.state.form)}
              <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
          </div>
        );
    }
}

export default SingleForm;
