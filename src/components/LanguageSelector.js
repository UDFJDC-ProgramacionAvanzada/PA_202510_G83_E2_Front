"use client";

import { Dropdown } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = ({ variant = "outline-light", size = "sm" }) => {
  const { language, changeLanguage, getAvailableLanguages } = useLanguage();
  const languages = getAvailableLanguages();
  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <Dropdown>
      <Dropdown.Toggle variant={variant} size={size} id="language-dropdown">
        {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            active={language === lang.code}
            onClick={() => changeLanguage(lang.code)}
          >
            {lang.flag} {lang.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;
