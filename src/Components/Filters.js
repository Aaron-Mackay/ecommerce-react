import './Filters.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {Range, getTrackBackground} from 'react-range'

const Filters = ({availableSizes, filtersObject, unfilteredPriceLimits}) =>
{
    const {
        priceRangeValues, setPriceRangeValues,
        enteredSizes, setEnteredSizes,
        enteredSort, setEnteredSort,
        enteredSaleSwitch, setEnteredSaleSwitch,
    } = filtersObject
    
    let MIN = unfilteredPriceLimits[0];
    const MAX = unfilteredPriceLimits[1];
    const STEP = 0.1;
    
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
                <Range
                        values={priceRangeValues}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={newValues => setPriceRangeValues(newValues)}
                        renderTrack={({props, children}) => (
                                <div
                                        onMouseDown={props.onMouseDown}
                                        onTouchStart={props.onTouchStart}
                                        style={{
                                            ...props.style,
                                            height: '36px',
                                            display: 'flex',
                                            width: '100%'
                                        }}
                                >
                                    <div
                                            ref={props.ref}
                                            style={{
                                                height: '5px',
                                                width: '100%',
                                                borderRadius: '4px',
                                                background: getTrackBackground({
                                                    values: priceRangeValues,
                                                    colors: ['#ccc', '#548BF4', '#ccc'],
                                                    min: MIN,
                                                    max: MAX
                                                }),
                                                alignSelf: 'center'
                                            }}
                                    >
                                        {children}
                                    </div>
                                </div>
                        )}
                        renderThumb={({index, props, isDragged}) => (
                                <div //position markers
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '42px',
                                            width: '42px',
                                            borderRadius: '4px',
                                            backgroundColor: '#FFF',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0px 2px 6px #AAA'
                                        }}
                                >
                                    <div //labels
                                            style={{
                                                position: 'absolute',
                                                top: '-28px',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                                padding: '4px',
                                                borderRadius: '4px',
                                                backgroundColor: '#548BF4'
                                            }}
                                    >
                                        £{priceRangeValues[index].toFixed(2)}
                                    </div>
                                    <div
                                            style={{
                                                height: '16px',
                                                width: '5px',
                                                backgroundColor: isDragged ? '#548BF4' : '#CCC'
                                            }}
                                    />
                                </div>
                        )}
                />
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
                        'Sale', 'Price: High to Low', 'Price: Low to High'
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
