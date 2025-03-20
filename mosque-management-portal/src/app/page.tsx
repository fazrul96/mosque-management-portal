'use client';

import React from 'react';
import {Box, Grid2} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {sectionsData} from '@/data/sectionsData';
import HeaderImage from "@/components/common/HeaderImage";
import {IMAGE_PATHS} from "@/constants/imageConstants";
import SectionGridItem from "@/components/common/grid/SectionGridItem";
import Footer from "@/components/common/Footer";

const MosquePage: React.FC = () => {
    // const handleClick = () => {
    //     console.log("Download clicked!");
    // };
    const { t } = useTranslation();
    const sections = sectionsData(t);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <HeaderImage
                imageUrl={IMAGE_PATHS.mosque}
                title={t('homepage.title')}
                subtitle={t('homepage.subtitle')}
            />


            {/*<DownloadButton*/}
            {/*    onClick={handleClick}*/}
            {/*    label="Download File"*/}
            {/*    disabled={false}*/}
            {/*/>*/}

            {/*<Button>*/}
            {/*    <Tooltip arrow>*/}
            {/*        <DownloadIcon />*/}
            {/*    </Tooltip>*/}
            {/*</Button>*/}


            <Grid2 container spacing={3} justifyContent="center">
                {sections.map((section) => (
                    <SectionGridItem key={section.title} section={section} />
                ))}
            </Grid2>

            <Footer />
        </Box>
    );
};

export default MosquePage;
