export interface GrantData {
  name: string;
  amount: string;
  description: string;
  applicationDeadline: string;
  externalLink: string;
  industry: string;
  stage: string;
  demographics: string;
  benefits: {
    googleCloudCredits: boolean;
    awsCredits: boolean;
    mentorshipProgram: boolean;
  };
}
