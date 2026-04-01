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
  format?: "currency" | "number";
  onChange: (next: number) => void;
};

function formatValue(value: number, format: SliderRowProps["format"] = "number"): string {
  if (format === "currency") {
    return `$${Math.round(value).toLocaleString()}`;
  }

  return value.toLocaleString();
}

function SliderRow({
  id,
  label,
  min,
  max,
  step,
  value,
  suffix = "",
  format = "number",
  onChange
}: SliderRowProps) {
  return (
    <label className="sim-slider-row" htmlFor={id}>
      <span>
        {label}: <strong>{formatValue(value, format)}{suffix}</strong>
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
  const [monthlyPipeline, setMonthlyPipeline] = useState(3200000);
  const [winRate, setWinRate] = useState(22);
  const [slippageRate, setSlippageRate] = useState(18);
  const [handoffDelayHours, setHandoffDelayHours] = useState(30);

  const [winRateUplift, setWinRateUplift] = useState(3);
  const [slippageReduction, setSlippageReduction] = useState(6);
  const [delayReductionHours, setDelayReductionHours] = useState(14);
  const [throughputLiftPer10h, setThroughputLiftPer10h] = useState(1);

  const model = useMemo(() => {
    const baselineEffectivePipeline = monthlyPipeline * (1 - slippageRate / 100);
    const baselineBookings = baselineEffectivePipeline * (winRate / 100);

    const optimizedWinRate = Math.min(95, winRate + winRateUplift);
    const optimizedSlippage = Math.max(0, slippageRate - slippageReduction);
    const throughputLiftPercent = (delayReductionHours / 10) * throughputLiftPer10h;

    const optimizedEffectivePipeline =
      monthlyPipeline * (1 - optimizedSlippage / 100) * (1 + throughputLiftPercent / 100);
    const optimizedBookings = optimizedEffectivePipeline * (optimizedWinRate / 100);

    return {
      baseline: {
        effectivePipeline: baselineEffectivePipeline,
        bookings: baselineBookings,
        winRate,
        slippageRate,
        handoffDelayHours
      },
      optimized: {
        effectivePipeline: optimizedEffectivePipeline,
        bookings: optimizedBookings,
        winRate: optimizedWinRate,
        slippageRate: optimizedSlippage,
        handoffDelayHours: Math.max(2, handoffDelayHours - delayReductionHours)
      },
      assumptions: {
        winRateUplift,
        slippageReduction,
        delayReductionHours,
        throughputLiftPer10h,
        throughputLiftPercent
      }
    };
  }, [
    delayReductionHours,
    handoffDelayHours,
    monthlyPipeline,
    slippageRate,
    slippageReduction,
    throughputLiftPer10h,
    winRate,
    winRateUplift
  ]);

  const bookingLift = model.optimized.bookings - model.baseline.bookings;

  return (
    <section className="simulator-shell">
      <div className="section-header">
        <h2>Assumption-Driven GTM Calculator</h2>
      </div>
      <p className="page-intro">
        Adjust operating assumptions directly to model impact. Every output below is tied to explicit inputs shown in
        the same panel.
      </p>

      <div className="simulator-grid">
        <article className="simulator-controls">
          <p className="meta">Current Operating Inputs</p>
          <SliderRow
            format="currency"
            id="sim-pipeline"
            label="Monthly Pipeline"
            max={12000000}
            min={250000}
            onChange={setMonthlyPipeline}
            step={50000}
            value={monthlyPipeline}
          />
          <SliderRow
            id="sim-win-rate"
            label="Current Win Rate"
            max={60}
            min={5}
            onChange={setWinRate}
            step={1}
            suffix="%"
            value={winRate}
          />
          <SliderRow
            id="sim-slippage"
            label="Close-Date Slippage"
            max={45}
            min={2}
            onChange={setSlippageRate}
            step={1}
            suffix="%"
            value={slippageRate}
          />
          <SliderRow
            id="sim-delay"
            label="Average Handoff Delay"
            max={72}
            min={2}
            onChange={setHandoffDelayHours}
            step={1}
            suffix="h"
            value={handoffDelayHours}
          />

          <p className="meta" style={{ marginTop: "0.8rem" }}>Assumptions (Editable)</p>
          <SliderRow
            id="sim-win-rate-uplift"
            label="Win-Rate Uplift"
            max={10}
            min={0}
            onChange={setWinRateUplift}
            step={1}
            suffix=" pts"
            value={winRateUplift}
          />
          <SliderRow
            id="sim-slippage-reduction"
            label="Slippage Reduction"
            max={20}
            min={0}
            onChange={setSlippageReduction}
            step={1}
            suffix=" pts"
            value={slippageReduction}
          />
          <SliderRow
            id="sim-delay-reduction"
            label="Delay Reduction"
            max={30}
            min={0}
            onChange={setDelayReductionHours}
            step={1}
            suffix="h"
            value={delayReductionHours}
          />
          <SliderRow
            id="sim-throughput-per-10h"
            label="Throughput Lift per 10h"
            max={4}
            min={0}
            onChange={setThroughputLiftPer10h}
            step={0.5}
            suffix="%"
            value={throughputLiftPer10h}
          />
        </article>

        <article className="simulator-results">
          <p className="meta">Model Output</p>
          <div className="sim-metric-grid">
            <div className="sim-metric">
              <p className="meta">Baseline Bookings</p>
              <h3>${Math.round(model.baseline.bookings).toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Modeled Bookings</p>
              <h3>${Math.round(model.optimized.bookings).toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Baseline Effective Pipeline</p>
              <h3>${Math.round(model.baseline.effectivePipeline).toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Modeled Effective Pipeline</p>
              <h3>${Math.round(model.optimized.effectivePipeline).toLocaleString()}</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Win-Rate Delta</p>
              <h3>{(model.optimized.winRate - model.baseline.winRate).toFixed(1)} pts</h3>
            </div>
            <div className="sim-metric">
              <p className="meta">Delay Delta</p>
              <h3>{model.baseline.handoffDelayHours - model.optimized.handoffDelayHours}h faster</h3>
            </div>
          </div>

          <article className="sim-highlight">
            <p className="meta">Modeled Booking Lift</p>
            <h3>${Math.round(bookingLift).toLocaleString()}</h3>
            <p>
              Formula: <code>pipeline * (1 - slippage) * winRate</code>, then adjusted by explicit assumption sliders.
            </p>
            <p>
              Throughput assumption currently adds <strong>{model.assumptions.throughputLiftPercent.toFixed(1)}%</strong>
              {" "}effective pipeline from delay reduction.
            </p>
          </article>
        </article>
      </div>
    </section>
  );
}
