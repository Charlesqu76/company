import "./index.scss";
import { Carousel } from "antd";
import Image from "next/image";

export default function Home() {
  return (
    <main className="home">
      <Carousel autoplay={false}>
        <div className="home-img">
          <Image
            src="/t.jpg"
            alt="me"
            priority
            fill={true}
            objectFit="cover"
            objectPosition="contain"
          />
        </div>
      </Carousel>
    </main>
  );
}
