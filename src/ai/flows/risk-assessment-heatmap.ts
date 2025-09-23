'use server';

/**
 * @fileOverview Risk assessment heatmap flow for determining tourist safety scores in different geographical areas.
 *
 * - assessRiskHeatmap - A function that generates a risk assessment based on weather, traffic, and historical incident reports.
 * - RiskAssessmentHeatmapInput - The input type for the assessRiskHeatmap function.
 * - RiskAssessmentHeatmapOutput - The return type for the assessRiskHeatmap function, including the Tourist Safety Score (TSS).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskAssessmentHeatmapInputSchema = z.object({
  areaDescription: z
    .string()
    .describe("Description of the geographical area for risk assessment."),
  weatherData: z.string().describe("Current weather data for the area."),
  trafficData: z.string().describe("Current traffic conditions in the area."),
  historicalIncidentReports: z
    .string()
    .describe("Historical data of incidents in the area."),
});
export type RiskAssessmentHeatmapInput = z.infer<
  typeof RiskAssessmentHeatmapInputSchema
>;

const RiskAssessmentHeatmapOutputSchema = z.object({
  touristSafetyScore: z
    .number()
    .describe("A score (0-100) indicating tourist safety level, factoring in weather, traffic, and incident history."),
  riskLevel: z
    .string()
    .describe("Overall risk level assessment: Low, Medium, or High."),
  recommendations: z
    .string()
    .describe("Safety recommendations for tourists visiting this area."),
  heatmapData: z
    .string()
    .describe("Heatmap data representing risk levels across the geographical area."),
});
export type RiskAssessmentHeatmapOutput = z.infer<
  typeof RiskAssessmentHeatmapOutputSchema
>;

export async function assessRiskHeatmap(
  input: RiskAssessmentHeatmapInput
): Promise<RiskAssessmentHeatmapOutput> {
  return assessRiskHeatmapFlow(input);
}

const assessRiskHeatmapPrompt = ai.definePrompt({
  name: 'assessRiskHeatmapPrompt',
  input: {schema: RiskAssessmentHeatmapInputSchema},
  output: {schema: RiskAssessmentHeatmapOutputSchema},
  prompt: `You are an AI assistant specialized in assessing risk levels for tourists in different geographical areas. Analyze the provided data to generate a Tourist Safety Score (TSS) from 0-100, determine the risk level (Low, Medium, or High), provide safety recommendations, and generate heatmap data.

Area Description: {{{areaDescription}}}
Weather Data: {{{weatherData}}}
Traffic Data: {{{trafficData}}}
Historical Incident Reports: {{{historicalIncidentReports}}}

Consider all factors to provide an accurate and helpful risk assessment for tourists.

Output in JSON format:
{
  "touristSafetyScore": number,
  "riskLevel": string,
  "recommendations": string,
 "heatmapData": string
}
`,
});

const assessRiskHeatmapFlow = ai.defineFlow(
  {
    name: 'assessRiskHeatmapFlow',
    inputSchema: RiskAssessmentHeatmapInputSchema,
    outputSchema: RiskAssessmentHeatmapOutputSchema,
  },
  async input => {
    const {output} = await assessRiskHeatmapPrompt(input);
    return output!;
  }
);
