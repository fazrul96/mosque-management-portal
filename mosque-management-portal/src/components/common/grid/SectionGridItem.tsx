import React from 'react';
import { Grid2 } from '@mui/material';
import SectionCard from "@/components/common/card/SectionCard";
import SectionPaper from "@/components/common/paper/SectionPaper";

interface Section {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    type: 'card' | 'paper';
}

interface SectionGridItemProps {
    section: Section;
}

const SectionGridItem: React.FC<SectionGridItemProps> = ({ section }) => {
    // Define common styles for both SectionCard and SectionPaper
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

    return (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={section.title}>
            {section.type === 'card' ? (
                <SectionCard
                    image={section.image}
                    title={section.title}
                    description={section.description}
                    buttonText={section.buttonText}
                    onClick={section.onClick}
                    sx={commonStyles}
                />
            ) : (
                <SectionPaper
                    title={section.title}
                    description={section.description}
                    buttonText={section.buttonText}
                    onClick={section.onClick}
                    sx={commonStyles}
                />
            )}
        </Grid2>
    );
};

export default SectionGridItem;
