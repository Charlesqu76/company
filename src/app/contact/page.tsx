import PhoneOutlined from "@ant-design/icons/lib/icons/PhoneOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import "./index.scss";

const Contact = () => {
  const data = [
    {
      title: "热线: ",
      text: "12341234123412",
      icon: PhoneOutlined,
    },
    {
      title: "邮箱: ",
      text: "12341234123412",
      icon: MailOutlined,
    },
    {
      title: "地址: ",
      text: "12341234123412",
      icon: HomeOutlined,
    },
  ];
  return (
    <div className="contact">
      <div className="contact-body">
        <div className="contact__header">
          <div>
            <p className="contact__header-title">联系我们</p>
          </div>
          <p className="contact__header-engtitle">contact us</p>
        </div>
        <div className="contact__intro">
          <p className="contact__intro-title">欢迎您进入莱工网站</p>
          <p className="contact__intro-text">
            山东莱工机械制造有限公司是国内专业中小型工程机械制造商，从事研发制造工程机械已有20多年历史。在中小型工程机械领域拥有多项核心专利。为了满足多类型产品经营要求，公司按集团化事业部制组织架构进行业务管理!
          </p>
        </div>
        <div className="contact__con">
          {data.map((v) => (
            <div key={v.title} style={{ display: "flex", paddingLeft: "10px" }}>
              {v.icon && <v.icon style={{ fontSize: "30px" }} />}
              <div className="contact__item">
                <div>
                  <p className="contact__item-title">{v.title}</p>
                  <p className="contact__item-text">{v.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
