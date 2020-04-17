import axios from 'axios';

const DeleteForm = formID => {
  axios
    .delete(`/api/forms/filled-forms/${formID}`)
    .catch(error =>
      console.log(`Bląd usuwania wypelnonych formularzy${error}`)
    );
  axios
    .delete(`/api/forms/templates/${formID}`)
    .catch(error => console.log(`Bląd usuwania template formularza${error}`));
};

export default DeleteForm;
