import { getImage } from "../../utils/images";

const DEFAULT_SIZES = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * Responsive, lazy-loaded image.
 *  - `name`     image name inside src/assets/img ("hero", "clients/aiu.png" ... extension optional)
 *  - `priority` above-the-fold images: eager + high fetch priority
 *  - `sizes`    tells the browser how wide the image is displayed so it can pick the smallest sufficient file
 * Natural width/height are always set so the browser reserves space (no layout shift).
 */
export default function Img({ name, alt = "", sizes = DEFAULT_SIZES, priority = false, className, ...rest }) {
  const image = getImage(name);
  if (!image) {
    if (import.meta.env.DEV) console.warn(`[Img] unknown image "${name}"`);
    return null;
  }
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "auto" : "async"}
      fetchPriority={priority ? "high" : undefined}
      {...rest}
    />
  );
}
