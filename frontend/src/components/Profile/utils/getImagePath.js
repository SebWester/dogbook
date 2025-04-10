export function getImagePath(profilePic) {
  if (!profilePic) return "/default-img.webp";
  return profilePic.replace(/^uploads/, "");
}
