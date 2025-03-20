import React from 'react';
import Link from 'next/link';
import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Breadcrumb {
    label: string;
    color: 'inherit' | 'text.primary' | 'text.secondary' | string;
    to: string;
}

interface BreadcrumbsNavProps {
    breadcrumbs: Breadcrumb[];
}

const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = ({ breadcrumbs }) => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }} separator={<NavigateNextIcon fontSize="small" />}>
            {breadcrumbs.map((breadcrumb, index) => {
                if (index === breadcrumbs.length - 1) {
                    return (
                        <Typography key={index} color={breadcrumb.color}>
                            {breadcrumb.label}
                        </Typography>
                    );
                }

                return (
                    <Link key={index} href={breadcrumb.to} passHref>
                        <Typography color={breadcrumb.color} sx={{ textDecoration: 'none' }}>
                            {breadcrumb.label}
                        </Typography>
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default BreadcrumbsNav;
