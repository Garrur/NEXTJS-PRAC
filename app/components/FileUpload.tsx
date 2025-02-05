"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";

import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploapProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "Video";
}

export default function FileUploap({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploapProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "Video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file ");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video Must be les than 100 MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please Upload a vaildd file(JPEG, PNG, webP");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image Must be les than 5 MB");
        return false;
      }
    }

    return false;
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "Video" ? "Video" : "image"}
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        accept={fileType === "Video" ? "videos/*" : "images/*"}
        className="file-input file-input-bordered w-full "
        folder={fileType === "Video" ? "/videos" : "/images"}
      />
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Uploading....</span>
        </div>
      )}
      {error && <div className="text-error text-sm text-red-500">{error}</div>}
    </div>
  );
}
