import React from 'react'
import Input from '@material-ui/core/Input';
import {useState} from 'react';
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from 'axios'

function Finder()  {
  const [input, setInput] = useState("");
    const [output, setOutput] = useState({});
  const [outputStatus, setOutputStatus] = useState(0);

    const handleSubmit = (e) => {
      e.preventDefault();
      const key = input.toLowerCase();
      findFormInDatabase(key).then(response => {
          console.log(response)
          if (response.templateID !== undefined && response.filledFormNumberID !== undefined)
            redirect(response.templateID, response.filledFormNumberID)
      });
    }

    const redirect = (templateID, formID) => {
        window.open(`userform/${templateID}/${formID}`)
    }

    const findFormInDatabase = async (key) => {
        try{
            let response = await axios({
                method:'get',
                url:`api/forms/pendingforms/key/${key}`,
                baseURL:'/'
            });

            console.log(response.data);

            if (response.data === null) {
                response = await axios({
                    method:'get',
                    url:`api/forms/filled-forms/key/${key}`,
                    baseURL:'/'
                });
            }

            if (response.data !== null){
                return response.data
            }
             console.log(response.data);

        }catch (err) {
            console.log(err)
        }

    }

    const status = {
        TOBEFILLED: 1,
        PENDING: 2,
        ACCEPTED: 3,
        DOESNOTEXIST: 4
    }

    const handleStatus = () => {
        let message;
        switch (outputStatus) {
            case status.TOBEFILLED:
                message = "Form is ready to be filled"
                break;
            case status.PENDING:
                message = "Form is waiting to be accepted"
                break;
            case status.ACCEPTED:
                message = "Form was accepted"
                break;
            case status.DOESNOTEXIST:
                message = "Form does not exist"
                break;
        }
       return message
    }


    return(
        <Container>
        <Input onChange={e => {
            setInput(e.target.value)
            console.log(input)
        }}/>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {
            handleSubmit(e);
        }}>
            Search
        </Button>
            <h1>{handleStatus()}</h1>
        </Container>
    )
}

export default Finder