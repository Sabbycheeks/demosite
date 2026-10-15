import type { Photo as PhotoAsset } from "../content/site";

export function Photo({
  photo,
  className,
  priority = false,
}: {
  photo: PhotoAsset;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className}
    />
  );
}
