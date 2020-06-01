import React from 'react'
import Input from '@material-ui/core/Input';
import {useState} from 'react';
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import * as classes from "react-dom/test-utils";

function Finder()  {
  const [input, setInput] = useState("");
    const [output, setOutput] = useState({});
  const [outputStatus, setOutputStatus] = useState(0);

    const handleSubmit = (e) => {
      e.preventDefault();
      const toSearch = input.toLowerCase();
      console.log(toSearch)
        axios.get(`/api/forms/pendingForms/key/${toSearch}`)
            .then(res => {
                if (res !== null){
                    setOutput(res);
                    //res.data.status or similar
                    setOutputStatus(2);
                    redirect(res.data.templateID, res.data.filledFormNumberID);
                    console.log(res.data.filledFormNumberID)
                }

                //else return axios.get(`/api/forms/filledForms/key/${toSearch}`)
            });
      console.log(output)
        //axios get PF
        //if found redirect
        //else axios get FF
        //if found redirect
        //else not found
    }

    const getStatus = () => {

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
            <h1>{outputStatus}</h1>
        </Container>
    )
}

export default Finder