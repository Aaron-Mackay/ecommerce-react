import './Filters.css';
import {Range, getTrackBackground} from 'react-range'

const PriceRangeFilter = ({priceRangeValues, unfilteredPriceLimits, setPriceRangeValues}) =>
{
    
    const MIN = unfilteredPriceLimits[0];
    const MAX = unfilteredPriceLimits[1];
    const STEP = 0.1;
    
    return (
            <>
                <h5>Select price:</h5>
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
                                            height: '15px',
                                            width: '15px',
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
            </>
    
    );
}

export default PriceRangeFilter;
