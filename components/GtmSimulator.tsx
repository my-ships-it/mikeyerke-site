"use client";

import { useMemo, useState } from "react";

type SliderRowProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  suffix?: string;
  onChange: (next: number) => void;
};

function SliderRow({ id, label, min, max, step, value, suffix = "", onChange }: SliderRowProps) {
  return (
    <label className="sim-slider-row" htmlFor={id}>
      <span>
        {label}: <strong>{value.toLocaleString()}{suffix}</strong>
      </span>
      <input
        id={id}
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

export function GtmSimulator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(1500);
  const [meetingRate, setMeetingRate] = useState(18);
  const [winRate, setWinRate] = useState(24);
  const [avgDealSize, setAvgDealSize] = useState(40000);
  const [handoffDelayHours, setHandoffDelayHours] = useState(30);
  const [cycleDays, setCycleDays] = useState(75);

  const model = useMemo(() => {
    const meetings = Math.round(leadsPerMonth * (meetingRate / 100));
    const wins = Math.round(meetings * (winRate / 100));
    const bookings = wins * avgDealSize;

    const optimizedMeetingRate = Math.min(meetingRate * 1.12, 95);
    const optimizedWinRate = Math.min(winRate * 1.08, 95);
    const optimizedDelay = Math.max(2, Math.round(handoffDelayHours * 0.45));
    const optimizedCycle = Math.max(15, Math.round(cycleDays * 0.85));

    const optimizedMeetings = Math.round(leadsPerMonth * (optimizedMeetingRate / 100));
    const optimizedWins = Math.round(optimizedMeetings * (optimizedWinRate / 100));
    const optimizedBookings = optimizedWins * avgDealSize;

    return {
      baseline: {
        meetings,
        wins,
        bookings,
        handoffDelayHours,
        cycleDays
      },
      optimized: {
        meetings: optimizedMeetings,
        wins: optimizedWins,
        bookings: optimizedBookings,
        handoffDelayHours: optimizedDelay,
        cycleDays: optimizedCycle
      }
    };
  }, [avgDealSize, cycleDays, handoffDelayHours, leadsPerMonth, meetingRate, winRate]);

  const bookingLift = model.optimized.bookings - model.baseline.bookings;

  return (
    <section className="simulator-shell">
      <div className="section-header">
        <h2>GTM System Simulator</h2>
      </div>
      <p className="page-intro">
        Adjust operating inputs to model how process quality and execution speed can influence funnel outcomes.
      </p>

      <div className="simulator-grid">
        <article className="simulator-controls">
          <SliderRow
            id="sim-leads"
            label="Inbound Leads / Month"
            max={10000}
            min={200}
            onChange={setLeadsPerMonth}
            step={50}
            value={leadsPerMonth}
          />
          <SliderRow
            id="sim-meeting-rate"
            label="Lead To Meeting Rate"
            max={60}
            min={4}
            onChange={setMeetingRate}
            step={1}
            suffix="%"
            value={meetingRate}
          />
          <SliderRow
            id="sim-win-rate"
            label="Meeting To Win Rate"
            max={60}
            min={5}
            onChange={setWinRate}
            step={1}
            suffix="%"
            value={winRate}
          />
          <SliderRow
            id="sim-deal-size"
            label="Average Deal Size"
            max={300000}
            min={2000}
            onChange={setAvgDealSize}
            step={1000}
            value={avgDealSize}
          />
          <SliderRow
            id="sim-handoff-delay"
            label="Handoff Delay"
            max={72}
            min={2}
            onChange={setHandoffDelayHours}
            step={1}
            suffix="h"
            value={handoffDelayHours}
          />
          <SliderRow
            id="sim-cycle"
            label="Sales Cycle"
            max={180}
            min={15}
            onChange={setCycleDays}
            step={1}
            suffix="d"
            value={cycleDays}
          />
        </article>

        <article className="simulator-results">
          <p className="meta">Scenario Comparison</p>
          <div className="sim-metric-grid">
            <div className="sim-metric">
              <p className="meta">Baseline Meetings</p>
              <h3>{model.baseline.meetings.toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Optimized Meetings</p>
              <h3>{model.optimized.meetings.toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Baseline Wins</p>
              <h3>{model.baseline.wins.toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Optimized Wins</p>
              <h3>{model.optimized.wins.toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Cycle Time Delta</p>
              <h3>{model.baseline.cycleDays - model.optimized.cycleDays} days faster</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Handoff Delta</p>
              <h3>{model.baseline.handoffDelayHours - model.optimized.handoffDelayHours}h faster</h3>
            </div>
          </div>

          <article className="sim-highlight">
            <p className="meta">Modeled Booking Lift</p>
            <h3>${bookingLift.toLocaleString()}</h3>
            <p>
              This is a directional model, not a guarantee. Use it to communicate why operating discipline and
              system design matter in executive discussions.
            </p>
          </article>
        </article>
      </div>
    </section>
  );
}
