import axios from 'axios';

const Submit = (formData, url) => {
  console.log('Data submitted: ', formData, 'On route: ', url);
  return axios.post(url, formData)};


export default Submit;
