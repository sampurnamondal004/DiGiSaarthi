'use server';

/**
 * @fileOverview An AI agent that determines if a silent alarm should be activated during an emergency.
 *
 * - assessSilentAlarm - A function that assesses the need for a silent alarm.
 * - AssessSilentAlarmInput - The input type for the assessSilentAlarm function.
 * - AssessSilentAlarmOutput - The return type for the assessSilentAlarm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessSilentAlarmInputSchema = z.object({
  locationDescription: z
    .string()
    .describe('A description of the tourist current location.'),
  incidentDescription: z
    .string()
    .describe('A description of the incident that triggered the emergency button.'),
  touristSafetyScore: z
    .number()
    .describe(
      'The Tourist Safety Score (TSS) for the tourist current location. The higher the score, the safer the location.'
    ),
});
export type AssessSilentAlarmInput = z.infer<typeof AssessSilentAlarmInputSchema>;

const AssessSilentAlarmOutputSchema = z.object({
  silentAlarmRecommended: z
    .boolean()
    .describe(
      'Whether or not a silent alarm to the police is recommended based on the situation.'
    ),
  reason: z
    .string()
    .describe('The reason for recommending or not recommending a silent alarm.'),
});
export type AssessSilentAlarmOutput = z.infer<typeof AssessSilentAlarmOutputSchema>;

export async function assessSilentAlarm(input: AssessSilentAlarmInput): Promise<AssessSilentAlarmOutput> {
  return assessSilentAlarmFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessSilentAlarmPrompt',
  input: {schema: AssessSilentAlarmInputSchema},
  output: {schema: AssessSilentAlarmOutputSchema},
  prompt: `You are an expert in emergency response, specializing in assessing the need for silent alarms to the police.

You will receive a description of the tourist current location, a description of the incident that triggered the emergency button, and the Tourist Safety Score (TSS) for the tourist current location.

Based on this information, you will make a determination as to whether a silent alarm to the police is recommended. Consider factors such as the severity of the incident, the safety of the location, and the potential for escalation.

Location Description: {{{locationDescription}}}
Incident Description: {{{incidentDescription}}}
Tourist Safety Score: {{{touristSafetyScore}}}

Set the silentAlarmRecommended output field appropriately and provide a detailed reason for your decision.
`,
});

const assessSilentAlarmFlow = ai.defineFlow(
  {
    name: 'assessSilentAlarmFlow',
    inputSchema: AssessSilentAlarmInputSchema,
    outputSchema: AssessSilentAlarmOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

