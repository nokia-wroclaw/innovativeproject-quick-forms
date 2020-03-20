import axios from "axios";

const Submit = props => {
    return axios.post('./api/forms/create', props.form)
        .then(res => console.log(res))
        .catch(e => console.log(e))
};

export default Submit

