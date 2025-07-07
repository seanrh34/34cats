type ProfilePictureProps = {
  imageUrl: string;
};

export default function ProfilePicture({ imageUrl }: ProfilePictureProps) {
  return (
    <div className="relative rounded-[20px] transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(var(--color-accent-rgb))]">
      <img
        alt="Profile picture"
        src={imageUrl}
        className="object-cover rounded-[20px]"
      />
    </div>
  );
}