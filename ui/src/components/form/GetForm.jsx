import axios from 'axios';

const GetForm = (formID, url) => {
  return axios.get(`${url}/${formID}`);
};

export default GetForm;
