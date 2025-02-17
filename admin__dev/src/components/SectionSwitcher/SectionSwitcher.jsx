import PropTypes from "prop-types";
import { useState } from "react";
import './SectionSwitcher.css'

export default function SectionSwitcher({ sections, onActive }) {
    const letterWidth = 8.5;
    const tabSpacing = 40;
    const [activeSection, setActiveSection] = useState(sections[0]);

    const getLeftTab = sections
    .slice(0, sections.indexOf(activeSection))
    .reduce(
      (acc, section) => acc + section.length * letterWidth + tabSpacing,
      0
    );

    const handleSectionChange = (section) => {
        setActiveSection(section);
        onActive(section);
    };

    return (
        <div className="edit-switcher-block">
              <div className="sections-projects-edit">
                {sections.map((section) => (
                  <button
                    key={section}
                    className={`btn-img btn-text switcher-section-edit ${
                      activeSection === section ? "active" : ""
                    }`}
                    onClick={() => handleSectionChange(section)}
                  >
                    {section}
                  </button>
                ))}
              </div>
              <div className="wrapper-active-line">
                {activeSection && (
                  <div
                    className="active-line"
                    style={{
                      left: `${getLeftTab}px`,
                      width: `${activeSection.length * letterWidth}px`,
                    }}
                  ></div>
                )}
              </div>
              <div className="project-info-line"></div>
            </div>
    )
}

SectionSwitcher.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.string).isRequired,
    onActive: PropTypes.func.isRequired,
}