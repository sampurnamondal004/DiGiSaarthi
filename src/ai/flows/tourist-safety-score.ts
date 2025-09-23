// src/ai/flows/tourist-safety-score.ts
'use server';

/**
 * @fileOverview Flow for calculating and providing a Tourist Safety Score (TSS) for a given location.
 *
 * - getTouristSafetyScore - A function that calculates and returns the TSS.
 * - TouristSafetyScoreInput - The input type for the getTouristSafetyScore function.
 * - TouristSafetyScoreOutput - The return type for the getTouristSafetyScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TouristSafetyScoreInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
  weatherCondition: z.string().describe('The weather condition at the location.'),
  trafficDensity: z.string().describe('The traffic density at the location (e.g., low, medium, high).'),
  historicalIncidentReports: z.string().describe('A summary of recent incident reports in the area.'),
});
export type TouristSafetyScoreInput = z.infer<typeof TouristSafetyScoreInputSchema>;

const TouristSafetyScoreOutputSchema = z.object({
  touristSafetyScore: z.number().describe('The Tourist Safety Score (TSS) for the location, ranging from 0 (very unsafe) to 100 (very safe).'),
  safetyAssessment: z.string().describe('A detailed assessment of the safety situation at the location, including potential dangers and safety recommendations.'),
});
export type TouristSafetyScoreOutput = z.infer<typeof TouristSafetyScoreOutputSchema>;

export async function getTouristSafetyScore(input: TouristSafetyScoreInput): Promise<TouristSafetyScoreOutput> {
  return touristSafetyScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'touristSafetyScorePrompt',
  input: {schema: TouristSafetyScoreInputSchema},
  output: {schema: TouristSafetyScoreOutputSchema},
  prompt: `You are an AI assistant designed to assess the safety of a location for tourists.

You will receive the following information about the location:
- Latitude: {{latitude}}
- Longitude: {{longitude}}
- Weather Condition: {{weatherCondition}}
- Traffic Density: {{trafficDensity}}
- Historical Incident Reports: {{historicalIncidentReports}}

Based on this information, calculate a Tourist Safety Score (TSS) on a scale of 0 to 100, where 0 is very unsafe and 100 is very safe.
Also, provide a detailed safety assessment, including potential dangers and safety recommendations.

Ensure that the output is structured according to the TouristSafetyScoreOutputSchema, including the touristSafetyScore and safetyAssessment fields.
`, 
});

const touristSafetyScoreFlow = ai.defineFlow(
  {
    name: 'touristSafetyScoreFlow',
    inputSchema: TouristSafetyScoreInputSchema,
    outputSchema: TouristSafetyScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
