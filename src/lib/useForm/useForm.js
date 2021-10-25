import { useEffect } from "react";
import { useState } from "react";

const useForm = (callback, validateInput) => {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(Object.keys(errors).every(err => err === null ||"") && Object.keys(input).length !== 0) {
            callback()
        }
    },[errors])

    const handleAutoPopulate = (file) => {
        try{
            const fileReader = new FileReader()
            fileReader.onload = function () {
                const lines = fileReader.result.split('\n').map((line) => {
                    return line.split(',')
                })
                lines[0].forEach((header,index) => {
                    handleChange({target: {value: lines[1][index], name:header.trim()}})
                })
            }
            fileReader.readAsText(file[0])
        } catch(e) {
            console.log(e)
        }
    }

    const handleSubmit = (event) => {
        console.log(input)
        if(event) event.preventDefault();
        setErrors(validateInput(input));
    }

    const handleChange = (event) => {
        setInput((input) => ({
            ...input,
            [event?.target?.name]: event?.target?.value
        }))
        setErrors((errors) => {
            delete errors[event?.target?.name]
            return errors
        })
    }

    const handleDateChange = (value) => {
        setInput((input) => ({
            ...input,
            date: value
        }))
        setErrors((errors) => {
            delete errors.date
            return errors
        })
    }

    return {
        handleChange,
        handleDateChange,
        handleSubmit,
        input,
        errors,
        setInput,
        handleAutoPopulate,
        setErrors,
    }
   
}

export default useForm