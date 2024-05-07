type DataIconTypes =
	| 'arrow-thin-down'
	| 'arrow-thin-right'
	| 'close'
	| 'external-link'
	| 'help'
	| 'add'
	| 'bin'
	| 'more';

/**
 * This is a map of data icons that are used in the app.
 * its an intentional choice to use a map here so that we can use the type system
 */
export const DataIcons = new Map<DataIconTypes, string>();

DataIcons.set(
	'arrow-thin-down',
	`data:image/svg+xml,%3Csvg width='17' height='10' viewBox='0 0 17 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.48535 9.97056L10.6034 7.85256L16.9706 1.48528L15.3227 0.048101L8.48535 6.89728L1.53902 0.0481008L7.03335e-05 1.48528L6.36735 7.85256L8.48535 9.97056Z' fill='white'/%3E%3C/svg%3E%0A`
);

DataIcons.set(
	'arrow-thin-right',
	`data:image/svg+xml,%3Csvg width='17' height='10' viewBox='0 0 17 10' fill='none' transform='rotate(-90)'%0Axmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.48535 9.97056L10.6034 7.85256L16.9706 1.48528L15.3227 0.048101L8.48535 6.89728L1.53902 0.0481008L7.03335e-05 1.48528L6.36735 7.85256L8.48535 9.97056Z' fill='white'/%3E%3C/svg%3E%0A`
);

DataIcons.set(
	'close',
	`data:image/svg+xml,%0A%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z' fill='white'/%3E%3C/svg%3E%0A`
);

DataIcons.set(
	'help',
	`data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23999999' width='15' height='14' viewBox='16 140 15 14'%3E%3Cpath d='M24.628 146.904c-.552.36-.717.67-.736 1.385 0 .076-.065.14-.143.14h-1.465c-.04 0-.143-.106-.143-.145v-.583c0-.61.33-1.148 1.01-1.644.052-.038.56-.37.56-.83 0-.38-.286-.645-.696-.645-.584 0-.91.293-.94.852-.006.075-.068.134-.144.134h-1.538c-.04 0-.077-.016-.104-.044-.027-.028-.04-.067-.04-.106.08-1.55 1.09-2.44 2.77-2.44 1.272 0 2.644.69 2.644 2.207 0 1.017-.232 1.21-1.036 1.717zM23 140c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm1.17 11.286c0 .157-.13.285-.286.285h-1.74c-.16 0-.287-.126-.287-.283v-1.715c0-.156.128-.284.286-.284h1.74c.158 0 .287.128.287.285v1.716z'/%3E%3C/svg%3E`
);

DataIcons.set(
	'external-link',
	`data:image/svg+xml,%0A%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.2222 14.2222H1.77778V1.77778H8V0H1.77778C0.791111 0 0 0.8 0 1.77778V14.2222C0 15.2 0.791111 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V8H14.2222V14.2222ZM9.77778 0V1.77778H12.9689L4.23111 10.5156L5.48444 11.7689L14.2222 3.03111V6.22222H16V0H9.77778Z' fill='%23999999'/%3E%3C/svg%3E%0A`
);

DataIcons.set(
	'add',
	`data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_644_4987)'%3E%3Cpath d='M13.1242 6.51894H7.50234V0.875195C7.50234 0.612695 7.28359 0.37207 6.99922 0.37207C6.73672 0.37207 6.49609 0.59082 6.49609 0.875195V6.51894H0.874219C0.611719 6.51894 0.371094 6.73769 0.371094 7.02207C0.371094 7.28457 0.589844 7.5252 0.874219 7.5252H6.51797V13.1252C6.51797 13.3877 6.73672 13.6283 7.02109 13.6283C7.28359 13.6283 7.52422 13.4096 7.52422 13.1252V7.50332H13.1242C13.3867 7.50332 13.6273 7.28457 13.6273 7.0002C13.6273 6.7377 13.3867 6.51894 13.1242 6.51894Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_644_4987'%3E%3Crect width='14' height='14' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A`
);

DataIcons.set(
	'bin',
	`data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.525 3.495c.26 0 .475.216.475.49v.253c0 .267-.216.49-.475.49H2.475A.486.486 0 0 1 2 4.237v-.253c0-.274.216-.49.476-.49H4.42c.395 0 .738-.28.827-.676l.102-.455c.158-.62.679-1.03 1.275-1.03h2.752c.59 0 1.116.41 1.269.997l.109.487a.854.854 0 0 0 .827.677h1.944Zm-.987 9.261c.203-1.891.558-6.384.558-6.43a.497.497 0 0 0-.12-.372.484.484 0 0 0-.35-.156H3.38a.47.47 0 0 0-.349.156.527.527 0 0 0-.127.372l.035.431c.095 1.176.359 4.45.529 6 .12 1.14.87 1.858 1.954 1.884.837.02 1.7.026 2.581.026.83 0 1.674-.007 2.537-.026 1.123-.02 1.871-.724 1.998-1.885Z' fill='white' fill-opacity='0.37'%3E%3C/path%3E%3C/svg%3E`
);

DataIcons.set(
	'more',
	`data:image/svg+xml,%0A%3Csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.49609 8H8.50509' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12.5 8H12.509' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.5 8H4.50898' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A`
);

export const getDataIcons = (icon: DataIconTypes, color?: string) => {
	const dataIcon = DataIcons.get(icon);
	if (!dataIcon) {
		throw new Error(`DataIcon ${icon} does not exist`);
	}

	return dataIcon.replace(
		color! && /(%23999999|white)/gi,
		encodeURIComponent(color!) as string
	);
};
