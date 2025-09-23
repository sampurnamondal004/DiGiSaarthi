import { RiskAssessmentForm } from './risk-assessment-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Risk Assessment | DigiSaarthi',
};

export default function RiskAssessmentPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">AI Risk Assessment Tool</h1>
        <p className="text-muted-foreground">
          Use AI to estimate the risk level in geographical areas based on various data points.
        </p>
      </header>
      <RiskAssessmentForm />
    </div>
  );
}
