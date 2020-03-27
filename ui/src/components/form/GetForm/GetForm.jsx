import axios from 'axios';

const GetForm = async (formID) => {
    try{
        const res = await axios.get(`/api/forms/templates/${formID}`);
        return res.data.template;
    } catch (error) {
        console.log(error);
    }

};

export default GetForm;