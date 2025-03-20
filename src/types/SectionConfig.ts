export interface SectionConfig {
    image?: string;
    titleKey: string;
    descriptionKey: string;
    buttonKey: string;
    onClick: () => void;
    type: 'card' | 'paper';
}