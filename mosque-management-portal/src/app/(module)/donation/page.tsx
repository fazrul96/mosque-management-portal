'use client';

import React from 'react';
import {Box, Grid2} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {sectionsData} from '@/data/sectionsData';
import HeaderImage from "@/components/common/HeaderImage";
import {IMAGE_PATHS} from "@/constants/imageConstants";
import SectionGridItem from "@/components/common/grid/SectionGridItem";
import Footer from "@/components/common/Footer";

const DonationManagementPage: React.FC = () => {
    const { t } = useTranslation();
    const sections = sectionsData(t);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <HeaderImage
                imageUrl={IMAGE_PATHS.mosque}
                title={t('homepage.title')}
                subtitle={t('homepage.subtitle')}
            />

            <GeneralModal
                open={openModal}
                onClose={handleCloseModal}
                selectedItem={selectedUser}
                onInputChange={handleInputChange}
                onSave={handleSaveUser}
                fieldConfig={fields}
                errors={errors}
                t={t}
                module={moduleType}
                mode="edit"
            />

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />

            <FloatingActionButton
                onClick={() => handleOpenModal(null)}
                label={t(`header.${moduleType}`)}
            />
        </Box>
    );
};

export default DonationManagementPage;
