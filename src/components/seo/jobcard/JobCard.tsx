import React from 'react';
import Image from 'next/image';
import { CallToAction, Flex, Heading, Text } from '@labs/components';
import { CompanyLogo } from '../../../../public/images/jobs';
import styles from './jobcard.module.scss'

const JobCard = () => {
  return (
    <div className={styles.jobCard}>

      <div className={styles.jobDetails}>

        <div className={styles.logoAndInfo}>
          <Image src={CompanyLogo} alt='Company Logo' />

          <div className={styles.info}>
            <Heading.h6>Brand Designer</Heading.h6>
            <Text color='var(--text-gray)'>Dribble. California. $120k - $140k</Text>
          </div>
        </div>
				
        <div className={styles.actionButtons}>
          <button className={styles.save}>Save</button>
          <button className={styles.apply}>Apply</button>
        </div>
      </div>
			
      <div className={styles.tags}>
        <div className={styles.tag}>Remote</div>
        <div className={styles.tag}>Internship</div>
        <div className={styles.tag}>Full-time</div>
      </div>
    </div>
  );
};

export default JobCard;
