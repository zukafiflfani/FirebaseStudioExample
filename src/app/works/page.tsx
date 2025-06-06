import WorksSlideshow from '@/components/works/WorksSlideshow';

export default function WorksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
        Our Portfolio
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore a selection of our finest outdoor advertising campaigns. Each project showcases our commitment to creativity, quality, and impact.
      </p>
      <WorksSlideshow />
    </div>
  );
}
