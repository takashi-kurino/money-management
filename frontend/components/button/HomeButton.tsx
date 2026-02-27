// File: frontend/components/button/HomeButton.tsx

'use client';
import {Button} from '../ui/button';
import React from 'react';
import Link from 'next/link';

export default function HomeButton() {
    return(
        <Button onClick={() => {}} type="button">
            <Link
                href={{
                pathname: '/',
                }}
            >
             Home
            </Link>
        </Button>
    );
}