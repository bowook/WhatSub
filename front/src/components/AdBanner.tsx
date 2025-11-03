import { Card } from './ui/card';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function AdBanner({ size = 'small', className = '' }: AdBannerProps) {
  const heights = {
    small: 'h-16',
    medium: 'h-24',
    large: 'h-32'
  };

  return (
    <Card className={`${heights[size]} flex items-center justify-center bg-muted/50 border-dashed ${className}`}>
      <div className="text-center text-muted-foreground text-xs">
        <p>광고 영역</p>
        <p className="text-[10px] mt-1">Google AdMob / Apple Ad</p>
      </div>
    </Card>
  );
}
