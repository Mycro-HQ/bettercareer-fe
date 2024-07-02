import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';

import usePreferenceStore from '../../store/preference-store';
import { PreferenceDataType } from '../../utils';

import { Flex, Heading } from '@labs/components';
import IdeaIcon from '@labs/icons/dashboard/idea.svg';
import { parseValue, useDebounce } from '@labs/utils';
import AddIcon from '@labs/icons/misc/add-alt-2.svg';
import TickIcon from '@labs/icons/misc/tick.svg';
import { Field } from '@labs/components/field';

import styles from './qualifications.module.scss';
import { Skillsets } from './qualification-data';

const Qualifications = ({
	handleSelectionChange,
	userPreference,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
	userPreference: PreferenceDataType;
}) => {
	const {
		selectedQualifications,
		handleSelectedQualification,
		setSelectedQualifications,
	} = usePreferenceStore();
	const [value, setValue] = React.useState('');
	const _search = useDebounce(value, 500);

	const { data: suggestions, isPending } = useQuery({
		queryKey: ['summary-suggestions', _search],
		queryFn: async () => {
			const response = await fetch(
				`${window.location.origin}/api/skills?q=${_search}`
			);
			return response.json();
		},
		enabled: _search.length > 0,
	});

	const setNewField = (val: any) => {
		if (
			Skillsets.find((item: string) => parseValue(item) === parseValue(val))
		) {
			handleSelectedQualification(parseValue(val));
			setValue('');
		} else {
			handleSelectedQualification(parseValue(val));
			setValue('');
			Skillsets.unshift(val);
		}
	};

	const hasSkill = (skill: string) => selectedQualifications.includes(skill);

	const updateSkillArray = (data: string[]) => {
		const existingSkills = new Set(Skillsets);
		const updatedSkills = data.filter((item) => !existingSkills.has(item));
		Skillsets.unshift(...updatedSkills);
	};

	React.useEffect(() => {
		handleSelectionChange(selectedQualifications.length > 0);
	}, [handleSelectionChange, selectedQualifications.length]);

	useEffect(() => {
		if (!userPreference?.data?.qualifications?.skills) return;
		updateSkillArray(userPreference?.data.qualifications.skills);
		setSelectedQualifications(userPreference?.data.qualifications.skills);
	}, [setSelectedQualifications, userPreference]);

	return (
		<Flex.Column gap={24} className={styles.Qualifications}>
			<Flex alignItems="center" gap={10}>
				<IdeaIcon />
				<Heading.h4 fontSize="18px">
					What are your relevant skills for your target jobs ?
				</Heading.h4>
			</Flex>
			<Flex className={styles.SkillSearch}>
				<Field.AutoComplete
					label={null}
					style={{ background: 'transparent' }}
					value={value}
					placeholder="Search skills"
					onChange={(e) => setValue(e.target.value)}
					suggestions={suggestions}
					isLoading={isPending}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							setValue('');

							if (value.length > 0) {
								setNewField(value);
							}
						}
					}}
					onSelect={(value) => {
						setNewField(value);
						setValue('');
					}}
				/>
			</Flex>
			<Flex
				alignItems="center"
				flexWrap="wrap"
				gap={8}
				className={styles.SkillList}
			>
				{Skillsets.map((skill, i) => (
					<button
						key={i}
						onClick={() => handleSelectedQualification(skill)}
						className={classNames([
							styles.SkillChip,
							styles[`SkillChip--${hasSkill(skill) && 'active'}`],
						])}
					>
						{hasSkill(skill) ? <TickIcon /> : <AddIcon />}
						{skill}
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};

export default Qualifications;
