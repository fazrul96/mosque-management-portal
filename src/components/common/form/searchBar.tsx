import React from "react";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    t: (key: string) => string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, t }) => {
    return (
        <TextField
            label={t("search.label")}
            value={searchQuery}
            onChange={onSearchChange}
            variant="outlined"
            size="small"
            fullWidth
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default SearchBar;
