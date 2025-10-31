import React from "react";
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

function ContactBar() {
  // بيانات الروابط الاجتماعية (يمكن جلبها من API لاحقاً)
  const socialLinks = [
    {
      icon: <FaFacebookF size={16} />,
      url: "https://facebook.com",
      label: "Facebook"
    },
    {
      icon: <FaLinkedinIn size={16} />,
      url: "https://linkedin.com",
      label: "LinkedIn"
    },
    {
      icon: <FaTwitter size={16} />,
      url: "https://twitter.com",
      label: "Twitter"
    },
    {
      icon: <FaInstagram size={16} />,
      url: "https://instagram.com",
      label: "Instagram"
    }
  ];

  // معلومات الاتصال
  const contactInfo = [
    {
      icon: <FaPhoneAlt size={14} />,
      text: "+970 599 123 456",
      url: "tel:+970599123456"
    },
    {
      icon: <FaEnvelope size={14} />,
      text: "info@alzest.com",
      url: "mailto:info@alzest.com"
    }
  ];

  return (
    <div className="contact-bar" style={styles.bar}>
      {/* قسم معلومات الاتصال */}
      <div style={styles.contactWrapper}>
        {contactInfo.map((item, index) => (
          <a
            key={index}
            href={item.url}
            style={styles.contactItem}
            aria-label={item.text}
          >
            <span style={styles.contactIcon}>{item.icon}</span>
            <span style={styles.contactText}>{item.text}</span>
          </a>
        ))}
      </div>

      {/* قسم الروابط الاجتماعية */}
      <div style={styles.socialWrapper}>
        <span style={styles.socialLabel}>تواصل معنا</span>
        
        <div style={styles.socialIcons}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// أنماط مكونة بشكل منفصل لسهولة الصيانة
const styles = {
  bar: {
    backgroundColor: "#fff",
    padding: "8px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    direction: "rtl",
    borderBottom: "1px solid #f0f0f0",
    flexWrap: "wrap",
    gap: "15px"
  },
  contactWrapper: {
    display: "flex",
    gap: "20px"
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#333",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s ease",
    hover: {
      color: "#2c8eff"
    }
  },
  contactIcon: {
    color: "#2c8eff"
  },
  contactText: {
    fontWeight: "500"
  },
  socialWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  socialLabel: {
    color: "#333",
    fontWeight: "bold",
    fontSize: "16px",
    userSelect: "none"
  },
  socialIcons: {
    display: "flex",
    gap: "10px"
  },
  socialIcon: {
    color: "#6c757d",
    backgroundColor: "#fff",
    borderRadius: "50%",
    padding: "6px",
    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    hover: {
      color: "#fff",
      backgroundColor: "#2c8eff",
      transform: "translateY(-2px)"
    }
  }
};

// تطبيق تأثيرات hover (تتطلب إضافة مكتبة styled-components أو طريقة مشابهة)
const hoverStyles = `
  .contact-bar a:hover {
    color: #2c8eff;
  }
  .contact-bar a.social-icon:hover {
    color: #fff;
    background-color: #2c8eff;
    transform: translateY(-2px);
  }
`;

export default ContactBar;