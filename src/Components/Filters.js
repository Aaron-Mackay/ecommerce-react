import './Filters.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

const Filters = ({availableSizes, filtersObject}) =>
{
    const {
        enteredMax, setEnteredMax,
        enteredMin, setEnteredMin,
        enteredSizes, setEnteredSizes
    } = filtersObject
    
    const maxChangeHandler = (event) =>
    {
        setEnteredMax(event.target.value)
    }
    const minChangeHandler = (event) =>
    {
        setEnteredMin(event.target.value)
    }
    
    const sizesChangeHandler = async(val) =>
    {
        setEnteredSizes(val)
    };
    
    return ( // todo validate input is non-negative, max higher than min
            <div className='filters__controls'>
                <div className='filters__control'>
                    <label>Max Price</label>
                    <input type='number' value={enteredMax} onChange={maxChangeHandler}/>
                </div>
                <div className='filters__control'>
                    <label>Min Price</label>
                    <input type='number' value={enteredMin} onChange={minChangeHandler}/>
                </div>
                <ToggleButtonGroup type="checkbox" value={enteredSizes} onChange={sizesChangeHandler}>
                    {availableSizes.map((size, i) =>
                    {
                        return <ToggleButton key={i} id={`tbg-btn-${i}`} value={size} checked={true}>
                            {size}
                        </ToggleButton>
                    })}
                </ToggleButtonGroup>
            </div>
    );
}

export default Filters;
