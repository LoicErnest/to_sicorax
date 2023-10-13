import { TextField, Box } from "@mui/material";
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import View from "./View";
import '../styles/button.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


function SearchBar() {
    const today = dayjs();
    const [selectedDateStart, setSelectedDateStart] = React.useState(today);
    const [selectedDateEnd, setSelectedDateEnd] = React.useState(today);
    const [isVisible, setIsVisible] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsVisible(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{display:'flex', mr:3, mt:2, alignItems:'center'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ml:2}}
                        id='start'
                        label='date start'
                        renderInput={(params) => <TextField {...params} />}
                        value={selectedDateStart}
                        onChange={(newValue) => {
                            setSelectedDateStart(newValue);
                        }}
                        format="DD-MM-YYYY"
                        disableFuture
                    />
                    <DatePicker
                        sx={{ml:2}}
                        id='end'
                        label='date end'
                        renderInput={(params) => <TextField {...params} />}
                        value={selectedDateEnd}
                        onChange={(newValue) => {
                            setSelectedDateEnd(newValue);
                        }}
                        format="DD-MM-YYYY"
                        disableFuture
                    />
                </LocalizationProvider>
                <button 
                    className='mui-button'>
                    SUBMIT <KeyboardArrowRightIcon className='icon-wrapper'/>
                </button>
                </Box>
            </form>
            {isVisible && <View
                start={selectedDateStart.format('YYYY-MM-DD')}
                end={selectedDateEnd.format('YYYY-MM-DD')}
            />}
        </>
    );
}

export default SearchBar;
