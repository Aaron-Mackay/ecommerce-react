import './Filters.css';
import { useState } from "react";

function Filters(props) {
    const [enteredMax, setEnteredMax] = useState('')
    const [enteredMin, setEnteredMin] = useState('')
    const [enteredSizes, setEnteredSizes] = useState([])

    const maxChangeHandler = (event) => {
        setEnteredMax(event.target.value)
    }
    const minChangeHandler = (event) => {
        setEnteredMin(event.target.value)
    }
    const sizesChangeHandler = (event) => {
        const input = event.target.value
        if (enteredSizes.includes(input)) {
            setEnteredSizes(enteredSizes.filter(size => size !== input))
        } else {
            setEnteredSizes([...enteredSizes, input])
        }
    }

    const submitHandler = (event) => {
        event.preventDefault() // prevents refreshing/request being sent


    }

    return (
        <form onSubmit={submitHandler}>
            <div className='filters'>

            </div>
        </form>

    );
}

export default Filters;
