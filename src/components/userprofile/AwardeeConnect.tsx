import Image from "next/image";

interface Awardee {
  avatar: string;
  name: string;
}

interface AwardeeConnectProps {
  awardee: Awardee;
}

export function AwardeeConnect({ awardee }: AwardeeConnectProps) {
  return (
    <Image
      src={awardee.avatar}
      alt={awardee.name}
      width={40}
      height={40}
      className="rounded-full"
    />
  );
}
