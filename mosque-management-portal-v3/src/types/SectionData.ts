export interface SectionData {
    title?: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    image?: string;
    type?: 'card' | 'paper';
}