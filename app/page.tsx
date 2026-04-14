import Image from "next/image";
import Explorebtn from "./components/Explorebtn";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The hub for every Dev <br /> Events you can't miss
      </h1>
      <p className="text-center">
        Hackhathon, meetups, and more! all in one place!
      </p>
      <Explorebtn />
    </section>
  );
}
