import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface CustomDatePickerProp {
    onChange: (date: any) => void
}

export default function CustomDatePicker({ onChange }: CustomDatePickerProp) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className='w-full focus:ring-2 focus:ring-inset focus:ring-indigo-600' onChange={onChange} />
        </LocalizationProvider>
    );
}