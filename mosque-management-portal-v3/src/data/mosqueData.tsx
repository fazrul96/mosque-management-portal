import {MANAGEMENT_PATH_IMAGES} from "../constants/ImageConstants.ts";
import {TFunction} from 'i18next';
import {NavigateFunction} from 'react-router-dom';
import {ROUTE_DONATIONS, ROUTE_LOGISTIC, ROUTE_PRAYER_TIMES} from "../constants/AppRoutes.ts";
import {SectionData} from "../types/SectionData.ts";
import {SectionConfig} from "../types/SectionConfig.ts";

export const sectionsData = (t: TFunction, navigate: NavigateFunction): SectionData[] => {
    const sectionConfig: SectionConfig[] = [
        {
            image: MANAGEMENT_PATH_IMAGES.donation,
            titleKey: 'sections.donations.title',
            descriptionKey: 'sections.donations.description',
            buttonKey: 'sections.donations.button',
            onClick: () => navigate(ROUTE_DONATIONS),
            type: 'card',
        },
        {
            image: MANAGEMENT_PATH_IMAGES.inventory,
            titleKey: 'sections.logistics.title',
            descriptionKey: 'sections.logistics.description',
            buttonKey: 'sections.logistics.button',
            onClick: () => navigate(ROUTE_LOGISTIC),
            type: 'card',
        },
        {
            image: MANAGEMENT_PATH_IMAGES.prayer,
            titleKey: 'sections.prayers.title',
            descriptionKey: 'sections.prayers.description',
            buttonKey: 'sections.prayers.button',
            onClick: () => navigate(ROUTE_PRAYER_TIMES),
            type: 'card',
        },
        {
            titleKey: 'sections.sponsors.title',
            descriptionKey: 'sections.sponsors.description',
            buttonKey: 'sections.sponsors.button',
            onClick: () => alert(t('sections.sponsors.comingSoon')),
            type: 'paper',
        },
        {
            titleKey: 'sections.events.title',
            descriptionKey: 'sections.events.description',
            buttonKey: 'sections.events.button',
            onClick: () => alert(t('sections.events.comingSoon')),
            type: 'paper',
        },
        {
            titleKey: 'sections.announcements.title',
            descriptionKey: 'sections.announcements.description',
            buttonKey: 'sections.announcements.button',
            onClick: () => alert(t('sections.announcements.comingSoon')),
            type: 'paper',
        }
    ];

    return sectionConfig.map((section) => {
        const imageToUse = section.image;

        return {
            image: imageToUse,
            title: t(section.titleKey),
            description: t(section.descriptionKey),
            buttonText: t(section.buttonKey),
            onClick: section.onClick,
            type: section.type
        };
    });
};