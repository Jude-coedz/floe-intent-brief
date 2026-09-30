"use client";

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { buyer, callPrep, evaluationPath, nextMove, signals, type Signal } from "@/data/session";
import { ArrowLeft, ArrowRight, Check, Clock, Evidence, Quote, Spark, X } from "./icons";

type View = "intro" | "brief" | "close";

function Progress({ view }: { view: View }) {
  const current = view === "intro" ? 0 : view === "brief" ? 1 : 2;
  return (
    <div className="progress" aria-label={"Step " + (current + 1) + " of 3"}>
      {[0, 1, 2].map((step) => <span key={step} className={step <= current ? "on" : ""} />)}
    </div>
  );
}

function Header({ view }: { view: View }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">f</span>
        <div><strong>Floe Intent Brief</strong><span>Concept extension · representative session</span></div>
      </div>
      <div className="top-meta"><span>AE handoff concept</span><Progress view={view} /></div>
    </header>
  );
}

function Intro({ next }: { next: () => void }) {
  return (
    <section className="intro">
      <div className="intro-copy">
        <span className="eyebrow">THE PRODUCT QUESTION</span>
        <h1>Floe already captures the session. What should the AE see next?</h1>
        <p className="lede">
          Floe already knows what a buyer asked, what they saw, and where intent showed up.
          This concept compresses that session into a decision surface built for the next 60 seconds,
          not the last 15 minutes.
        </p>

        <div className="principles">
          <div><span>01</span><p><strong>Lead with the next move.</strong> Tell the AE what conversation is now worth having.</p></div>
          <div><span>02</span><p><strong>Keep every claim inspectable.</strong> Intent stays linked to the buyer question or demo moment behind it.</p></div>
          <div><span>03</span><p><strong>Remove replay work.</strong> The AE should not need a transcript to understand the deal shape.</p></div>
        </div>

        <button className="primary" onClick={next}>Open a buyer handoff <ArrowRight size={16} /></button>
        <small className="note">Representative data · no live Floe integration</small>
      </div>

      <aside className="preview">
        <div className="preview-head">
          <div><span>AFTER A 12 MINUTE DEMO</span><strong>The AE should know this first.</strong></div>
          <span className="evidence-linked"><i /> Evidence linked</span>
        </div>
        <div className="next-preview">
          <span>NEXT MOVE</span>
          <h2>Technical validation call, not another demo.</h2>
          <p>CRM writeback and security are the remaining decision points.</p>
        </div>
        <div className="preview-rows">
          <div><span>Primary job</span><strong>Replace the demo gate</strong></div>
          <div><span>Dependency</span><strong>HubSpot writeback</strong></div>
          <div><span>Open blocker</span><strong>Security review</strong></div>
        </div>
        <div className="quote">
          <Quote size={15} />
          <p>“Does the qualification data actually write back to HubSpot?”</p>
          <span>05:42 · buyer question</span>
        </div>
      </aside>
    </section>
  );
}

function BuyerHeader() {
  return (
    <div className="buyer-head">
      <div className="avatar">MC</div>
      <div className="buyer-copy">
        <div className="buyer-name"><h2>{buyer.name}</h2><span><Check size={12} /> Qualified for AE follow-up</span></div>
        <p>{buyer.role} · {buyer.company}</p>
      </div>
      <div className="buyer-meta">
        <div><span>Session</span><strong>{buyer.sessionLength}</strong></div>
        <div><span>Company</span><strong>{buyer.companySize}</strong></div>
        <div><span>Entry</span><strong>{buyer.source}</strong></div>
      </div>
    </div>
  );
}

function SignalRow({ signal, open }: { signal: Signal; open: (signal: Signal) => void }) {
  return (
    <button className="signal-row" onClick={() => open(signal)}>
      <div className="signal-label">
        <span>{signal.label}</span>
        <i className={signal.confidence === "Direct" ? "direct" : "strong"}>{signal.confidence}</i>
      </div>
      <strong>{signal.summary}</strong>
      <span className="source-count"><Evidence size={14} /> {signal.evidence.length} sources</span>
      <ArrowRight size={15} />
    </button>
  );
}

