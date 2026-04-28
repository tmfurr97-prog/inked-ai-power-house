'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  imageId?: string;
  isAvailable?: boolean;
  launchLabel?: string;
  group?: string;
  onClick?: () => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop";

export function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  imageId,
  isAvailable = true,
  launchLabel,
  onClick,
}: ToolCardProps) {
  const matched = imageId ? PlaceHolderImages.find((img) => img.id === imageId) : undefined;
  const displayImage = matched?.imageUrl ?? FALLBACK_IMAGE;
  const imageAlt = matched?.imageHint ?? title;

  return (
    <Card onClick={isAvailable ? onClick : undefined} className={cn("overflow-hidden transition-all hover:shadow-md", !isAvailable && "opacity-75")}>
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img 
          src={displayImage} 
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform hover:scale-105" 
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {!isAvailable && (
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
              {launchLabel || 'Soon'}
            </Badge>
          )}
        </div>
        <CardDescription className="mt-2 line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant={isAvailable ? "default" : "outline"} className="w-full" disabled={!isAvailable}>
          <Link href={href} className="flex items-center justify-center gap-2">
            {isAvailable ? 'Open Tool' : 'Coming Soon'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}