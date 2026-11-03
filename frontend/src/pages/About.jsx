
import { api } from "../api";
import { useAsync } from "../hooks/useAsync";
import { Panel, Tag } from "../components/Ui";

export default function About() {
  const h = useAsync(api.health);
  const m = h.data?.model;

  return (
    <div className="about">
      <Panel title="About SWACHETAN">
        <p className="lede">
          SWACHETAN is a driver fatigue monitoring project that uses
          an ordinary camera to look for possible signs of drowsiness.
          It analyses facial measurements over time and gives graded
          warnings when the readings suggest that a driver may be
          getting tired. Instead of relying only on one fixed threshold,
          it can compare readings with the driver's own baseline.
          The aim is to provide an additional safety aid, not to replace
          proper rest or safe driving practices.
        </p>

        <div className="steps">
          <div>
            <b>Before the trip</b>
            <span>
              A short pre-trip check helps establish a reference
              for the driver's normal readings.
            </span>
          </div>

          <div>
            <b>During the trip</b>
            <span>
              The system monitors eye, mouth and head-related
              measurements and generates graded fatigue warnings.
              Warning delivery depends on the selected cabin profile.
            </span>
          </div>

          <div>
            <b>After the trip</b>
            <span>
              Drivers can view their shift reports, while the
              depot section shows grouped information rather than
              individual driver rankings.
            </span>
          </div>

          <div>
            <b>Dataset and model development</b>
            <span>
              We used the Kaggle version of UTA-RLDD and extracted
              numerical features for model development and training.
            </span>
          </div>
        </div>
      </Panel>

      <div className="two-col">
        <Panel
          title="What has been tested"
          aside={<Tag tone="good">automated tests</Tag>}
        >
          <ul className="plain">
            <li>
              Feature calculations, blink timing, adaptive
              reference, streaming behaviour, alert persistence
              and hysteresis.
            </li>
            <li>
              Cabin-based warning routing for the configured
              vehicle profiles, including handling of severe alerts.
            </li>
            <li>
              Pre-trip verdicts, inconclusive cases, report
              suppression and synthetic-data handling.
            </li>
            <li>
              Backend API endpoints and live/pre-trip workflows
              using simulated driver data.
            </li>
            <li>
              The webcam monitoring interface has also been
              tried locally with facial feature extraction.
            </li>
          </ul>
        </Panel>

        <Panel
          title="Current limitations"
          aside={<Tag tone="warn">limitations</Tag>}
        >
          <ul className="plain">
            <li>
              The Kaggle version of UTA-RLDD was used for feature
              extraction. However, this is different from testing
              the complete dataset through the website's live
              monitoring interface.
            </li>
            <li>
              The local webcam demonstration does not establish
              reliable detection accuracy in actual driving
              conditions or under every lighting and camera angle.
            </li>
            <li>
              The dataset contains a limited number of selected
              participants, and its video-level labels do not
              identify the exact moment when drowsiness begins.
            </li>
            <li>
              Some behavioural cues do not have independently
              verified ground-truth labels.
            </li>
            <li>
              Crew or dispatch notification is not a fully
              integrated external notification service.
            </li>
          </ul>
        </Panel>
      </div>

      <Panel title="Ethics and scope">
        <ul className="plain">
          <li>
            The system does not use face recognition to identify
            drivers. The driver selects a profile.
          </li>
          <li>
            Fatigue scores are intended as a driving-safety aid,
            not as a medical diagnosis or disciplinary measure.
          </li>
          <li>
            Camera frames are processed for monitoring rather
            than stored as video recordings.
          </li>
          <li>
            The depot view uses grouped information and hides
            small groups to reduce the exposure of individual
            driver information.
          </li>
          <li>
            SWACHETAN is an academic prototype, not a certified
            vehicle safety system.
          </li>
        </ul>
      </Panel>

      <Panel title="System status">
        {h.error ? (
          <p className="empty">Backend unreachable: {h.error}</p>
        ) : m ? (
          <dl className="kv">
            <dt>Model</dt>
            <dd>
              {m.state}{" "}
              {m.synthetic ? (
                <Tag tone="warn">trained on synthetic drivers</Tag>
              ) : (
                <Tag tone="good">loaded from file</Tag>
              )}
            </dd>

            <dt>Source</dt>
            <dd>{m.source || "–"}</dd>

            <dt>Config hash</dt>
            <dd className="mono">{h.data.config_hash}</dd>

            {m.error && (
              <>
                <dt>Error</dt>
                <dd>{m.error}</dd>
              </>
            )}
          </dl>
        ) : (
          <p className="muted">Checking…</p>
        )}
      </Panel>
    </div>
  );
}
