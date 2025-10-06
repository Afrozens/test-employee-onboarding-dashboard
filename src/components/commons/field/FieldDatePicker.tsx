'use client';

import { useCallback } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { RangePickerProps } from 'antd/es/date-picker';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import FieldError from './FieldError';
import { reformedQueryDate } from '@/utils/datetime';

interface Props<T extends FieldValues> {
  label: string;
  id: string;
  disabled?: boolean;
  field?: ControllerRenderProps<T, T[keyof T] & string>;
  classAditional?: string;
  isRequired?: boolean;
  disabledDate?: RangePickerProps['disabledDate'];
  value?: Date;
  error?: string;
}

const FieldDatePicker = <T extends FieldValues>({
  classAditional,
  error,
  value,
  disabled = false,
  disabledDate: disabledDateOutside,
  field,
}: Props<T>) => {
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

  const getPickerValue = useCallback(() => {
    if (field?.value) {
      return formatDate(field.value);
    }
    if (value) {
      return formatDate(value.toString());
    }
    return null;
  }, [field?.value, value]);

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