export function ResponsiveLayoutRenderer({
	width,
	mobileLayout,
	desktopLayout,
}: {
	width: number;
	mobileLayout: React.ReactNode;
	desktopLayout: React.ReactNode;
}) {
	return width < 768 ? mobileLayout : desktopLayout;
}
