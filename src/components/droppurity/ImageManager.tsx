
'use client';

import { useState, useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cityData } from '@/config/cityData';

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const authenticationEndpoint = '/api/imagekit/auth';

export default function ImageManager() {
  const [folder, setFolder] = useState('');
  const [uploadMode, setUploadMode] = useState('city'); // 'city' or 'custom'
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const ikUploadRef = useRef<HTMLInputElement>(null);

  const onUploadStart = () => {
    setIsUploading(true);
    setUploadedImageUrl(null);
  };

  const onSuccess = (res: any) => {
    setIsUploading(false);
    setUploadedImageUrl(res.url);
    toast({
      title: 'Upload Successful!',
      description: `Image uploaded to: ${res.filePath}`,
    });
  };

  const onError = (err: any) => {
    setIsUploading(false);
    console.error("ImageKit Upload Error:", err);
    
    let description = "An unknown error occurred during upload.";
    if (Object.keys(err).length === 0) {
      description = "Authentication failed. Please ensure your IMAGEKIT_PRIVATE_KEY is set correctly in .env.local and that the server has been restarted.";
    } else if (err.message) {
      description = err.message;
    }

    toast({
      variant: "destructive",
      title: 'Upload Failed',
      description: description,
    });
  };
  
  const copyToClipboard = () => {
    if (uploadedImageUrl) {
        navigator.clipboard.writeText(uploadedImageUrl).then(() => {
            toast({ title: "URL Copied!" });
        }, (err) => {
            toast({ variant: "destructive", title: "Failed to copy URL." });
        });
    }
  };

  const handleCitySelect = (citySlug: string) => {
    if (citySlug) {
      setFolder(`cities/${citySlug}`);
    }
  };

  if (!publicKey || !urlEndpoint) {
    return (
      <div className="text-destructive font-semibold">
        ImageKit configuration is missing. Please set NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY and NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT in your .env.local file.
      </div>
    )
  }

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticationEndpoint={authenticationEndpoint}
    >
      <div className="space-y-6">
        <div>
          <Label>Upload Folder</Label>
          <RadioGroup value={uploadMode} onValueChange={setUploadMode} className="flex space-x-4 py-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="city" id="city" />
              <Label htmlFor="city">Select City</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom Folder</Label>
            </div>
          </RadioGroup>

          {uploadMode === 'city' ? (
            <Select onValueChange={handleCitySelect} disabled={isUploading}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city to create a folder..." />
              </SelectTrigger>
              <SelectContent>
                {cityData.map(city => (
                  <SelectItem key={city.slug} value={city.slug}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              placeholder="e.g., products/new"
              className="mt-1"
              disabled={isUploading}
            />
          )}
          <p className="text-xs text-muted-foreground mt-1">Current upload path: <strong>{folder || '[Not Set]'}</strong></p>
        </div>

        <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
            <Button 
                type="button" 
                disabled={isUploading || !folder}
                onClick={() => ikUploadRef.current?.click()}
            >
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isUploading ? "Uploading..." : "Choose File to Upload"}
            </Button>
            <IKUpload
                ref={ikUploadRef}
                style={{ display: 'none' }}
                folder={folder}
                fileName="website-asset.jpg"
                tags={["website-asset"]}
                useUniqueFileName={true}
                onUploadStart={onUploadStart}
                onSuccess={onSuccess}
                onError={onError}
                disabled={isUploading || !folder}
            />
            <p className="text-xs text-muted-foreground mt-2">Select a folder, then click to select an image.</p>
        </div>

        {uploadedImageUrl && (
            <div className="space-y-2">
                <Label>Uploaded Image URL</Label>
                <div className="flex items-center gap-2">
                    <Input value={uploadedImageUrl} readOnly className="bg-muted" />
                    <Button variant="outline" size="icon" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                 <div className="relative aspect-video w-full max-w-sm mx-auto mt-4 rounded-md overflow-hidden border">
                    <img src={uploadedImageUrl} alt="Uploaded image" className="object-contain w-full h-full" />
                 </div>
            </div>
        )}
      </div>
    </IKContext>
  );
}
