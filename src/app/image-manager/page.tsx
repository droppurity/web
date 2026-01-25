
import ImageManager from '@/components/droppurity/ImageManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
            Image Manager
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload and manage your website images.
          </p>
        </header>
        <Card className="shadow-xl max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>ImageKit Uploader</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageManager />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
