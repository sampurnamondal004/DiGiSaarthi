'use server';

import { assessSilentAlarm, AssessSilentAlarmInput } from '@/ai/flows/emergency-silent-alarm';

export async function handleEmergency() {
  // In a real app, this data would be dynamically fetched for the current user.
  const input: AssessSilentAlarmInput = {
    locationDescription: 'Crowded market area, near Connaught Place, New Delhi',
    incidentDescription: 'User has pressed the panic button. Feels followed and threatened.',
    touristSafetyScore: 65,
  };

  try {
    const result = await assessSilentAlarm(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error assessing silent alarm:', error);
    return { success: false, error: 'Failed to get AI assessment.' };
  }
}
