import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="!py-0 !overflow-y-auto flex items-center justify-center">
            <div className="w-full">
                {children}
            </div>
        </main>
    );
}