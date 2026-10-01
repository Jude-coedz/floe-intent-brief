"use client";

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { baseUsageRows, intentOptions, type IntentKey } from "@/data/session";
import { ArrowLeft, ArrowRight, Check, Rotate, Spark } from "./icons";

type View = "intro" | "demo" | "result";
type DemoStep = "show" | "question" | "adapted";

function Header({ view }: { view: View }) {
  const step = view === "intro" ? 1 : view === "demo" ? 2 : 3;

  return (
    <header className="site-header">
      <div className="wordmark">
        <span>floe</span>
        <i />
        <strong>intent loop concept</strong>
      </div>

      <div className="header-progress" aria-label={"Step " + step + " of 3"}>
        <span>{step} / 3</span>
        <div>{[1, 2, 3].map((item) => <i key={item} className={item <= step ? "on" : ""} />)}</div>
      </div>
    </header>
  );
}

function Intro({ start }: { start: () => void }) {
  return (
    <section className="intro-page">
      <div className="intro-copy">
        <span className="overline">A PRODUCT IDEA FOR FLOE</span>
        <h1>Make the demo learn while it teaches.</h1>
        <p>
          Floe already adapts to what a buyer asks. This concept adds one small interaction at the moment
          of interest: ask what they are actually trying to validate, then change the demo immediately.
        </p>

        <div className="idea-sequence">
          <div><span>1</span><strong>Buyer asks about a feature</strong></div>
          <ArrowRight size={15} />
          <div><span>2</span><strong>Floe asks one contextual question</strong></div>
          <ArrowRight size={15} />
          <div><span>3</span><strong>The next screen changes around the answer</strong></div>
        </div>

        <button className="primary-button" onClick={start}>
          Try the 45-second flow <ArrowRight size={16} />
        </button>
      </div>

      <aside className="idea-preview">
        <div className="preview-browser">
          <div className="browser-top"><i /><i /><i /><span>meterly.app</span></div>
          <div className="preview-content">
            <span className="mini-label">USAGE BILLING</span>
            <h2>$6,460</h2>
            <p>Projected month-end spend</p>
            <div className="mini-chart">
              {[28, 36, 31, 48, 55, 63, 71, 78, 86].map((height, i) => <i key={i} style={{height: height + "%"}} />)}
            </div>
          </div>
        </div>

        <div className="floe-card">
          <div className="floe-card-head"><span className="floe-dot">f</span><strong>Floe</strong></div>
          <p>Quick check so I show you the right part. What are you trying to validate?</p>
          <div className="preview-options">
            <span>Forecast monthly spend</span>
            <span>Bill customers accurately</span>
            <span>Control overages</span>
          </div>
        </div>
      </aside>
    </section>
  );
}

