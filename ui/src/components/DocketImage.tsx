import React, { useState } from 'react';
import { Docket } from '@/gear';
import cn from 'classnames';
import { useTileColor } from '@/tiles/useTileColor';

type DocketImageSizes = 'xs' | 'small' | 'default' | 'full';

interface DocketImageProps extends Pick<Docket, 'color' | 'image'> {
  className?: string;
  size?: DocketImageSizes;
}

const sizeMap: Record<DocketImageSizes, string> = {
  xs: 'w-6 h-6 rounded',
  small: 'w-8 h-8 rounded-md',
  default: 'w-12 h-12 rounded-lg',
  full: 'w-20 h-20 md:w-32 md:h-32 rounded-2xl',
};

export function DocketImage({
  color,
  image,
  className = '',
  size = 'full',
}: DocketImageProps) {
  const { tileColor } = useTileColor(color ?? 'black');
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        'relative flex-none overflow-hidden bg-gray-200',
        sizeMap[size],
        className
      )}
      style={{ backgroundColor: tileColor }}
    >
      {image && !imageError && (
        <img
          className="absolute left-0 top-0 h-full w-full object-cover"
          src={image}
          alt=""
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
