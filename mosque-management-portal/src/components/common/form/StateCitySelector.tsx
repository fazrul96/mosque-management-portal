import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

// Define the types for props
interface StateCitySelectorProps {
    states: Record<string, string[]>; // Object with state names as keys and arrays of city names
    selectedState: string;
    setSelectedState: React.Dispatch<React.SetStateAction<string>>; // Function to set the selected state
    selectedCity: string;
    setSelectedCity: React.Dispatch<React.SetStateAction<string>>; // Function to set the selected city
    t: (key: string) => string; // Translation function, assuming 't' is a function that takes a string and returns a translated string
}

const StateCitySelector: React.FC<StateCitySelectorProps> = ({ states, selectedState, setSelectedState, selectedCity, setSelectedCity, t }) => {
    return (
        <>
            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: 'primary.main' }}>
                    {t('sections.prayerTimes.selectState')}
                </InputLabel>
                <Select
                    value={selectedState}
                    onChange={(e) => {
                        const newState = e.target.value;
                        setSelectedState(newState);
                        // Set the first city of the selected state as the default selected city
                        setSelectedCity(states[newState][0]);
                    }}
                    label={t('sections.prayerTimes.state')}
                    sx={{
                        borderRadius: 3,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    }}
                >
                    {Object.keys(states).map((stateOption, index) => (
                        <MenuItem key={index} value={stateOption}>
                            {stateOption}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: 'primary.main' }}>
                    {t('sections.prayerTimes.selectCity')}
                </InputLabel>
                <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    label={t('sections.prayerTimes.city')}
                    sx={{
                        borderRadius: 3,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    }}
                >
                    {states[selectedState].map((cityOption, index) => (
                        <MenuItem key={index} value={cityOption}>
                            {cityOption}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default StateCitySelector;
