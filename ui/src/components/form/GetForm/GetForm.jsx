import axios from 'axios';

const GetForm = formData => {
    axios.get(`./api/forms/${formData}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
};
export default GetForm;