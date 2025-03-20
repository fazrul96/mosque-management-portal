import {Button, CircularProgress} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface DownloadButtonProps<T> {
    isLoading: boolean;
    data: T[];
    t: (key: string) => string;
    handleGeneratePDF?: (data: T[]) => void;
}

const DownloadButton = <T extends object>({
                                              isLoading,
                                              data,
                                              t,
                                              handleGeneratePDF
                                          }: DownloadButtonProps<T>) => (
    <Button
        variant="contained"
        color="primary"
        onClick={() => handleGeneratePDF?.(data)}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
    >
        {isLoading ? t('loading.generatingReport') : t('buttons.download')}
    </Button>
);

export default DownloadButton;
