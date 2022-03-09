import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PriceRangeFilter from "./PriceRangeFilter";

const Filters = ({availableSizes, filtersObject, unfilteredPriceLimits}) =>
{
    const {
        priceRangeValues, setPriceRangeValues,
        enteredSizes, setEnteredSizes,
        enteredSort, setEnteredSort,
        enteredSaleSwitch, setEnteredSaleSwitch,
    } = filtersObject
    
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
    
    return (
            <div className={"filters"}>
                <PriceRangeFilter priceRangeValues={priceRangeValues}
                                  unfilteredPriceLimits={unfilteredPriceLimits}
                                  setPriceRangeValues={setPriceRangeValues}/>
                <div style={{textAlign: "center"}}>
                    <h5>Select size:</h5>
                    <ToggleButtonGroup type="checkbox" value={enteredSizes} onChange={sizesChangeHandler}>
                        {availableSizes.map((size, i) =>
                        {
                            return <ToggleButton key={i} id={`tbg-btn-${i}`} value={size} checked={true}>
                                {size}
                            </ToggleButton>
                        })}
                    </ToggleButtonGroup>
                </div>
                
                
                <ToggleButtonGroup type="checkbox" onChange={saleChangeHandler} value={enteredSaleSwitch}>
                    <ToggleButton id={1} value={true}>
                        Sale Products Only
                    </ToggleButton>
                </ToggleButtonGroup>
                <DropdownButton id="dropdown-basic-button" title={"Sort by: " + enteredSort} onSelect={sortChangeHandler}>
                    {[
                        'Sale', 'Price: High to Low', 'Price: Low to High'
                    ].map((sortString, i) =>
                    {
                        return <Dropdown.Item key={i} eventKey={sortString}>{sortString}</Dropdown.Item>
                    })}
                </DropdownButton>
            </div>
    );
}

export default Filters;
