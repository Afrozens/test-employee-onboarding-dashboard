'use client';

import { DatePicker } from 'antd';
import { ControllerRenderProps } from 'react-hook-form';
import dayjs from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';

import FieldError from './FieldError';
import { reformedQueryDate } from '@/utils/datetime';

interface Props {
  label: string;
  id: string;
  disabled?: boolean;
  field?: ControllerRenderProps<any, string>;
  classAditional?: string;
  isRequired?: boolean;
  disabledDate?: any;
  value?: string;
  error?: string;
}

const FieldDatePicker = ({
  classAditional,
  error,
  value,
  disabled = false,
  disabledDate: disabledDateOutside,
  field,
}: Props) => {
  const formatDate = (date: string) => {
    const parsed = dayjs(reformedQueryDate(date), 'YYYY-MM-DD');
    return parsed;
  };

  const handleSingleChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const dateObject = date.toDate();
      field?.onChange(dateObject);
    } else {
      field?.onChange(null);
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  const getPickerValue = () => {
    if (value) {
      if (typeof value === 'string') {
        return formatDate(value);
      }
    }
    return undefined;
  };

  return (
    <div
      className={`${
        classAditional || ''
      } flex w-full flex-col items-center justify-center`}
    >
      <DatePicker
        needConfirm={false}
        disabledDate={disabledDateOutside ?? disabledDate}
        allowClear={false}
        disabled={disabled}
        inputReadOnly
        value={getPickerValue() as dayjs.Dayjs | undefined}
        showTime={false}
        onChange={handleSingleChange}
      />
      <FieldError error={error} />
    </div>
  );
};

export default FieldDatePicker;