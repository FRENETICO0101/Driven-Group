export type PropertyImageVariant = "full" | "preview" | "thumbnail";

const localVariantDirectories: Record<PropertyImageVariant, string> = {
  full: "gallery",
  preview: "gallery-previews",
  thumbnail: "gallery-thumbnails",
};

const cloudinaryTransforms: Record<PropertyImageVariant, string> = {
  full: "f_auto,q_auto:good,c_limit,w_1600,h_1600",
  preview: "f_auto,q_auto:eco,c_limit,w_960,h_960",
  thumbnail: "f_auto,q_auto:eco,c_fill,w_240,h_240",
};

export function getPropertyImageUrl(url: string, variant: PropertyImageVariant = "full") {
  if (url.startsWith("/property-assets/") && url.includes("/gallery/")) {
    return url.replace("/gallery/", `/${localVariantDirectories[variant]}/`);
  }

  if (url.startsWith("https://res.cloudinary.com/") && url.includes("/image/upload/")) {
    return url.replace("/image/upload/", `/image/upload/${cloudinaryTransforms[variant]}/`);
  }

  return url;
}
