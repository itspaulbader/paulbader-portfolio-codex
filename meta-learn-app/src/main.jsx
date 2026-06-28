import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const moods = [
  { id: "stressed", label: "Stressed", tone: "#e99c3a", expression: "pinch" },
  { id: "anxious", label: "Anxious", tone: "#7fb8d5", expression: "drop" },
  { id: "flat", label: "Flat", tone: "#e8c865", expression: "flat" },
  { id: "angry", label: "Angry", tone: "#cf796e", expression: "heat" },
  { id: "tired", label: "Tired", tone: "#a394c7", expression: "sleep" }
];

const exercises = [
  {
    id: "focus-dot",
    title: "Focus Dot",
    format: "Audio",
    length: "2 min",
    level: "Beginner",
    match: "Best match",
    description: "A gentle breathing anchor when your thoughts are moving too fast.",
    gradient: "linear-gradient(145deg, #fff4dc, #f2bb56)",
    accent: "#e89a2e",
    pattern: "rings"
  },
  {
    id: "noise-below",
    title: "The Noise Below",
    format: "Text",
    length: "2 min",
    level: "Easy",
    match: "Helpful next",
    description: "Name the pattern beneath the thought without wrestling with it.",
    gradient: "linear-gradient(145deg, #ffe6df, #d48378)",
    accent: "#cf796e",
    pattern: "field"
  },
  {
    id: "room-scan",
    title: "Room Scan",
    format: "Interactive",
    length: "3 min",
    level: "Grounding",
    match: "Low effort",
    description: "Use nearby objects to bring attention back into the room.",
    gradient: "linear-gradient(145deg, #eaf5fb, #69a9c9)",
    accent: "#256fae",
    pattern: "tiles"
  },
  {
    id: "evening-release",
    title: "Evening Release",
    format: "Audio",
    length: "4 min",
    level: "Wind down",
    match: "For later",
    description: "Close the day with a slower guided release.",
    gradient: "linear-gradient(145deg, #e6f0ea, #7ea79a)",
    accent: "#7ea79a",
    pattern: "wave"
  }
];

