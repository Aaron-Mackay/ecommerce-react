import './Filters.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Filters = ({availableSizes, filtersObject}) =>
{
    const {
        enteredMax, setEnteredMax,
        enteredMin, setEnteredMin,
        enteredSizes, setEnteredSizes,
        enteredSort, setEnteredSort,
        enteredSaleSwitch, setEnteredSaleSwitch
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
        console.log(val)
        setEnteredSizes(val)
    };
    
    const sortChangeHandler = async(val) =>
    {
        setEnteredSort(val)
    };
    
    const saleChangeHandler = async(val) =>
    {
        console.log(val)
        setEnteredSaleSwitch(val)
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
                <DropdownButton id="dropdown-basic-button" title={"Sort by: " + enteredSort} onSelect={sortChangeHandler}>
                    {[
                        'Sale','Price: High to Low', 'Price: Low to High'
                    ].map((sortString, i) =>
                    {
                        return <Dropdown.Item key={i} eventKey={sortString}>{sortString}</Dropdown.Item>
                    })}
                </DropdownButton>
                <ToggleButtonGroup type="checkbox" onChange={saleChangeHandler} value={enteredSaleSwitch}>
                        <ToggleButton id={1} value={true}>
                            Sale Products Only
                        </ToggleButton>
                </ToggleButtonGroup>
            </div>
    );
}

export default Filters;
