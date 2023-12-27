import { Timeline } from "antd";
import "./index.scss";
import Image from "next/image";

const data = [
  {
    year: 2020,
    content: "1998年，山东莱工机械制造有限公司伴随着中国建设领域突飞猛进的大潮应运而生，二十余载潜心专注、创新引领。致力于中国中小型工程机械成套设备专业制造商。",
    img: "https://www.simedarbymotors.com.cn/uploads/20220725232140c42af2076.PNG",
  },
  {
    year: 2010,
    content: "1998年，山东莱工机械制造有限公司伴随着中国建设领域突飞猛进的大潮应运而生，二十余载潜心专注、创新引领。致力于中国中小型工程机械成套设备专业制造商。",
    img: "https://www.simedarbymotors.com.cn/uploads/2022072616462612f474273.jpg",
  },
  {
    year: 2002,
    content: "1998年，山东莱工机械制造有限公司伴随着中国建设领域突飞猛进的大潮应运而生，二十余载潜心专注、创新引领。致力于中国中小型工程机械成套设备专业制造商。",
  },
  {
    year: 2000,
    content: "1998年，山东莱工机械制造有限公司伴随着中国建设领域突飞猛进的大潮应运而生，二十余载潜心专注、创新引领。致力于中国中小型工程机械成套设备专业制造商。",
    img: "https://www.simedarbymotors.com.cn/uploads/2022072616462612f474273.jpg",
  },
  {
    year: 1999,
    content:
      "1998年，山东莱工机械制造有限公司伴随着中国建设领域突飞猛进的大潮应运而生，二十余载潜心专注、创新引领。致力于中国中小型工程机械成套设备专业制造商。",
    img: "https://www.simedarbymotors.com.cn/uploads/2022072616462612f474273.jpg",
  },
];

const renderData = data.map((v) => {
  const { year, content, img } = v;
  return {
    children: (
      <div className="item">
        <p className="item-year">{year}</p>
        <p className="item-text">{content}</p>
        {img && (
          <div className="item-img">
            <Image
              src={img}
              alt="img"
              fill
              objectFit="contain"
              objectPosition="left"
            />
          </div>
        )}
      </div>
    ),
  };
});

const About = () => {
  return (
    <div className="about">
      <div className="about__header">
        <div className="about__header-title">公司简介</div>
        <h3 className="about__header-subtitle">我们所追求的，正是你所需要的</h3>
      </div>

      <div className="about__con">
        <Timeline items={renderData}></Timeline>
      </div>
    </div>
  );
};

export default About;
