import React from "react";
import {Button} from "@mui/material"
import {useTranslation} from 'react-i18next';
import {ENGLISH, MALAYSIAN} from "@/constants/localeConstants";

const LanguageSwitcherI18n = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === ENGLISH ? MALAYSIAN : ENGLISH;
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            variant="outlined"
            onClick={toggleLanguage}
            sx={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                minWidth: "auto",
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                '&:hover': {
                    backgroundColor: "lightgray", // Optional: Add hover effect
                    borderColor: "lightgray",     // Change border color on hover
                }
            }}>
                {i18n.language === ENGLISH ? MALAYSIAN.toUpperCase() : ENGLISH.toUpperCase()}
        </Button>
    );
};

export default LanguageSwitcherI18n;