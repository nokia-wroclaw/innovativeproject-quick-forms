import axios from "axios";
export const GetFormFromDatabase = async (filledFormID) => {
    try{
        let response = await axios({
            method:'get',
            url:`api/forms/pendingforms/whole-key/${filledFormID}`,
            baseURL:'/'
        });

        if (response.data === null){
            response = await axios({
                method:'get',
                url:`api/forms/filled-forms/whole-key/${filledFormID}`,
                baseURL:'/'
            });
        }

        return response;
    } catch (err) {
        console.log("error", err);
    }
}