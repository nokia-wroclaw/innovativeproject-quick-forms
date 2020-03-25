import axios from 'axios';

const Submit = (formData, url) => {
  console.log('Data submitted: ', formData, 'On route: ', url);
  axios
    .post(url, formData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export default Submit;
