import { useState, useRef } from "react";
import styles from "./WorksSection.module.css";
import macImage from "../image/mac.png";

/*
  Drag & drop project cards onto the MacBook screen.
  - First drop loads project info into the MacBook screen.
  - Clicking the loaded slot expands into a browser-window mockup
    (red/yellow/green traffic lights + screenshot or description).
*/

const PROJECTS = {
  asiana: {
    tag: "Web Redesign",
    title: "아시아나 홈페이지",
    meta: "HTML · CSS · JS · Glassmorphism · 반응형",
    desc: "아시아나항공 공식 홈페이지를 글래스모피즘 스타일로 재해석한 반응형 웹사이트 리디자인 프로젝트. 프로모션 배너 슬라이더, 챗봇 애니메이션, 목적지 선택 모달 등 핵심 인터랙션을 구현했습니다.",
    icon: "✈️",
    label: "Asiana Airlines",
    screenshot: null, // put an image URL here for the expanded browser window
    siteName: "ASIANA AIRLINES",
  },
  ticket: {
    tag: "React App",
    title: "대학로티켓닷컴",
    meta: "React · CSS Modules · React Router · 팀 프로젝트",
    desc: "2030대 첫 공연 관람객을 타깃으로 한 대학로 공연 티켓 플랫폼 UX/UI 리디자인. 바텀시트 캘린더, 예약 완료 페이지, 마이페이지 등 핵심 플로우를 구현했습니다.",
    icon: "🎭",
    label: "대학로티켓",
    screenshot: null,
    siteName: "DAEHAKRO TICKET",
  },
  crocs: {
    tag: "Mobile Web",
    title: "Crocs Korea",
    meta: "React · SCSS · Neumorphism · 모바일 퍼스트",
    desc: "크록스 코리아 공식 웹사이트의 모바일 버전을 뉴모피즘 스타일로 재해석. SVG 커스텀 패턴, 인터랙티브 UI 컴포넌트, SCSS 아키텍처 중심의 프론트엔드 개발을 진행했습니다.",
    icon: "👟",
    label: "Crocs Korea",
    screenshot: null,
    siteName: "CROCS KOREA",
  },
};

export default function WorksSection() {
  const [loaded, setLoaded] = useState(null); // project key currently in the slot
  const [browserOpen, setBrowserOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const dragRef = useRef(null);

  const handleDragStart = (key) => {
    dragRef.current = key;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (dragRef.current) {
      setLoaded(dragRef.current);
      setBrowserOpen(false);
      dragRef.current = null;
    }
  };

  const handleSlotClick = () => {
    if (loaded) setBrowserOpen(true);
  };

  const project = loaded ? PROJECTS[loaded] : null;

  return (
    <section className={styles.dragSection}>
      <div className={styles.brackets}>
        <span className={styles.bracket}>[</span>

        <div className={styles.macbookWrapper}>
          {/* 2. 맥북 전체 프레임 역할을 할 컨테이너 */}
          <div className={styles.macbookContainer}>
            {/* 배경으로 깔릴 맥북 이미지 */}
            <img src={macImage} alt="Macbook Frame" className={styles.macbookImg} />
            
            {/* 이미지 내부 모니터 위치에 정확히 겹쳐질 스크린 레이어 */}
            <div className={styles.macbookScreenOverlay}>
              {!project ? (
                <div
                  className={`${styles.dropSlot} ${dragOver ? styles.dropSlotDragOver : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <span className={styles.dropSlotIcon}>!</span>
                  <span>Blank</span>
                </div>
              ) : (
                <div
                  className={styles.loadedSlot}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleSlotClick}
                >
                  <span className={styles.loadedTag}>{project.tag}</span>
                  <span className={styles.loadedTitle}>{project.title}</span>
                  <span className={styles.loadedMeta}>{project.meta}</span>
                  <span className={styles.loadedOpen}>click to open ↗</span>
                </div>
              )}
            </div>
          </div>
          {/* expanded browser window overlay */}
          {browserOpen && project && (
            <div className={styles.browserOverlay} onClick={() => setBrowserOpen(false)}>
              <div className={styles.browserWindow} onClick={(e) => e.stopPropagation()}>
                <div className={styles.browserTopBar}>
                  <span className={`${styles.trafficLight} ${styles.trafficLightRed}`} />
                  <span className={`${styles.trafficLight} ${styles.trafficLightYellow}`} />
                  <span className={`${styles.trafficLight} ${styles.trafficLightGreen}`} />
                  <span className={styles.browserTitle}>{project.siteName}</span>
                  <button className={styles.browserClose} onClick={() => setBrowserOpen(false)}>
                    ✕
                  </button>
                </div>
                <div className={styles.browserContent}>
                  {project.screenshot ? (
                    <img
                      src={project.screenshot}
                      alt={project.title}
                      className={styles.browserScreenshot}
                    />
                  ) : (
                    <div className={styles.browserPlaceholder}>
                      <p className={styles.modalTag}>{project.tag}</p>
                      <h2 className={styles.modalTitle}>{project.title}</h2>
                      <p className={styles.modalMeta}>{project.meta}</p>
                      <p className={styles.modalDesc}>{project.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <span className={styles.bracket}>]</span>
      </div>

      {/* drag items */}
      <div className={styles.itemsRow}>
        {Object.entries(PROJECTS).map(([key, p]) => (
          <div
            key={key}
            className={styles.dragItem}
            draggable
            onDragStart={() => handleDragStart(key)}
          >
            <div className={styles.tooltip}>
              <strong className={styles.tooltipStrong}>{p.title}</strong>
              속성: {p.meta.split("·")[1]?.trim() || p.meta}
              <span className={styles.tooltipLv}>Lv.2</span>
            </div>
            <div className={styles.dragItemImg}>{p.icon}</div>
            <span className={styles.dragItemLabel}>{p.label}</span>
          </div>
        ))}
      </div>

      <p className={styles.hint}>Drag the product to blank, then click to open !</p>
    </section>
  );
}
