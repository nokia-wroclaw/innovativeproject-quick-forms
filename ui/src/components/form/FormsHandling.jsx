import axios from 'axios';

export const GetForm = (formID, url) => {
  return axios.get(`${url}/${formID}`);
};

export const SubmitForm = (formData, url) => {
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

export const RejectPending = (pendingFormNumberID, formID) => {
  const message = {
    pendingFormNumberID: pendingFormNumberID,
    status: 'rejected',
  };
 return axios
    .post('/api/sockets/formEmit', message)
    .then(r => console.log(r))
    .catch(error => console.log(error));
};

export const AcceptForm = (pendingFormNumberID, formID) => {
  const message = {
    pendingFormNumberID: pendingFormNumberID,
    status: 'accepted',
  };

  const changeFormStatus = (obj) => {
    let res = Object.assign({}, obj);
    res.state = '3'
    return res;
  }

  const RemoveOldId = (obj, prop) => {
    let res = Object.assign({}, obj);
    delete res[prop];
    return res;
  };

  const handleFormChange = (obj, prop) => {
    let res = Object.assign({}, obj);
    res = changeFormStatus(res);
    res = RemoveOldId(res, prop);
    return res;
  }

  return new Promise((resolve, reject) => {
    GetForm(formID, '/api/forms/pendingforms/single')
      .then(formToSave =>
        SubmitForm(
          handleFormChange(formToSave.data, '_id'),
          '/api/forms/filled-forms/'
        )
      )
      .then(a => DeletePending(formID))
      .then(b => {
        axios.post('/api/sockets/formEmit', message);
        resolve('Promise resolved successfully');
      })
      .catch(error => {
        reject(Error(error)).catch(error =>
          console.error(`Błąd akceptowania formularza: ${error}`)
        );
      });
  });
};

export const RemoveProp = (obj, prop) => {
  let res = Object.assign({}, obj);
  delete res[prop];
  return res;
};
