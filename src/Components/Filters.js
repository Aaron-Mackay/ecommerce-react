import './Filters.css';
import {useState} from "react";

const Filters = ({possibleSizes, onSaveFilters}) =>
{
    const [enteredMax, setEnteredMax] = useState('')
    const [enteredMin, setEnteredMin] = useState('')
    const [enteredSizes, setEnteredSizes] = useState(possibleSizes)
    
    const maxChangeHandler = (event) =>
    {
        setEnteredMax(event.target.value)
    }
    const minChangeHandler = (event) =>
    {
        setEnteredMin(event.target.value)
    }
    const sizesChangeHandler = (event) =>
    {
        const input = event.target.name
        if(enteredSizes.includes(input))
        {
            setEnteredSizes(enteredSizes.filter(size => size !== input))
        } else
        {
            setEnteredSizes([...enteredSizes, input])
        }
    }
    
    const submitHandler = (event) =>
    {
        event.preventDefault() // prevents refreshing/request being sent
        
        const filtersDataObject = {
            max: enteredMax,
            min: enteredMin,
            sizes: enteredSizes
        }
        console.log(filtersDataObject)
        onSaveFilters(filtersDataObject);
    }
    
    const getCheckboxStatus = ( size ) => {
        return enteredSizes.includes( size )
    }
    
    return ( // todo validate input is non-negative, max higher than min
            <form onSubmit={submitHandler}>
                <div className='filters__controls'>
                    <div className='filters__control'>
                        <label>Max Price</label>
                        <input type='number' value={enteredMax} onChange={maxChangeHandler}/>
                    </div>
                    <div className='filters__control'>
                        <label>Min Price</label>
                        <input type='number' value={enteredMin} onChange={minChangeHandler}/>
                    </div>
                    <div className='filters__control'>
                        {possibleSizes.map((size, i) =>
                        {
                            return <div key={i}>
                                <label htmlFor={size}>{size}</label>
                                <input type={"checkbox"} id={size} name={size} onChange={sizesChangeHandler} checked={getCheckboxStatus(size)}/>
                            </div>
                        })}
                    </div>
                
                </div>
                <div className='filters__actions'>
                    <button type='submit'>Filter</button>
                </div>
            </form>
    
    );
}

export default Filters;
