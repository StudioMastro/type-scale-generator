import { useState, useRef } from "react";
import { ChevronUp, Smartphone, Tablet, Monitor, Menu, X } from "lucide-react";
import { FontSettings } from "../types/font";
import { Unit } from "../types";

interface SiteMockupPanelProps {
  bodySettings: FontSettings;
  headingSettings: FontSettings;
  previewText: string;
  unit: Unit;
}

type DeviceSize = "mobile" | "tablet" | "desktop";

export function SiteMockupPanel({
  bodySettings,
  headingSettings,
  previewText,
}: SiteMockupPanelProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop");
  const contentRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Testo di esempio se non viene fornito un testo personalizzato
  const sampleText =
    previewText ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const shortText = previewText || "Lorem ipsum dolor sit amet";

  // Stili comuni
  const bodyStyle = {
    fontFamily: bodySettings.family,
    fontSize: "16px", // Dimensione di base fissa
    fontWeight: bodySettings.weight,
    lineHeight: bodySettings.lineHeight,
    letterSpacing: bodySettings.letterSpacing,
    color: bodySettings.color,
    textTransform: bodySettings.textTransform || "none",
    fontStyle: bodySettings.fontStyle || "normal",
    textDecoration: bodySettings.textDecoration || "none",
    textAlign: bodySettings.textAlign || "left",
  };

  const headingStyle = {
    fontFamily:
      headingSettings.family === "inherit"
        ? bodySettings.family
        : headingSettings.family,
    fontWeight:
      headingSettings.weight === "inherit"
        ? bodySettings.weight
        : headingSettings.weight,
    lineHeight:
      headingSettings.lineHeight === "inherit"
        ? bodySettings.lineHeight
        : headingSettings.lineHeight,
    letterSpacing:
      headingSettings.letterSpacing === "inherit"
        ? bodySettings.letterSpacing
        : headingSettings.letterSpacing,
    color:
      headingSettings.color === "inherit"
        ? bodySettings.color
        : headingSettings.color,
    textTransform:
      headingSettings.textTransform === "inherit"
        ? bodySettings.textTransform
        : headingSettings.textTransform || "none",
    fontStyle:
      headingSettings.fontStyle === "inherit"
        ? bodySettings.fontStyle
        : headingSettings.fontStyle || "normal",
    textDecoration:
      headingSettings.textDecoration === "inherit"
        ? bodySettings.textDecoration
        : headingSettings.textDecoration || "none",
    textAlign:
      headingSettings.textAlign === "inherit"
        ? bodySettings.textAlign
        : headingSettings.textAlign || "left",
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollTop);
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Determina la larghezza del contenitore in base al dispositivo selezionato
  const getContainerWidth = () => {
    switch (deviceSize) {
      case "mobile":
        return "w-[375px]";
      case "tablet":
        return "w-[768px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  // Scala il font size in base al dispositivo
  const getResponsiveFontSize = (baseSize: string, multiplier: number = 1) => {
    const size = parseInt(baseSize);
    switch (deviceSize) {
      case "mobile":
        return `${Math.max(size * 0.85 * multiplier, 12)}px`;
      case "tablet":
        return `${Math.max(size * 0.9 * multiplier, 14)}px`;
      case "desktop":
      default:
        return `${size * multiplier}px`;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Barra degli strumenti responsive */}
      <div className="flex-none bg-white border-b border-gray-200 p-3 flex items-center justify-center gap-2">
        <button
          onClick={() => setDeviceSize("desktop")}
          className={`p-2 rounded-md flex items-center ${
            deviceSize === "desktop"
              ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
          title="Desktop view (full width)"
        >
          <Monitor className="w-5 h-5" />
          {deviceSize === "desktop" && (
            <span className="ml-1.5 text-sm font-medium">Desktop</span>
          )}
        </button>
        <button
          onClick={() => setDeviceSize("tablet")}
          className={`p-2 rounded-md flex items-center ${
            deviceSize === "tablet"
              ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
          title="Tablet view (768px)"
        >
          <Tablet className="w-5 h-5" />
          {deviceSize === "tablet" && (
            <span className="ml-1.5 text-sm font-medium">Tablet</span>
          )}
        </button>
        <button
          onClick={() => setDeviceSize("mobile")}
          className={`p-2 rounded-md flex items-center ${
            deviceSize === "mobile"
              ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
          title="Mobile view (375px)"
        >
          <Smartphone className="w-5 h-5" />
          {deviceSize === "mobile" && (
            <span className="ml-1.5 text-sm font-medium">Mobile</span>
          )}
        </button>
      </div>

      {/* Contenitore responsive */}
      <div className="flex-1 overflow-hidden flex justify-center bg-gray-100">
        <div
          className={`${getContainerWidth()} h-full bg-white shadow-md transition-all duration-300`}
        >
          {/* Contenuto del sito */}
          <div
            ref={contentRef}
            className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent"
            onScroll={handleScroll}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <div
                    style={{
                      ...headingStyle,
                      fontSize: getResponsiveFontSize("20px"),
                    }}
                    className="font-bold"
                  >
                    Brand Name
                  </div>

                  {/* Menu desktop - visibile solo su tablet e desktop */}
                  <div
                    className={
                      deviceSize === "mobile"
                        ? "hidden"
                        : "hidden md:flex space-x-6"
                    }
                  >
                    <div
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("14px"),
                      }}
                      className="text-sm"
                    >
                      Home
                    </div>
                    <div
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("14px"),
                      }}
                      className="text-sm"
                    >
                      About
                    </div>
                    <div
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("14px"),
                      }}
                      className="text-sm"
                    >
                      Services
                    </div>
                    <div
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("14px"),
                      }}
                      className="text-sm"
                    >
                      Contact
                    </div>
                  </div>

                  {/* Icona hamburger - visibile solo su mobile */}
                  <div
                    className={deviceSize === "mobile" ? "block" : "md:hidden"}
                  >
                    <button
                      className={`p-2 rounded-md transition-colors ${
                        mobileMenuOpen ? "bg-gray-100" : "hover:bg-gray-100"
                      }`}
                      aria-label="Menu"
                      onClick={toggleMobileMenu}
                    >
                      {mobileMenuOpen ? (
                        <X className="w-6 h-6 text-gray-800" />
                      ) : (
                        <Menu className="w-6 h-6 text-gray-800" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Mobile menu dropdown */}
                {mobileMenuOpen && deviceSize === "mobile" && (
                  <div className="py-2 border-t mt-2 border-gray-100 animate-slide-in-from-top bg-white shadow-md">
                    <div
                      className="py-3 px-2 rounded hover:bg-gray-50 transition-colors font-medium"
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("16px"),
                      }}
                    >
                      Home
                    </div>
                    <div
                      className="py-3 px-2 rounded hover:bg-gray-50 transition-colors font-medium"
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("16px"),
                      }}
                    >
                      About
                    </div>
                    <div
                      className="py-3 px-2 rounded hover:bg-gray-50 transition-colors font-medium"
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("16px"),
                      }}
                    >
                      Services
                    </div>
                    <div
                      className="py-3 px-2 rounded hover:bg-gray-50 transition-colors font-medium"
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("16px"),
                      }}
                    >
                      Contact
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gray-50 py-12 md:py-20">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h1
                  style={{
                    ...headingStyle,
                    fontSize: getResponsiveFontSize(
                      "48px",
                      deviceSize === "mobile" ? 0.7 : 1
                    ),
                    maxWidth: "42rem",
                    margin: "0 auto 1.5rem auto",
                    lineHeight: "1.2",
                    textAlign: "center",
                  }}
                  className="mb-6"
                >
                  {shortText}
                </h1>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: getResponsiveFontSize("16px"),
                    maxWidth: "42rem",
                    margin: "0 auto 2rem auto",
                    textAlign: "center",
                  }}
                  className="mb-8"
                >
                  {sampleText}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    style={{
                      ...bodyStyle,
                      fontSize: getResponsiveFontSize("16px"),
                      fontWeight: "600",
                      color: "white",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Get Started
                  </button>
                  <button
                    style={{
                      ...bodyStyle,
                      fontSize: getResponsiveFontSize("16px"),
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="py-12 md:py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h2
                  style={{
                    ...headingStyle,
                    fontSize: getResponsiveFontSize(
                      "40px",
                      deviceSize === "mobile" ? 0.8 : 1
                    ),
                  }}
                  className="text-center mb-12"
                >
                  Our Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center mb-8 sm:mb-0">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                      </div>
                      <h3
                        style={{
                          ...headingStyle,
                          fontSize: getResponsiveFontSize("24px"),
                        }}
                        className="mb-4"
                      >
                        Feature {i}
                      </h3>
                      <p
                        style={{
                          ...bodyStyle,
                          fontSize: getResponsiveFontSize("16px"),
                        }}
                      >
                        {sampleText.substring(0, 120)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 py-12 md:py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h2
                  style={{
                    ...headingStyle,
                    fontSize: getResponsiveFontSize(
                      "40px",
                      deviceSize === "mobile" ? 0.8 : 1
                    ),
                  }}
                  className="text-center mb-12"
                >
                  Pricing Plans
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {["Basic", "Pro", "Enterprise"].map((plan, index) => (
                    <div
                      key={plan}
                      className={`bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 ${
                        index === 1
                          ? "relative border-indigo-200 shadow-md mb-10 sm:mb-0"
                          : "mb-8 sm:mb-0"
                      }`}
                    >
                      {index === 1 && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          POPULAR
                        </div>
                      )}
                      <h3
                        style={{
                          ...headingStyle,
                          fontSize: getResponsiveFontSize("28px"),
                        }}
                        className="mb-4"
                      >
                        {plan}
                      </h3>
                      <div
                        style={{
                          ...headingStyle,
                          fontSize: getResponsiveFontSize(
                            "48px",
                            deviceSize === "mobile" ? 0.8 : 1
                          ),
                        }}
                        className="mb-6"
                      >
                        ${plan === "Basic" ? "9" : plan === "Pro" ? "29" : "99"}
                        <span
                          style={{
                            ...bodyStyle,
                            fontSize: getResponsiveFontSize("14px"),
                          }}
                          className="text-sm"
                        >
                          /month
                        </span>
                      </div>
                      <ul className="mb-8 space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <li
                            key={i}
                            style={{
                              ...bodyStyle,
                              fontSize: getResponsiveFontSize("16px"),
                            }}
                            className="flex items-center"
                          >
                            <span className="w-5 h-5 bg-green-100 rounded-full mr-3 flex-shrink-0"></span>
                            Feature {i}
                          </li>
                        ))}
                      </ul>
                      <button
                        style={{
                          ...bodyStyle,
                          fontSize: getResponsiveFontSize("16px"),
                          fontWeight: "600",
                          color: index === 1 ? "white" : undefined,
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className={`w-full py-3 rounded-md transition-colors ${
                          index === 1
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        Choose Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-12 md:py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h2
                  style={{
                    ...headingStyle,
                    fontSize: getResponsiveFontSize(
                      "40px",
                      deviceSize === "mobile" ? 0.8 : 1
                    ),
                  }}
                  className="text-center mb-12"
                >
                  What Our Clients Say
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="p-6 md:p-8 bg-gray-50 rounded-lg mb-8 sm:mb-0"
                    >
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                          <h4
                            style={{
                              ...headingStyle,
                              fontSize: getResponsiveFontSize("20px"),
                            }}
                            className="mb-1"
                          >
                            Client Name {i}
                          </h4>
                          <p
                            style={{
                              ...bodyStyle,
                              fontSize: getResponsiveFontSize("14px"),
                            }}
                            className="text-gray-600"
                          >
                            Company {i}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          ...bodyStyle,
                          fontSize: getResponsiveFontSize("16px"),
                        }}
                        className="text-lg"
                      >
                        "{sampleText}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 py-12">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h4
                      style={{
                        ...headingStyle,
                        fontSize: getResponsiveFontSize("20px"),
                        color: "white",
                      }}
                      className="mb-4"
                    >
                      Brand Name
                    </h4>
                    <p
                      style={{
                        ...bodyStyle,
                        fontSize: getResponsiveFontSize("14px"),
                        color: "rgba(255,255,255,0.7)",
                      }}
                      className="mb-4"
                    >
                      {sampleText.substring(0, 100)}
                    </p>
                  </div>
                  {["Products", "Company", "Resources"].map((category) => (
                    <div key={category}>
                      <h4
                        style={{
                          ...headingStyle,
                          fontSize: getResponsiveFontSize("20px"),
                          color: "white",
                        }}
                        className="mb-4"
                      >
                        {category}
                      </h4>
                      <ul className="space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                          <li key={i}>
                            <a
                              href="#"
                              style={{
                                ...bodyStyle,
                                fontSize: getResponsiveFontSize("14px"),
                                color: "rgba(255,255,255,0.7)",
                              }}
                              className="hover:text-white"
                            >
                              Link {i}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 mt-12 pt-8">
                  <p
                    style={{
                      ...bodyStyle,
                      fontSize: getResponsiveFontSize("14px"),
                      color: "rgba(255,255,255,0.5)",
                    }}
                    className="text-sm text-center"
                  >
                    © 2023 Brand Name. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsante "Torna su" */}
      {scrollPosition > 300 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-20"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
