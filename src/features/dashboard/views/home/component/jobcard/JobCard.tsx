import { CallToAction, Heading, Text } from '@labs/components';
import styles from './jobcard.module.scss'
import { types } from 'util';

interface IProps {
 title: string,
 company: string,
 location: string,
 pay: string,
 tags: string[]
}


const JobCard = ({title, company, location, pay, tags, ...props } : IProps) => {
  return (
    <div className={styles.JobCard}>

      <div className={styles.JobDetails}>

        <div className={styles.LogoAndInfo}>
          
          <img alt="" src='/images/jobs/company_logo.png'   />

          <div className={styles.Info}>
            <Heading.h6 weight={600}>{title}</Heading.h6>
            <Text color='var(--text-gray)'>{company}. {location}. {pay}</Text>
          </div>
        </div>
				
        <div className={styles.ActionButtons}>
          <CallToAction outline className={styles.Save}>Save</CallToAction>
          <CallToAction className={styles.Apply}>Apply</CallToAction>
        </div>
      </div>
			
      <div className={styles.Tags}>
        {
          tags.map((tag) => (
            <div className={styles.Tag}>{tag}</div>
          ))
        }

      </div>
    </div>
  );
};

export default JobCard;