const flow = [
  { id: "onboarding", title: "Onboarding", detail: "Personal intent, not a long setup." },
  { id: "home", title: "Home", detail: "One check-in and one clear next action." },
  { id: "matching", title: "Matching", detail: "A soft in-between state while recommendations form." },
  { id: "recommendations", title: "Recommendations", detail: "Personalized but not crowded." },
  { id: "detail", title: "Exercise Detail", detail: "Context, prep, and a confident start." },
  { id: "session", title: "Active Session", detail: "Focused, immersive breathing flow." },
  { id: "complete", title: "Completion", detail: "Reflection and small reward loop." },
  { id: "progress", title: "Progress", detail: "Habit feedback without dashboard clutter." }
];

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [intent, setIntent] = useState("Focus");
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [breathStep, setBreathStep] = useState(0);
  const [reflection, setReflection] = useState(4);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  function go(next) {
    setPaywallOpen(false);
    setScreen(next);
    setTransitionKey((key) => key + 1);
  }

  function chooseMood(mood) {
    setSelectedMood(mood);
    go("matching");
  }

  function chooseExercise(exercise) {
    setSelectedExercise(exercise);
    go("detail");
  }

  useEffect(() => {
    if (screen !== "matching") return undefined;
    const timer = window.setTimeout(() => go("recommendations"), 1300);
    return () => window.clearTimeout(timer);
  }, [screen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBreathStep((step) => (step + 1) % breathStates.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const activeView = useMemo(() => {
    const props = {
      go,
      intent,
      setIntent,
      moods,
      selectedMood,
      chooseMood,
      exercises,
      selectedExercise,
      chooseExercise,
      breathStep,
      setBreathStep,
      reflection,
      setReflection,
      setPaywallOpen
    };

    const views = {
      onboarding: <Onboarding {...props} />,
      home: <Home {...props} />,
      matching: <Matching {...props} />,
      recommendations: <Recommendations {...props} />,
      detail: <ExerciseDetail {...props} />,
      session: <Session {...props} />,
      complete: <Complete {...props} />,
      progress: <Progress {...props} />,
      explore: <Explore {...props} />
    };
    return views[screen];
  }, [screen, intent, selectedMood, selectedExercise, breathStep, reflection]);

  return (
    <main className="stage">
      <section className="intro" aria-label="Prototype summary">
        <p className="eyebrow">Meta Learn</p>
        <h1>Mental fitness, made quiet.</h1>
        <p>
          A native-feeling iOS prototype for check-ins, guided exercises, active
          sessions, and habit feedback.
        </p>
        <div className="introChips">
          <span>React</span>
          <span>Mobile-first</span>
          <span>Section 1</span>
        </div>
      </section>

      <PhoneFrame>
        <div className="appView" key={transitionKey}>
          {activeView}
        </div>
        <Paywall isOpen={paywallOpen} onClose={() => setPaywallOpen(false)} />
      </PhoneFrame>

      <FlowNav active={screen} onSelect={go} />
    </main>
  );
}

function PhoneFrame({ children }) {
  return (
    <section className="phoneShell" aria-label="Meta Learn phone prototype">
      <div className="phoneBezel">
        <div className="phoneScreen">
          <StatusBar />
          {children}
        </div>
      </div>
    </section>
  );
}

function StatusBar() {
  return (
    <div className="statusBar" aria-hidden="true">
      <span>1:47</span>
      <span className="dynamicIsland" />
      <span className="systemIcons">
        <span className="signalBars" />
        <span className="wifiIcon" />
        <span className="batteryIcon" />
      </span>
    </div>
  );
}

function FlowNav({ active, onSelect }) {
  return (
    <aside className="flowNav" aria-label="Prototype flow">
      <p className="navLabel">Flow</p>
      {flow.map((item, index) => (
        <button
          className={`flowStep ${active === item.id ? "active" : ""}`}
          key={item.id}
          onClick={() => onSelect(item.id)}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.title}</strong>
          <small>{item.detail}</small>
        </button>
      ))}
    </aside>
  );
}

function Onboarding({ intent, setIntent, go }) {
  const choices = [
    ["Focus", "Quiet distractions before they take over."],
    ["Stress relief", "Lower pressure with short daily resets."],
    ["Better sleep", "Build a smoother evening landing."],
    ["Confidence", "Practice trust in small moments."]
  ];

  return (
    <div className="screen onboardingScreen">
      <div className="onboardingHero">
        <Brand />
        <div className="ambientOrb">
          <span />
          <span />
          <span />
        </div>
        <h2>A calmer way to train your mind.</h2>
      </div>
      <div className="contentBlock">
        <div className="stepMeter" aria-label="Onboarding progress">
          <i className="done" />
          <i className="done" />
          <i />
          <i />
        </div>
        <p className="lead">
          Start with a short check-in. Meta Learn adapts the first exercise around
          how you feel today.
        </p>
        <div className="intentGrid">
          {choices.map(([title, copy]) => (
            <button
              className={`intentCard ${intent === title ? "selected" : ""}`}
              key={title}
              onClick={() => setIntent(title)}
            >
              <strong>{title}</strong>
              <span>{copy}</span>
            </button>
          ))}
        </div>
      </div>
      <BottomAction label="Continue" onClick={() => go("home")} />
    </div>
  );
}

function Home({ selectedMood, chooseMood, exercises, chooseExercise, go }) {
  return (
    <div className="screen scrollScreen withTabs">
      <HeaderHero variant="evening" title="Good evening" subtitle="Progress is born in small, silent moments.">
        <div className="heroStatus">
          <strong>7 Day Streak</strong>
          <span>Today complete</span>
        </div>
      </HeaderHero>

      <section className="surface rewardSurface">
        <div>
          <span className="microLabel">Today</span>
          <h3>Complete one short session</h3>
          <p>Keep the promise small. We will handle the structure.</p>
          <div className="segmentedProgress">
            <i className="filled" />
            <i className="filled" />
            <i className="filled" />
            <i />
          </div>
        </div>
        <div className="streakCoin">3</div>
      </section>

      <SectionTitle
        title="How are you feeling?"
        subtitle="Tap once and we will shape the next step."
      />
      <MoodRail selectedMood={selectedMood} onSelect={chooseMood} />

      <SectionTitle
        title="Evening wind down"
        action="Match me"
        onAction={() => go("matching")}
      />
      <ExerciseRail exercises={exercises.slice(0, 3)} onSelect={chooseExercise} />

      <SectionTitle title="You might like" />
      <ExerciseRail exercises={exercises.slice(1)} onSelect={chooseExercise} compact />
      <TabBar active="home" go={go} />
    </div>
  );
}

function Matching({ selectedMood }) {
  return (
    <div className="screen matchingScreen">
      <div className="matchOrb">
        <span />
        <span />
      </div>
      <h2>Finding a good fit</h2>
      <p>
        Matching {selectedMood.label.toLowerCase()} with short exercises that feel
        realistic right now.
      </p>
      <div className="matchCards" aria-hidden="true">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

function Recommendations({ selectedMood, exercises, chooseExercise, go }) {
  return (
    <div className="screen scrollScreen withTabs">
      <HeaderHero title={`For feeling ${selectedMood.label.toLowerCase()}`} subtitle="Three calm options, ordered by effort." onBack={() => go("home")} />
      <SectionTitle title="Recommended now" subtitle="Based on your check-in and recent sessions." />
      <div className="recommendationList">
        {exercises.slice(0, 3).map((exercise) => (
          <ExerciseRow key={exercise.id} exercise={exercise} onClick={() => chooseExercise(exercise)} />
        ))}
      </div>
      <section className="quietNote">
        <span>Why this?</span>
        <p>Short audio tends to work best when you mark yourself as {selectedMood.label.toLowerCase()}.</p>
      </section>
      <TabBar active="home" go={go} />
    </div>
  );
}

function ExerciseDetail({ selectedExercise, selectedMood, go }) {
  return (
    <div className="screen scrollScreen detailScreen">
      <button className="backButton floating" onClick={() => go("recommendations")}>Back</button>
      <ExerciseArtwork exercise={selectedExercise} hero />
      <section className="detailCopy">
        <span className="microLabel">Recommended for {selectedMood.label.toLowerCase()}</span>
        <h2>{selectedExercise.title}</h2>
        <p>{selectedExercise.description}</p>
        <div className="metadata">
          <span>{selectedExercise.format}</span>
          <span>{selectedExercise.length}</span>
          <span>{selectedExercise.level}</span>
        </div>
      </section>
      <section className="prepList">
        <h3>Get ready</h3>
        {["Find a comfortable seated position", "Soften your gaze or close your eyes", "Follow the circle and let it count for you"].map((item, index) => (
          <div className="prepItem" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </section>
      <BottomAction label="Begin" onClick={() => go("session")} />
    </div>
  );
}

const breathStates = [
  { label: "Inhale", copy: "Breathe in slowly", progress: "35%" },
  { label: "Hold", copy: "Let the breath settle", progress: "58%" },
  { label: "Exhale", copy: "Release the pressure", progress: "82%" }
];

function Session({ selectedExercise, breathStep, setBreathStep, go }) {
  const breath = breathStates[breathStep % breathStates.length];

  return (
    <div className="screen sessionScreen" style={{ "--session-progress": breath.progress, "--exercise-accent": selectedExercise.accent }}>
      <div className="sessionTop">
        <button className="backButton" onClick={() => go("detail")}>Back</button>
        <div>
          <strong>{selectedExercise.title}</strong>
          <span>1:22 remaining</span>
        </div>
        <span />
      </div>
      <div className="sessionProgress"><span /></div>
      <div className="breathingField">
        <div className="breathHalo one" />
        <div className="breathHalo two" />
        <button className="breathOrb" onClick={() => setBreathStep((step) => (step + 1) % breathStates.length)}>
          <strong>{breath.label}</strong>
          <span>{breath.copy}</span>
        </button>
      </div>
      <button className="pauseButton" onClick={() => setBreathStep((step) => (step + 1) % breathStates.length)} aria-label="Pause or advance breath step">
        <span />
      </button>
      <button className="finishButton" onClick={() => go("complete")}>Finish session</button>
    </div>
  );
}

function Complete({ reflection, setReflection, go }) {
  return (
    <div className="screen completeScreen">
      <div className="completionHero">
        <div className="completionMark" />
        <span className="microLabel">Today complete</span>
        <h2>Nice work.</h2>
        <p>You kept the session short enough to finish. That is the habit.</p>
      </div>
      <section className="reflectionPanel">
        <strong>How do you feel now?</strong>
        <div className="reflectionScale">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              className={reflection === value ? "selected" : ""}
              key={value}
              onClick={() => setReflection(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </section>
      <BottomAction label="Save progress" onClick={() => go("progress")} />
    </div>
  );
}

function Progress({ setPaywallOpen, go }) {
  return (
    <div className="screen scrollScreen withTabs progressScreen">
      <HeaderHero variant="green" title="7 day streak" subtitle="You are most consistent when sessions stay under four minutes." />
      <SectionTitle title="This week" subtitle="A soft record, not a scoreboard." action="Programs" onAction={() => setPaywallOpen(true)} />
      <div className="weekGrid">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <span className={index < 5 ? "done" : ""} key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <section className="insightList">
        <Insight title="Favorite format" copy="Short audio sessions before dinner." value="62%" />
        <Insight title="Best time" copy="You complete more often after 18:00." value="18:40" />
        <Insight title="Next suggestion" copy="Try Evening Release after tomorrow’s check-in." value="4m" />
      </section>
      <TabBar active="progress" go={go} />
    </div>
  );
}

function Explore({ exercises, chooseExercise, go }) {
  return (
    <div className="screen scrollScreen withTabs">
      <HeaderHero title="Exercises" subtitle="A quiet library for focus, stress, sleep, and resilience." />
      <SectionTitle title="Recently helpful" subtitle="Exercises shaped by your last check-ins." />
      <div className="recommendationList">
        {exercises.map((exercise) => (
          <ExerciseRow key={exercise.id} exercise={exercise} onClick={() => chooseExercise(exercise)} />
        ))}
      </div>
      <TabBar active="explore" go={go} />
    </div>
  );
}

function HeaderHero({ title, subtitle, children, variant = "blue", onBack }) {
  return (
    <header className={`headerHero ${variant}`}>
      {onBack && <button className="backButton" onClick={onBack}>Back</button>}
      <div className="heroGlow" />
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </header>
  );
}

function Brand() {
  return (
    <div className="brandLockup">
      <span>ML</span>
      <strong>Meta Learn</strong>
    </div>
  );
}

function SectionTitle({ title, subtitle, action, onAction }) {
  return (
    <div className="sectionTitle">
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <button onClick={onAction}>{action}</button>}
    </div>
  );
}

function MoodRail({ selectedMood, onSelect }) {
  return (
    <div className="moodRail">
      {moods.map((mood) => (
        <button
          className={`moodPill ${selectedMood.id === mood.id ? "selected" : ""}`}
          key={mood.id}
          onClick={() => onSelect(mood)}
          style={{ "--mood": mood.tone }}
        >
          <span className={`moodFace ${mood.expression}`}>
            <i />
            <i />
            <b />
          </span>
          <strong>{mood.label}</strong>
        </button>
      ))}
    </div>
  );
}

function ExerciseRail({ exercises, onSelect, compact = false }) {
  return (
    <div className={`exerciseRail ${compact ? "compact" : ""}`}>
      {exercises.map((exercise) => (
        <button className="exerciseCard" key={exercise.id} onClick={() => onSelect(exercise)}>
          <ExerciseArtwork exercise={exercise} />
          <strong>{exercise.title}</strong>
          <span>{exercise.format} • {exercise.length}</span>
        </button>
      ))}
    </div>
  );
}

function ExerciseArtwork({ exercise, hero = false }) {
  return (
    <div
      className={`exerciseArtwork ${exercise.pattern} ${hero ? "hero" : ""}`}
      style={{ "--art-gradient": exercise.gradient, "--art-accent": exercise.accent }}
      aria-hidden="true"
    >
      <span className="artCore" />
      <span className="artDetail one" />
      <span className="artDetail two" />
    </div>
  );
}

function ExerciseRow({ exercise, onClick }) {
  return (
    <button className="exerciseRow" onClick={onClick}>
      <ExerciseArtwork exercise={exercise} />
      <span className="exerciseRowCopy">
        <small>{exercise.match}</small>
        <strong>{exercise.title}</strong>
        <em>{exercise.format} • {exercise.length} • {exercise.description}</em>
      </span>
      <span className="rowArrow">›</span>
    </button>
  );
}

function BottomAction({ label, onClick }) {
  return (
    <div className="bottomAction">
      <button className="primaryButton" onClick={onClick}>{label}</button>
    </div>
  );
}

function TabBar({ active, go }) {
  return (
    <nav className="tabBar" aria-label="Meta Learn app navigation">
      <button className={active === "home" ? "active" : ""} onClick={() => go("home")}>
        <TabIcon type="home" />
        <span>Home</span>
      </button>
      <button className={active === "explore" ? "active" : ""} onClick={() => go("explore")}>
        <TabIcon type="explore" />
        <span>Exercises</span>
      </button>
      <button className={active === "progress" ? "active" : ""} onClick={() => go("progress")}>
        <TabIcon type="progress" />
        <span>Progress</span>
      </button>
    </nav>
  );
}

function TabIcon({ type }) {
  return <i className={`tabIcon ${type}`} aria-hidden="true" />;
}

function Insight({ title, copy, value }) {
  return (
    <div className="insightItem">
      <span>
        <strong>{title}</strong>
        <small>{copy}</small>
      </span>
      <b>{value}</b>
    </div>
  );
}

function Paywall({ isOpen, onClose }) {
  return (
    <div className={`paywallSheet ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
      <div className="sheetHandle" />
      <span className="microLabel">Premium</span>
      <h2>Go deeper with guided programs.</h2>
      <p>Unlock longer courses, saved favorites, and weekly mood insights after your first free week.</p>
      <button className="primaryButton" onClick={onClose}>Start free week</button>
      <button className="secondaryButton" onClick={onClose}>Not now</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
