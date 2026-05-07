export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-screen fixed inset-0 overflow-auto">
            {children}
        </div>
    );
}