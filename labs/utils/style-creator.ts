const toKebabCase = (str: string): string =>
	str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @name StyleConverter
 * This class is a utility for converting styles to CSS variables and applying them to the DOM.
 * @returns A class with methods for converting styles to CSS variables and applying them to the DOM.
 *
 * @example
 * const styleConverter = new StyleConverter();
 * const className = styleConverter.applyStyle('color', 'red');
 * console.log(className); // 'bc-color-red'
 */

(global as any).__NEXT_SSR_CSS_RULES__ =
	(global as any).__NEXT_SSR_CSS_RULES__ || [];

export class StyleConverter {
	private cache: Map<string, string>;
	private stylesheet: CSSStyleSheet;

	constructor() {
		this.cache = new Map<string, string>();

		if (typeof document !== 'undefined') {
			this.stylesheet = this.createStylesheet()!;
		} else {
			this.stylesheet = {} as CSSStyleSheet;
		}
	}

	private createStylesheet() {
		const style = document.createElement('style');
		document.head.appendChild(style);
		return style.sheet as CSSStyleSheet;
	}

	private generateClassName(property: string, value: string): string {
		const valueStr = String(value)
			.replace(/[^a-z0-9-]/gi, '')
			.replace('var---', '');
		return `bc-${toKebabCase(property)}-${valueStr}`;
	}

	public applyStyle(property: string, value: string): string {
		if (!property || !value)
			throw new Error(
				'[⚠️ StyleConverter.applyStyle] Property and value are required.'
			);

		const isCssVariable = `${value}`?.startsWith('var(--');
		const className = this.generateClassName(property, value);

		if (this.cache.has(className)) {
			return className;
		}

		const variableName = `--${className.replace(/[^a-z0-9-]/gi, '')}`;
		let cssRule = `.${className} { ${toKebabCase(property)}: var(${variableName}); }`;

		if (isCssVariable) {
			cssRule = `.${className} { ${toKebabCase(property)}: ${value}; }`;
		}

		const ruleExists = Array.from(this.stylesheet.cssRules || [0]).some(
			(rule) => rule.cssText === cssRule
		);

		if (!ruleExists) {
			try {
				if (typeof document !== 'undefined') {
					this.stylesheet.insertRule(
						cssRule,
						this.stylesheet.cssRules?.length || 0
					);
				}
			} catch (error) {
				// check if rule already exists

				if (
					(global as any).__NEXT_SSR_CSS_RULES__.find(
						(rule: string) => rule === cssRule
					)
				) {
					return className;
				}

				(global as any).__NEXT_SSR_CSS_RULES__ = [
					...new Set([
						...((global as any).__NEXT_SSR_CSS_RULES__ || []),
						cssRule,
					]),
				];
				console.error('Failed to insert rule:', error);
			}
		}

		this.cache.set(className, variableName);

		if (typeof document === 'undefined') {
			return className;
		}

		//lets identify common properties that need unit values
		const unitProperties = [
			'width',
			'height',
			'margin',
			'padding',
			'border-width',
			'border-radius',
			'border',
			'border-top',
			'border-right',
			'border-bottom',
			'border-left',
			'border-top-left-radius',
			'border-top-right-radius',
			'border-bottom-right-radius',
			'border-bottom-left-radius',
			'top',
			'right',
			'bottom',
			'left',
			'font-size',
			'line-height',
			'letter-spacing',
			'text-indent',
			'word-spacing',
			'min-width',
			'max-width',
			'min-height',
			'max-height',
			'outline-width',
			'outline-offset',
			'column-width',
			'column-gap',
			'column-rule-width',
			'column-rule',
			'column-rule-width',
			'column-rule-color',
			'column-rule-style',
			'column-span',
			'column-count',
			'column-fill',
			'column-rule',
			'column-rule-width',
			'column-rule-color',
			'column-rule-style',
			'column-span',
			'column-count',
			'column-fill',
			'grid-template-columns',
			'grid-template-rows',
			'grid-template-areas',
			'grid-template',
			'grid-auto-columns',
			'grid-auto-rows',
			'grid-auto-flow',
			'grid',
			'grid-row-start',
			'grid-row-end',
			'grid-column-start',
			'grid-column-end',
			'grid-row',
			'grid-column',
			'grid-area',
			'gap',
			'row-gap',
			'column-gap',
			'z-index',
			'opacity',
			'flex-basis',
			'order',
			'flex-grow',
			'flex-shrink',
			'line-height',
			'font-size',
			'letter-spacing',
			'text-indent',
			'word-spacing',
			'min-width',
			'max-width',
			'min-height',
			'max-height',
			'outline-width',
			'outline-offset',
			'column-width',
			'column-gap',
			'column-rule-width',
			'column-rule',
			'column-rule-width',
			'column-rule-color',
			'column-rule-style',
			'column-span',
			'column-count',
			'column-fill',
			'column-rule',
			'column-rule-width',
			'column-rule-color',
			'column-rule-style',
			'column-span',
			'column-count',
			'column-fill',
			'grid-template-columns',
			'grid-template-rows',
			'grid-template-areas',
			'grid-template',
			'grid-auto-columns',
			'grid-auto-rows',
			'grid-auto-flow',
			'grid',
			'grid-row-start',
			'grid-row-end',
			'grid-column-start',
			'grid-column-end',
			'grid-row',
			'grid-column',
			'grid-area',
			'gap',
			'row',
		];

		const augmentValue = unitProperties.includes(property)
			? `${value}px`
			: value;
		document.documentElement.style.setProperty(variableName, augmentValue);

		return className;
	}
}
