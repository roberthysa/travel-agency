import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      minDate={startDate}
      dateFormat="dd/MM/yyyy"
      onChange={date =>  {
        setStartDate(date);
        props.setOptionValue(date);
      }
      }
    />
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
