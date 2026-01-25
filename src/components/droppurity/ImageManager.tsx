
'use client';

import { useState, useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy } from 'lucide-react';

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const authenticationEndpoint = '/api/imagekit/auth';

export default function ImageManager() {
  const [folder, setFolder] = useState('cities'); // Default folder
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

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
          <Label htmlFor="folder-name">Upload Folder</Label>
          <Input
            id="folder-name"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="e.g., cities/kolkata"
            className="mt-1"
            disabled={isUploading}
          />
           <p className="text-xs text-muted-foreground mt-1">Enter a folder path. Nested folders are created with a '/'.</p>
        </div>

        <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
            <IKUpload
                folder={folder}
                fileName="website-asset.jpg"
                tags={["website-asset"]}
                useUniqueFileName={true}
                onUploadStart={onUploadStart}
                onSuccess={onSuccess}
                onError={onError}
                disabled={isUploading}
            >
                <Button type="button" disabled={isUploading}>
                    {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isUploading ? "Uploading..." : "Choose File to Upload"}
                </Button>
            </IKUpload>
            <p className="text-xs text-muted-foreground mt-2">Click to select an image.</p>
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
