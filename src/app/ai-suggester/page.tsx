import AdCopySuggester from '@/components/ai/AdCopySuggester';

export default function AiSuggesterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
        AI Ad Copy Suggester
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Stuck on ad copy? Let our AI help! Upload an image of your ad&apos;s intended location,
        and our smart system will generate creative, concise, and location-appropriate text suggestions
        to inspire your campaign.
      </p>
      <AdCopySuggester />
    </div>
  );
}
