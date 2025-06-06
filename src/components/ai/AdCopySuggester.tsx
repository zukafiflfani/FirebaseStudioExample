'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, Lightbulb, Loader2 } from 'lucide-react';
import { getAdCopySuggestionsAction, type AdCopyState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export default function AdCopySuggester() {
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [state, setState] = useState<AdCopyState>({ isLoading: false });
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Limit file size to 4MB
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
          variant: "destructive",
        });
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (e.g., JPG, PNG, GIF).",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
        setFileName(file.name);
        setState({ isLoading: false }); // Reset state if a new file is chosen
      };
      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "Could not read the selected file. Please try again.",
          variant: "destructive",
        });
      }
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!photoDataUri) {
      toast({
        title: "No image selected",
        description: "Please upload an image of the location first.",
        variant: "destructive",
      });
      return;
    }

    setState({ isLoading: true, suggestions: undefined, error: undefined });
    const result = await getAdCopySuggestionsAction(photoDataUri);
    setState(result);

    if (result.error) {
      toast({
        title: "Error generating suggestions",
        description: result.error,
        variant: "destructive",
      });
    } else if (result.suggestions && result.suggestions.length > 0) {
       toast({
        title: "Suggestions Generated!",
        description: "Check out your new ad copy ideas below.",
      });
    } else {
       toast({
        title: "No Suggestions",
        description: "The AI couldn't generate suggestions for this image. Try another one!",
        variant: "default"
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <UploadCloud className="h-6 w-6 mr-2 text-primary" /> Upload Location Image
          </CardTitle>
          <CardDescription>
            Upload a picture of the outdoor location where your ad will be placed. Our AI will generate copy suggestions based on the visual context.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input type="file" accept="image/*" onChange={handleFileChange} className="file:text-primary file:font-semibold" />
          {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
          {photoDataUri && (
            <div className="mt-4 border rounded-lg p-2 max-w-md mx-auto">
              <Image src={photoDataUri} alt="Uploaded location" width={400} height={300} className="rounded-md object-contain max-h-[300px] w-auto mx-auto" />
            </div>
          )}
          <Button onClick={handleSubmit} disabled={!photoDataUri || state.isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {state.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" /> Get Ad Copy Suggestions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {state.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.suggestions && state.suggestions.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Generated Ad Copy Suggestions</CardTitle>
            <CardDescription>Here are a few creative ideas to get you started:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 list-disc list-inside">
              {state.suggestions.map((suggestion, index) => (
                <li key={index} className="text-foreground p-3 bg-secondary/50 rounded-md shadow-sm">
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
