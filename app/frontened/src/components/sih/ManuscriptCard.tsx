"use client";

import { StateStory } from "@/data/states";

type ManuscriptCardProps = {
  story: StateStory;
};

export default function ManuscriptCard({
  story,
}: ManuscriptCardProps) {
  return (
    <div className="story-card">

      <div className="story-card-top">
        <div className="story-card-label">
          LIVING MANUSCRIPT CARD
        </div>

        <div className="story-card-symbol">
          ✦
        </div>
      </div>

      <h4>
        The knowledge of {story.name}
      </h4>

      <p>
        {story.story}
      </p>

      <div className="story-card-details">

        <div>
          <span>PERIOD</span>
          <strong>{story.period}</strong>
        </div>

        <div>
          <span>SCRIPT</span>
          <strong>{story.script}</strong>
        </div>

      </div>

      <div className="story-card-traditions">

        {story.traditions.map(
          (tradition) => (
            <span key={tradition}>
              {tradition}
            </span>
          )
        )}

      </div>

      <button
        type="button"
        className="story-card-button"
      >
        Explore Collection
        <span>→</span>
      </button>

    </div>
  );
}