import { StyleConverter } from '@labs/utils/style-creator';

import { createContext, useContext, useState } from 'react';

export const StyleContext = createContext<any>(null);

export const StyleProvider = ({ children }: { children: React.ReactNode }) => {
	const [styleConverter] = useState(new StyleConverter());

	return (
		<StyleContext.Provider value={{ styleConverter }}>
			{children}
		</StyleContext.Provider>
	);
};

export const useStyleContext = () => useContext(StyleContext);
