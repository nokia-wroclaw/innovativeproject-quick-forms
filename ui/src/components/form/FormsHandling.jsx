import axios from 'axios';

export const GetForm = (formID, url) => {
  return axios.get(`${url}/${formID}`);
};

export const SubmitForm = (formData, url) => {
  console.log('Data submitted: ', formData, 'On route: ', url);
  return axios.post(url, formData);
};

export const DeleteTemplate = formID => {
  return axios
    .delete(`/api/forms/filled-forms/${formID}`)
    .catch(error => console.log(`Bląd usuwania wypelnonych formularzy${error}`))
    .then(res => axios.delete(`/api/forms/pendingforms/${formID}`))
    .catch(error =>
      console.log(`Bląd usuwania oczekujacych formularzy formularzy${error}`)
    )
    .then(res => axios.delete(`/api/forms/templates/${formID}`))
    .catch(error => console.log(`Bląd usuwania template formularza${error}`));
};

export const DeletePending = formID => {
  return axios.delete(`/api/forms/pendingforms/${formID}`);
};

export const DeleteFilled = formID => {
  return axios.delete(`/api/forms/filled-forms/single/${formID}`);
};

export const AcceptForm = formID => {
  const RemoveOldId = (obj, prop) => {
    let res = Object.assign({}, obj);
    delete res[prop];
    return res;
  };
  var promise = new Promise((resolve, reject) => {
    GetForm(formID, '/api/forms/pendingforms/single')
      .then(formToSave =>
        SubmitForm(
          RemoveOldId(formToSave.data, '_id'),
          '/api/forms/filled-forms/'
        )
      )
      .then(prom => DeletePending(formID))
      .then(() => {
        resolve('Promise resolved successfully');
      })
      .catch(error => console.error(`Błąd akceptowania formularza: ${error}`))
      .catch(error => {
        reject(Error(error));
      });
  });
  return promise;
};
