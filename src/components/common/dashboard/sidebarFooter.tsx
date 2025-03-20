import {Link, Stack, Typography} from '@mui/material';

const SidebarFooter = ({ mini }: { mini: boolean }) => {
    return (
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{ m: 1 }}>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'center' }}>
                {mini ? '© MUI' : `© ${new Date().getFullYear()} Fazrul Romli - MMS`}
            </Typography>

            <Typography variant="caption" sx={{ textAlign: 'center' }}>
                {mini ? '' : (
                    <>
                        <Link href="https://www.your-portfolio-website.com" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                            Portfolio
                        </Link>
                        |
                        <Link href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                            LinkedIn
                        </Link>
                    </>
                )}
            </Typography>
        </Stack>
    );
};

export default SidebarFooter;