function Drawer({ signal, close }: { signal: Signal | null; close: () => void }) {
  return (
    <AnimatePresence>
      {signal && (
        <>
          <motion.button className="scrim" aria-label="Close evidence" onClick={close} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
          <motion.aside className="drawer" initial={{opacity:0,x:28}} animate={{opacity:1,x:0}} exit={{opacity:0,x:24}} transition={{duration:.2,ease:[.16,1,.3,1]}}>
            <div className="drawer-head">
              <div><span className="eyebrow">SOURCE EVIDENCE</span><h3>{signal.label}</h3></div>
              <button onClick={close} aria-label="Close"><X size={17} /></button>
            </div>
            <div className="claim">
              <span>Derived claim</span>
              <p>{signal.summary}</p>
              <div><i /> {signal.confidence} evidence</div>
            </div>
            <div className="evidence-stack">
              {signal.evidence.map((item, index) => (
                <section key={item.timestamp + "-" + index}>
                  <div className="evidence-head"><span>{item.source}</span><span><Clock size={12} /> {item.timestamp}</span></div>
                  <blockquote>{item.quote}</blockquote>
                  <p>{item.context}</p>
                </section>
              ))}
            </div>
            <div className="drawer-note"><Spark size={15} /><p>The summary is useful because the evidence remains one click away. The AE never has to trust an unexplained inference.</p></div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Brief({ back, next }: { back: () => void; next: () => void }) {
  const [selected, setSelected] = useState<Signal | null>(null);
  return (
    <section className="brief">
      <div className="brief-intro">
        <div><span className="eyebrow">AE HANDOFF · REPRESENTATIVE SESSION</span><h1>Know what to do before you know everything that happened.</h1></div>
        <p>The summary is intentionally opinionated. It prioritises the next sales decision, while keeping every conclusion traceable to the session that produced it.</p>
      </div>

      <div className="brief-surface">
        <BuyerHeader />

        <div className="next-move">
          <div className="spark-box"><Spark size={18} /></div>
          <div>
            <span>RECOMMENDED NEXT MOVE</span>
            <h3>{nextMove.title}</h3>
            <p>{nextMove.reason}</p>
          </div>
          <div className="next-meta">
            <div><span>Owner</span><strong>{nextMove.owner}</strong></div>
            <div><span>Bring in</span><strong>{nextMove.people}</strong></div>
          </div>
        </div>

        <div className="brief-grid">
          <section className="signals">
            <div className="section-head"><div><span>BUYER INTENT</span><strong>What matters in this deal</strong></div><small>Click any signal to inspect its evidence.</small></div>
            <div className="signal-list">{signals.map((signal) => <SignalRow key={signal.id} signal={signal} open={setSelected} />)}</div>
          </section>

          <section className="path">
            <div className="section-head"><div><span>EVALUATION PATH</span><strong>What they chose to inspect</strong></div><small>Sequence matters more than a flat feature list.</small></div>
            <div className="path-list">
              {evaluationPath.map((item, index) => (
                <div className="path-row" key={item.time}>
                  <div className="marker"><span>{item.time}</span>{index < evaluationPath.length - 1 && <i />}</div>
                  <div><strong>{item.title}</strong><p>{item.detail}</p><span>{item.type}</span></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="prep">
          <div><span>FIRST 5 MINUTES OF THE NEXT CALL</span><strong>Give the AE a starting position.</strong></div>
          <div className="prep-items">
            {callPrep.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
          </div>
        </section>
      </div>

      <div className="actions">
        <button className="secondary" onClick={back}><ArrowLeft size={15} /> Back</button>
        <button className="primary" onClick={next}>Why this layer matters <ArrowRight size={15} /></button>
      </div>
      <Drawer signal={selected} close={() => setSelected(null)} />
    </section>
  );
}

function Close({ back, restart }: { back: () => void; restart: () => void }) {
  return (
    <section className="close">
      <div className="close-copy">
        <span className="eyebrow">THE EXTENSION</span>
        <h1>Don’t add more data. Make the handoff easier to act on.</h1>
        <p className="lede">Floe already captures rich session intelligence: questions, pains, objections, features explored, qualification signals and the recommended next step. The opportunity here is a tighter decision surface for the person who picks the deal up next.</p>
      </div>

      <div className="close-grid">
        <section>
          <span>WHAT FLOE ALREADY CAPTURES</span>
          <ul>
            <li><Check size={14}/> Questions and declared intent</li>
            <li><Check size={14}/> Features shown and demo path</li>
            <li><Check size={14}/> Pain points, objections and gaps</li>
            <li><Check size={14}/> Qualification and next-step signals</li>
          </ul>
        </section>
        <section className="accent-block">
          <span>WHAT THIS CONCEPT CHANGES</span>
          <ul>
            <li><Spark size={14}/> Starts with the decision, not the transcript</li>
            <li><Evidence size={14}/> Keeps claims traceable to evidence</li>
            <li><Clock size={14}/> Compresses AE prep into roughly 60 seconds</li>
            <li><ArrowRight size={14}/> Frames the exact next conversation</li>
          </ul>
        </section>
      </div>

      <div className="thesis">
        <div><span>PRODUCT THESIS</span><h2>The demo should qualify the buyer. The handoff should qualify the next action.</h2></div>
        <p>This is deliberately a presentation-layer concept, not a claim that Floe is missing session intelligence. It asks how the intelligence Floe already collects could become even more immediately actionable for an AE.</p>
      </div>

      <div className="builder-note"><span>WHY I BUILT THIS</span><p>I like the space between product behaviour and operational use: take an existing capability, find the moment where context gets lost, and prototype a smaller interface that makes the next decision easier.</p></div>

      <div className="actions">
        <button className="secondary" onClick={back}><ArrowLeft size={15}/> Back to handoff</button>
        <button className="primary" onClick={restart}>Restart concept <ArrowRight size={15}/></button>
      </div>
    </section>
  );
}

export function IntentBrief() {
  const [view, setView] = useState<View>("intro");
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [view, reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <Header view={view} />
        <main className="page-shell">
          <AnimatePresence mode="wait">
            <motion.div key={view} initial={reduced ? false : {opacity:0,y:8,filter:"blur(3px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={reduced ? undefined : {opacity:0,y:-4}} transition={{duration:reduced ? 0 : .23,ease:[.16,1,.3,1]}}>
              {view === "intro" && <Intro next={() => setView("brief")} />}
              {view === "brief" && <Brief back={() => setView("intro")} next={() => setView("close")} />}
              {view === "close" && <Close back={() => setView("brief")} restart={() => setView("intro")} />}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="footer"><span>Floe Intent Brief · speculative product concept</span><span>Public product context · representative buyer session</span></footer>
      </div>
    </MotionConfig>
  );
}
