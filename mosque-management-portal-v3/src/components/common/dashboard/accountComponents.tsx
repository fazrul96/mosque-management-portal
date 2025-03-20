import React from 'react';
import {Avatar, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Stack, Typography} from '@mui/material';
import {Account, AccountPopoverFooter, AccountPreview, AccountPreviewProps, SignOutButton} from '@toolpad/core/Account';
import {SidebarFooterProps} from "@toolpad/core";

type AccountPreviewPropsWithMini = AccountPreviewProps & { mini: boolean };

const AccountSidebarPreview = (props: AccountPreviewPropsWithMini) => {
    const { handleClick, open, mini } = props;
    return (
        <Stack direction="column" p={0} overflow="hidden">
            <Divider />
            <AccountPreview
                variant={mini ? 'condensed' : 'expanded'}
                handleClick={handleClick}
                open={open}
            />
        </Stack>
    );
}

const accounts = [
    {
        id: 1,
        name: 'Bharat Kashyap',
        email: 'bharatkashyap@outlook.com',
        image: 'https://avatars.githubusercontent.com/u/19550456',
        projects: [{ id: 3, title: 'Project X' }], color: "#FFFF00"

    },
];

const createPreviewComponent = (mini: boolean) => {
    return function PreviewComponent(props: AccountPreviewProps) {
        return <AccountSidebarPreview {...props} mini={mini} />;
    };
};

const SidebarFooterAccount = ({ mini }: SidebarFooterProps) => {
    const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);

    return (
        <Account
            slots={{
                preview: PreviewComponent,
                // popoverContent: SidebarFooterAccountPopover,
            }}
            slotProps={{
                popover: {
                    transformOrigin: { horizontal: 'left', vertical: 'bottom' },
                    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                    disableAutoFocus: true,
                    slotProps: {
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: (theme) =>
                                    `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                                mt: 1,
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: 10,
                                    left: 0,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translate(-50%, -50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    },
                },
            }}
        />
    );
};

const SidebarFooterAccountPopover = () => (
    <Stack direction="column">
        <Typography variant="body2" mx={2} mt={1}>
            Accounts
        </Typography>
        <MenuList>
            {accounts.map((account) => (
                <MenuItem key={account.id} component="button" sx={{ justifyContent: 'flex-start', width: '100%', columnGap: 2 }}>
                    <ListItemIcon>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                fontSize: '0.95rem',
                                bgcolor: account.color,
                            }}
                            src={account.image ?? ''}
                            alt={account.name ?? ''}
                        >
                            {account.name[0]}
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            width: '100%',
                        }}
                        primary={account.name}
                        secondary={account.email}
                        slotProps={{
                            primary: { variant: 'body2' },
                            secondary: { variant: 'caption' }
                        }} />
                </MenuItem>
            ))}
        </MenuList>
        <Divider />
        <AccountPopoverFooter>
            <SignOutButton />
        </AccountPopoverFooter>
    </Stack>
);

export { SidebarFooterAccount, SidebarFooterAccountPopover };
