import React from "react";
import DatePicker  from 'react-date-picker'
import Aux from '../hoc/Auxillary';
import dateIcon from './date_white.svg'

const InputDate = (props) => {

    return (
        <Aux>
            <div className="input">
                <label className="input-label" for={props.for}>
                        {props.label ||props.for}
                        <span aria-hidden="true">{' * '}</span>
                        <span aria-live="polite"  className="input-error">{props.errors[props.for]}</span>
                </label>
                <DatePicker
                    className="input-field date"
                    onChange={props.change}
                    value={props.input[props.for] || null}
                    calendarIcon={<img src={dateIcon} className="date-icon"/>}
                    maxDate={new Date()}
                />
            </div>
            <style jsx>{`
                .react-date-picker__wrapper {
                    border: none;
                    height: 100%;
                }
                .react-date-picker__inputGroup {
                    padding: 0 1rem;
                }
                .date {
                    display: flex;
                    flex-direction: row;
                    border: transparent;
                    padding: 0;
                }
                .react-date-picker__calendar-button {
                    height:100%;
                    position: relative;
                }
                .react-date-picker__button {
                    padding: 0;
                }
                .date-icon {
                    background-color: #0a5688;
                    height: 100%;
                }
            `}</style>
        </Aux>
    )
}

export default InputDate