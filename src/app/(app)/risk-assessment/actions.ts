'use server';

import {
  assessRiskHeatmap,
  type RiskAssessmentHeatmapInput,
  type RiskAssessmentHeatmapOutput,
} from '@/ai/flows/risk-assessment-heatmap';

export async function getRiskAssessment(
  input: RiskAssessmentHeatmapInput
): Promise<{ success: boolean; data?: RiskAssessmentHeatmapOutput; error?: string }> {
  try {
    const result = await assessRiskHeatmap(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getRiskAssessment flow:', error);
    return { success: false, error: 'Failed to retrieve risk assessment from AI.' };
  }
}
