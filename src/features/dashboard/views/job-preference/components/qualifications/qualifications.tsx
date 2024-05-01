import React from 'react';
import { TextField } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';

import usePreferenceStore from '../../store/preference-store';

import { Flex, Heading } from '@labs/components';
import IdeaIcon from '@labs/icons/dashboard/idea.svg';
import { useDebounce } from '@labs/utils';
import AddIcon from '@labs/icons/misc/add-alt-2.svg';
import TickIcon from '@labs/icons/misc/tick.svg';

import styles from './qualifications.module.scss';
import { Skillsets } from './qualification-data';

const Qualifications = ({
	handleSelectionChange,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
}) => {
	const { selectedQualifications, handleSelectedQualification } =
		usePreferenceStore();
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

	const hasSkill = (skill: string) => selectedQualifications.includes(skill);

	React.useEffect(() => {
		handleSelectionChange(selectedQualifications.length > 0);
	}, [handleSelectionChange, selectedQualifications.length]);

	return (
		<Flex.Column gap={24} className={styles.Qualifications}>
			<Flex alignItems="center" gap={10}>
				<IdeaIcon />
				<Heading.h4 fontSize="18px">
					What are your relevant skills for your target jobs ?
				</Heading.h4>
			</Flex>
			<Flex>
				<TextField.Root className={styles.Search}>
					<TextField.Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Search skills"
					/>
					<TextField.Slot></TextField.Slot>
				</TextField.Root>
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
