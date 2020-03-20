import axios from "axios";

const Submit = ({formData}) => {
    console.log("Data submitted: ",  formData);
    axios.post('/api/forms/create', formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

export default Submit

 