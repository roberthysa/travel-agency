import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './OrderOption.scss';

const OrderOptionDate = ({setOptionValue}) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.component}>
      <DatePicker
        selected={startDate}
        minDate={startDate}
        dateFormat="dd/MM/yyyy"
        onChange={date =>  {
          setStartDate(date);
          setOptionValue(date);}
        }
      />
    </div>
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
