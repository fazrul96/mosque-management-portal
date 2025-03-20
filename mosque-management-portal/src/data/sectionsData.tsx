// 'use client';
//
// import { useRouter } from 'next/navigation';
// import { TFunction } from 'i18next';
// import { IMAGE_PATHS } from "@/constants/imageConstants";
// // import { cacheImage, loadImageFromCache } from '@/utils/imageCache';
//
// interface Section {
//     image: string;
//     titleKey: string;
//     descriptionKey: string;
//     buttonKey: string;
//     onClick: () => void;
//     type: 'card' | 'paper';
// }
//
// interface SectionData {
//     image: string;
//     title: string;
//     description: string;
//     buttonText: string;
//     onClick: () => void;
//     type: 'card' | 'paper';
// }
//
// // Change the function to accept `t` and `navigate` as parameters and return the mapped section data
// export const sectionsData = (t: TFunction): SectionData[] => {
//     const router = useRouter();  // Using useRouter from next/navigation for server-side navigation
//
//     const sectionConfig: Section[] = [
//         {
//             image: IMAGE_PATHS.donation,
//             titleKey: 'sections.donations.title',
//             descriptionKey: 'sections.donations.description',
//             buttonKey: 'sections.donations.button',
//             onClick: () => router.push('/donation'),
//             type: 'card',
//         },
//         {
//             image: IMAGE_PATHS.inventory,
//             titleKey: 'sections.logistics.title',
//             descriptionKey: 'sections.logistics.description',
//             buttonKey: 'sections.logistics.button',
//             onClick: () => router.push('/logistic'),
//             type: 'card',
//         },
//         {
//             image: IMAGE_PATHS.prayer,
//             titleKey: 'sections.prayerTimes.title',
//             descriptionKey: 'sections.prayerTimes.description',
//             buttonKey: 'sections.prayerTimes.button',
//             onClick: () => router.push('/prayer-times'),
//             type: 'card',
//         },
//         {
//             image: IMAGE_PATHS.prayer,
//             titleKey: 'sections.sponsors.title',
//             descriptionKey: 'sections.sponsors.description',
//             buttonKey: 'sections.sponsors.button',
//             onClick: () => alert(t('sections.sponsors.comingSoon')),
//             type: 'paper',
//         },
//         {
//             image: IMAGE_PATHS.prayer,
//             titleKey: 'sections.events.title',
//             descriptionKey: 'sections.events.description',
//             buttonKey: 'sections.events.button',
//             onClick: () => alert(t('sections.events.comingSoon')),
//             type: 'paper',
//         },
//         {
//             image: IMAGE_PATHS.prayer,
//             titleKey: 'sections.announcements.title',
//             descriptionKey: 'sections.announcements.description',
//             buttonKey: 'sections.announcements.button',
//             onClick: () => alert(t('sections.announcements.comingSoon')),
//             type: 'paper',
//         }
//     ];
//
//     return sectionConfig.map((section) => {
//         // const cachedImage = loadImageFromCache(section.image);
//         // const imageToUse = cachedImage || section.image;
//         const imageToUse = section.image;
//
//         // If the image is not cached, load and cache it
//         // if (!cachedImage) {
//         //     const image = new Image();
//         //     image.src = section.image;
//         //     image.onload = () => {
//         //         cacheImage(section.image, image.src);
//         //     };
//         // }
//
//         // Return the section data with translated titles, descriptions, and button texts
//         return {
//             image: imageToUse,
//             title: t(section.titleKey),
//             description: t(section.descriptionKey),
//             buttonText: t(section.buttonKey),
//             onClick: section.onClick,
//             type: section.type
//         };
//     });
// };
