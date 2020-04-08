import axios from 'axios';

const GetForm = (formID, url) => {
  return axios.get(`${url}/${formID}`).catch(error => {
    // handle error
    console.log(error);
  });
};

export default GetForm;
