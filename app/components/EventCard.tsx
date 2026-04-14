import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const Event = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <div>
      <Link href={`/events/${slug}`}>
        <Image
          src={image}
          alt={title}
          width={140}
          height={300}
          className="poster"
        />

        <div className="flex flex-row gap-2">
          <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
          <span>{location}</span>
        </div>

        <p className="title">{title}</p>
        <div>
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <span>{time}</span>
        </div>
      </Link>
    </div>
  );
};

export default Event;
