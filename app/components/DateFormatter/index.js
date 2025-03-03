import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateFormatter = ({ dateTime }) => {
  const [formatDate, setFormatDate] = useState('');
  const formattedInputDate = moment(dateTime);
  const today = moment();

  useEffect(() => {
    if (today.isSame(formattedInputDate, 'day')) {
      const formattedTime = formattedInputDate.format('hh:mm A');
      setFormatDate(`Today, ${formattedTime}`);
    } else {
      const formattedDate = formattedInputDate.format('DD MMM');
      const formattedTime = formattedInputDate.format('hh:mm A');
      setFormatDate(`${formattedDate}, ${formattedTime}`);
    }
  }, [formattedInputDate, today]);

  return (
    <>
      <span className="text-sm text-black whitespace-nowrap">
        {formatDate}{' '}
      </span>
    </>
  );
};
DateFormatter.propTypes = {
  dateTime: PropTypes.string,
};
export default DateFormatter;
