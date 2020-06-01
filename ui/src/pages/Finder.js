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
        axios.get(`/api/forms/pendingForms/key/${toSearch}`)
            .then(res => {
                if (res !== null){
                    setOutputStatus(2);
                    if (res.data.templateID && res.data.filledFormNumberID)
                    redirect(res.data.templateID, res.data.filledFormNumberID);

                }
            });

        axios.get(`/api/forms/filled-forms/key/${toSearch}`)
            .then(res => {
                if (res !== null){
                    setOutput(res);
                    setOutputStatus(3);
                    if (res.data.templateID && res.data.filledFormNumberID)
                        redirect(res.data.templateID, res.data.filledFormNumberID);

                }
            });
      console.log(output)

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