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
      const toSearch = input.toLowerCase();
        axios.get(`/api/forms/pendingForms/key/${toSearch}`)
            .then(res => {
                console.log(res)
                if (res !== null){
                    setOutputStatus(status.PENDING);
                    if (res.data.templateID && res.data.filledFormNumberID)
                    redirect(res.data.templateID, res.data.filledFormNumberID);
                }
                else {
                    axios.get(`/api/forms/filled-forms/key/${toSearch}`)
                        .then(res => {
                            if (res !== null){
                                setOutput(res);
                                setOutputStatus(status.ACCEPTED);
                                if (res.data.templateID && res.data.filledFormNumberID)
                                    redirect(res.data.templateID, res.data.filledFormNumberID);
                            }
                            console.log(res.status)
                        })
                        .catch(err => {
                            setOutputStatus(status.DOESNOTEXIST);
                            console.log(err)
                        });
                }
                console.log(res.status)
            })
            .catch(err => {
                setOutputStatus(status.DOESNOTEXIST);
                console.log(err)
            });
      console.log(outputStatus)

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

    const redirect = (templateID, formID) => {
        window.open(`userform/${templateID}/${formID}`)
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