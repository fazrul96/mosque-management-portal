import React from 'react';
import {Box, Grid2, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {sectionsData} from '../data/mosqueData';
import SectionCard from './../components/common/card/card.tsx';
import SectionPaper from './../components/common/paper/paper.tsx';
import {MANAGEMENT_PATH_IMAGES} from "../constants/ImageConstants.ts";
import {DEFAULT_IMAGE, EMPTY_STRING} from "../constants/AppConstants.ts";
import {SectionData} from "../types/SectionData.ts";

interface HeaderImageProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({imageUrl, title, subtitle}) => {
    return (
        <Box
            sx = {{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: {xs: 300, sm: 400, md: 500},
                borderRadius: '8px',
                marginBottom: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <Box
                sx = {{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
                    borderRadius: '8px',
                }}
            />
            <Typography variant = "h3" fontWeight = "bold" zIndex = {1}
                        sx = {{textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)'}} >
                {title}
            </Typography >
            <Typography variant = "h6" zIndex = {1}
                        sx = {{marginTop: 10, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'}} >
                {subtitle}
            </Typography >
        </Box >
    );
};

const Footer: React.FC = () => {
    return (
        <Box sx = {{textAlign: 'center', marginTop: 5, paddingBottom: 2}} >
            <Typography variant = "body2" color = "textSecondary" >
                &copy; {new Date().getFullYear()} Mosque Management. All Rights Reserved.
            </Typography >
        </Box >
    );
};

interface SectionGridItemProps {
    section?: SectionData;
}

const SectionGridItem: React.FC<SectionGridItemProps> = ({ section }) => {
    const commonStyles = {
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: 6,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        transition: 'box-shadow 0.3s ease-in-out',
    };

    if (!section) {
        return null;
    }

    return (
        <Grid2 size = {{xs: 12, sm: 6, md: 4}} key = {section?.title} >
            {section?.type === 'card' ? (
                <SectionCard
                    image = {section.image || DEFAULT_IMAGE}
                    title = {section.title || EMPTY_STRING}
                    description = {section.description}
                    buttonText = {section.buttonText}
                    onClick = {section.onClick}
                    sx = {commonStyles}
                />
            ) : (
                <SectionPaper
                    title={section?.title || EMPTY_STRING}
                    description = {section.description}
                    buttonText = {section.buttonText}
                    onClick = {section.onClick}
                    sx = {commonStyles}
                />
            )}
        </Grid2 >
    );
};

const MosquePage: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const sections = sectionsData(t, navigate);

    return (
        <Box sx = {{flexGrow: 1, padding: 2}} >
            <HeaderImage
                imageUrl = {MANAGEMENT_PATH_IMAGES.mosque}
                title = {t('homepage.title')}
                subtitle = {t('homepage.subtitle')}
            />

            <Grid2 container spacing = {3} justifyContent = "center" >
                {sections.map((section) => (
                    <SectionGridItem key = {section.title} section = {section} />
                ))}
            </Grid2 >

            <Footer />
        </Box >
    );
};

export default MosquePage;
