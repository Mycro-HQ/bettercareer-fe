export * from './resume-analysis';

// placeholder for actual data
export const ResumeAnalysisInfo = [
	{ label: 'formatting', color: '#dd4237', score: 50, problem: "The resume layout may be inconsistent or difficult to read, leading to confusion or a negative impression.",
	"solutions": [
		"Ensure consistent formatting throughout the resume, using clear headings, bullet points, and a professional font.",
		"Consider using templates or seeking feedback from peers or professionals."
	] },
	{ label: 'keywords', color: '#2b94f4', score: 50, problem: "The resume may lack relevant keywords or phrases that align with the job description, potentially leading to it being overlooked by applicant tracking systems (ATS) or recruiters.",
	"solutions": [
		"Tailor the resume for each job application by incorporating keywords from the job description into the resume's content, particularly in the skills and experience sections.",
		"Use industry-specific terminology and highlight relevant experiences and achievements."
	] },
	{ label: 'content', color: '#dc6903', score: 50, problem: "The content of the resume may be too verbose, redundant, or not effectively highlighting the candidate's qualifications and experiences.",
	"solutions": [
		"Condense the content to include only essential information, focusing on achievements, responsibilities, and relevant experiences.",
		"Use concise language and bullet points to convey information effectively."
	] },
	{ label: 'summary', color: '#1c885b', score: 50, problem: "The summary section, if included, may be generic or fail to provide a clear overview of the candidate's qualifications and career objectives.",
	"solutions": [
		"Craft a targeted and impactful summary that highlights key skills, experiences, and career goals.",
		"Tailor the summary for each job application to align with the specific job requirements."
	] },
	{ label: 'quantifiable results', color: '#4ea27f', score: 50, problem: "The resume may lack quantifiable achievements or results, making it difficult for employers to gauge the candidate's performance and contributions.",
	"solutions": [
		"Include quantifiable achievements or results wherever possible, such as percentages of sales increase, project completion times, or cost savings.",
		"Use metrics to demonstrate the impact of your work and contributions."
	],},
	{ label: 'skills', color: '#dd4237', score: 50, problem: "The skills section may be incomplete or fail to adequately showcase the candidate's relevant skills and proficiencies.",
	"solutions": [
		"Review and update the skills section to include a comprehensive list of relevant technical, soft, and transferable skills.",
		"Prioritize skills that are directly applicable to the target job and provide examples or context where appropriate."
	], },
];
