import axios from 'axios';

const DeleteForm = formID => {
  axios.delete(`/api/forms/filled-forms/${formID}`).catch(error => {
    // handle error
    console.log(error);
  });
  axios.delete(`/api/forms/templates/${formID}`).catch(error => {
    // handle error
    console.log(error);
  });
};

export default DeleteForm;
