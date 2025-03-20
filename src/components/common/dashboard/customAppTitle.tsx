import {Chip, Stack, Tooltip, Typography} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CustomAppTitle = () => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">MMS</Typography>
            <Chip size="small" label="BETA" color="info" />
            <Tooltip title='Connected to production'>
                <CheckCircleIcon color="success" fontSize="small" />
            </Tooltip>
        </Stack>
    );
};

export default CustomAppTitle;
