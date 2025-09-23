'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getRiskAssessment } from './actions';
import { type RiskAssessmentHeatmapOutput } from '@/ai/flows/risk-assessment-heatmap';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, BarChart, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  areaDescription: z.string().min(10, 'Please provide a more detailed area description.'),
  weatherData: z.string().min(3, 'Weather data is required.'),
  trafficData: z.string().min(3, 'Traffic data is required.'),
  historicalIncidentReports: z.string().min(10, 'Please provide some historical context.'),
});

type FormData = z.infer<typeof formSchema>;

export function RiskAssessmentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RiskAssessmentHeatmapOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areaDescription: 'Connaught Place and surrounding areas, New Delhi, India',
      weatherData: 'Clear skies, 32°C, Light breeze',
      trafficData: 'Heavy during evening peak hours',
      historicalIncidentReports: 'Reports of pickpocketing, occasional scams targeting tourists. No major violent crimes reported in the last month.',
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    setResult(null);
    const response = await getRiskAssessment(values);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Assessment Failed',
        description: response.error,
      });
    }
    setIsLoading(false);
  };
  
  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-destructive';
    if (score < 70) return 'text-yellow-500';
    return 'text-green-600';
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Input</CardTitle>
          <CardDescription>Provide data to generate a Tourist Safety Score (TSS).</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="areaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Downtown area, beachside resorts" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Data</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sunny, 25°C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trafficData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Traffic Data</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Light, Moderate, Heavy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalIncidentReports"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Incident Reports</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Summary of recent incidents..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Assess Risk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Result</CardTitle>
          <CardDescription>The AI-generated safety score and recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Analyzing data...</p>
            </div>
          )}
          {!isLoading && !result && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-8">
                <BarChart className="w-10 h-10 mb-4" />
                <p>Results will be displayed here after submission.</p>
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Tourist Safety Score (TSS)</p>
                <div className="flex items-center gap-4">
                    <span className={`text-5xl font-bold ${getScoreColor(result.touristSafetyScore)}`}>{result.touristSafetyScore}</span>
                    <Progress value={result.touristSafetyScore} className="w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary"/>
                    <h4 className="font-semibold">Risk Level: {result.riskLevel}</h4>
                </div>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{result.riskLevel}</p>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary"/>
                    <h4 className="font-semibold">Recommendations</h4>
                </div>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md leading-relaxed">{result.recommendations}</p>
              </div>
              
               <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-primary"/>
                    <h4 className="font-semibold">Heatmap Data (Raw)</h4>
                </div>
                <pre className="text-xs text-muted-foreground p-3 bg-muted rounded-md overflow-x-auto">
                    {result.heatmapData}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
