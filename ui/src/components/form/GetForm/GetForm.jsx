const GetForm = formData => {
    fetch(`./api/forms/${formData}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);

        });
};
export default GetForm;