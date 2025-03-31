import Image from 'next/image';

interface Profile {
  avatar: string;
  name: string;
}

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Image 
      src={profile.avatar} 
      alt={profile.name}
      width={64}
      height={64}
      className="rounded-full"
    />
  );
} 