function MeterlyShell({ step, intent }: { step: DemoStep; intent: IntentKey | null }) {
  const selected = useMemo(
    () => intentOptions.find((option) => option.key === intent) ?? null,
    [intent]
  );

  return (
    <section className="product-window">
      <header className="product-header">
        <div className="product-brand"><span>m</span><strong>Meterly</strong></div>
        <nav><span>Overview</span><span>Customers</span><span className="active">Usage</span><span>Billing</span></nav>
        <div className="user-chip">JL</div>
      </header>

      <div className="product-body">
        <div className="product-title">
          <div>
            <span>{selected && step === "adapted" ? "LIVE DEMO · ADAPTED" : "USAGE BILLING"}</span>
            <h2>{selected && step === "adapted" ? selected.screenTitle : "Usage overview"}</h2>
            <p>{selected && step === "adapted" ? selected.screenDescription : "Track metered usage and projected charges before invoices are created."}</p>
          </div>
          <button type="button">This month</button>
        </div>

        <AnimatePresence mode="wait">
          {selected && step === "adapted" ? (
            <motion.div key={selected.key} className="adapted-screen" initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} transition={{duration:.22}}>
              <div className="metric-row">
                <div><span>{selected.primaryMetric}</span><strong>{selected.primaryValue}</strong></div>
                <div><span>{selected.secondaryMetric}</span><strong>{selected.secondaryValue}</strong></div>
              </div>

              <div className="detail-table">
                <div className="table-heading"><strong>{selected.detailTitle}</strong><span>Current period</span></div>
                {selected.detailRows.map((row) => (
                  <div className="detail-row" key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>
                ))}
              </div>

              <div className="route-note"><Check size={14} /><span>Demo route changed because of your answer.</span></div>
            </motion.div>
          ) : (
            <motion.div key="usage" className="usage-screen" initial={{opacity:0}} animate={{opacity:1}}>
              <div className="metric-row three">
                <div><span>Metered events</span><strong>1.2M</strong></div>
                <div><span>Projected spend</span><strong>$6,460</strong></div>
                <div><span>Active meters</span><strong>3</strong></div>
              </div>

              <div className="usage-table">
                <div className="usage-head"><span>Meter</span><span>Volume</span><span>Rate</span><span>Projected</span></div>
                {baseUsageRows.map((row) => (
                  <div className="usage-row" key={row.meter}>
                    <strong>{row.meter}</strong><span>{row.volume}</span><span>{row.rate}</span><strong>{row.projected}</strong>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FloePanel({
  step,
  intent,
  ask,
  choose,
  finish,
}: {
  step: DemoStep;
  intent: IntentKey | null;
  ask: () => void;
  choose: (intent: IntentKey) => void;
  finish: () => void;
}) {
  const selected = intentOptions.find((option) => option.key === intent) ?? null;

  return (
    <aside className="floe-panel">
      <div className="panel-head">
        <div><span className="floe-logo">f</span><div><strong>Floe</strong><small>Live product demo</small></div></div>
        <span className="live-state"><i /> live</span>
      </div>

      <div className="conversation">
        <div className="buyer-message">
          <span>You</span>
          <p>Can you show me how usage billing works?</p>
        </div>

        <div className="floe-message">
          <span>Floe</span>
          <p>
            Meterly tracks metered events, applies the rate for each meter, and shows projected charges
            before an invoice is created. I’ve opened the usage view so you can see the current month.
          </p>
        </div>

        {step === "show" && (
          <motion.div className="guide-box" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
            <span>THE IDEA STARTS HERE</span>
            <p>The buyer is clearly interested in usage billing. Instead of guessing why, Floe asks one small question before going deeper.</p>
            <button className="panel-button" onClick={ask}>Ask the contextual question <ArrowRight size={15} /></button>
          </motion.div>
        )}

        {step === "question" && (
          <motion.div className="intent-question" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
            <span>Floe</span>
            <h3>Quick check so I show you the right part. What are you trying to validate?</h3>
            <div className="intent-options">
              {intentOptions.map((option) => (
                <button key={option.key} onClick={() => choose(option.key)}>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "adapted" && selected && (
          <motion.div className="adapted-message" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
            <span>Floe</span>
            <p>{selected.floeReply}</p>

            <div className="learned-chip">
              <span>What this clarified</span>
              <strong>{selected.learned}</strong>
            </div>

            <button className="panel-button" onClick={finish}>See why this matters <ArrowRight size={15} /></button>
          </motion.div>
        )}
      </div>
    </aside>
  );
}

function Demo({ back, finish }: { back: () => void; finish: (intent: IntentKey) => void }) {
  const [step, setStep] = useState<DemoStep>("show");
  const [intent, setIntent] = useState<IntentKey | null>(null);

  function choose(nextIntent: IntentKey) {
    setIntent(nextIntent);
    setStep("adapted");
  }

  return (
    <section className="demo-page">
      <div className="demo-intro">
        <div>
          <span className="overline">YOU ARE THE BUYER</span>
          <h1>Ask. Clarify. Adapt.</h1>
        </div>
        <p>There is only one thing to do at each point. Follow the Floe panel on the right and watch the product view respond.</p>
      </div>

      <div className="demo-steps">
        <span className={step === "show" ? "active" : "done"}>1 · Show the answer</span>
        <span className={step === "question" ? "active" : step === "adapted" ? "done" : ""}>2 · Clarify the intent</span>
        <span className={step === "adapted" ? "active" : ""}>3 · Change the route</span>
      </div>

      <div className="demo-workspace">
        <MeterlyShell step={step} intent={intent} />
        <FloePanel
          step={step}
          intent={intent}
          ask={() => setStep("question")}
          choose={choose}
          finish={() => intent && finish(intent)}
        />
      </div>

      <div className="page-actions">
        <button className="text-button" onClick={back}><ArrowLeft size={15} /> Back</button>
        {step !== "show" && <button className="text-button" onClick={() => { setIntent(null); setStep("show"); }}><Rotate size={14} /> Reset demo</button>}
      </div>
    </section>
  );
}

function Result({ intent, restart, tryAgain }: { intent: IntentKey; restart: () => void; tryAgain: () => void }) {
  const selected = intentOptions.find((option) => option.key === intent) ?? intentOptions[0];

  return (
    <section className="result-page">
      <div className="result-hero">
        <span className="overline">WHY THE INTERACTION MATTERS</span>
        <h1>One small question creates a much better signal.</h1>
        <p>
          The buyer still gets an instant demo. But instead of recording only that they viewed usage billing,
          Floe now knows <strong>why</strong> that feature mattered and can use it immediately.
        </p>
      </div>

      <div className="comparison">
        <section>
          <span className="comparison-label">WITHOUT THE CHECKPOINT</span>
          <div className="signal-card muted">
            <span>Observed</span>
            <strong>Viewed Usage Billing</strong>
            <p>Useful, but ambiguous. They may care about forecasting, invoice accuracy, or cost control.</p>
          </div>
        </section>

        <div className="comparison-arrow"><ArrowRight size={18} /></div>

        <section>
          <span className="comparison-label">WITH THE CHECKPOINT</span>
          <div className="signal-card clear">
            <span>Buyer told us</span>
            <strong>{selected.label}</strong>
            <p>{selected.learned}</p>
          </div>
        </section>
      </div>

      <div className="value-row">
        <div><span>For the buyer</span><strong>The next screen becomes more relevant immediately.</strong></div>
        <div><span>For Floe</span><strong>The demo route is based on explicit intent, not a guess.</strong></div>
        <div><span>For the sales team</span><strong>If they book, the context is already sharper.</strong></div>
      </div>

      <div className="result-thesis">
        <Spark size={18} />
        <p><strong>The idea:</strong> use tiny, contextual questions only when they improve the next thing Floe shows. Qualification becomes a side effect of a better demo, not another form the buyer has to complete.</p>
      </div>

      <div className="result-actions">
        <button className="secondary-button" onClick={tryAgain}><Rotate size={15} /> Try another intent</button>
        <button className="primary-button" onClick={restart}>Restart concept <ArrowRight size={15} /></button>
      </div>
    </section>
  );
}

export function IntentBrief() {
  const reduced = useReducedMotion();
  const [view, setView] = useState<View>("intro");
  const [selectedIntent, setSelectedIntent] = useState<IntentKey>("forecast");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [view, reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <Header view={view} />

        <main className="page-shell">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: reduced ? 0 : .22, ease: [.16, 1, .3, 1] }}
            >
              {view === "intro" && <Intro start={() => setView("demo")} />}
              {view === "demo" && (
                <Demo
                  back={() => setView("intro")}
                  finish={(intent) => { setSelectedIntent(intent); setView("result"); }}
                />
              )}
              {view === "result" && (
                <Result
                  intent={selectedIntent}
                  restart={() => setView("intro")}
                  tryAgain={() => setView("demo")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="site-footer">
          <span>Concept extension for Floe</span>
          <span>Illustrative product + data · no live Floe integration</span>
        </footer>
      </div>
    </MotionConfig>
  );
}
