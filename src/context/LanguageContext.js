"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    // Detectar idioma del navegador automáticamente
    const browserLanguage = navigator.language.split("-")[0];

    // Verificar si tenemos soporte para el idioma del navegador
    if (browserLanguage === "en" || browserLanguage === "es") {
      setLanguage(browserLanguage);
    } else {
      // Fallback a español si no soportamos el idioma
      setLanguage("es");
    }

    // Solo verificar localStorage si el usuario ha cambiado manualmente el idioma
    const savedLanguage = localStorage.getItem("alamano_language");
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (newLanguage === "es" || newLanguage === "en") {
      setLanguage(newLanguage);
      localStorage.setItem("alamano_language", newLanguage);
    }
  };

  const t = (key, params = {}) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback al español si no se encuentra la traducción
        value = translations.es;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Retorna la clave si no se encuentra traducción
          }
        }
        break;
      }
    }

    // Reemplazar parámetros en la traducción
    if (typeof value === "string" && Object.keys(params).length > 0) {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] !== undefined ? params[param] : match;
      });
    }

    return typeof value === "string" ? value : key;
  };

  const formatDate = (date, options = {}) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const finalOptions = { ...defaultOptions, ...options };
    const locale = language === "es" ? "es-ES" : "en-US";

    try {
      return dateObj.toLocaleDateString(locale, finalOptions);
    } catch (error) {
      // Fallback manual si hay problemas con toLocaleDateString
      return formatDateManual(dateObj, language);
    }
  };

  const formatDateShort = (date) => {
    return formatDate(date, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateRelative = (date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffTime = Math.abs(now - dateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return t("today");
    } else if (diffDays === 1) {
      return language === "es" ? "Ayer" : "Yesterday";
    } else if (diffDays < 7) {
      return language === "es"
        ? `Hace ${diffDays} días`
        : `${diffDays} days ago`;
    } else {
      return formatDateShort(date);
    }
  };

  const formatDateManual = (date, lang) => {
    const months =
      lang === "es"
        ? [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ]
        : [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return lang === "es"
      ? `${day} de ${month} de ${year}`
      : `${month} ${day}, ${year}`;
  };

  const getAvailableLanguages = () => [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        formatDate,
        formatDateShort,
        formatDateRelative,
        getAvailableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
