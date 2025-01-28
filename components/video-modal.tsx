'use client';

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] p-0 bg-black overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative aspect-video">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src={videoUrl}
            title={title}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}