"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import India from "@svg-maps/india";

import { stateStories } from "@/data/states";
import {
  REGIONS,
  getRegionById,
  getRegionForState,
  type RegionId,
} from "@/data/regions";

function normalizeStateName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/*
 * Match a map region using BOTH its visible name
 * and its SVG id.
 *
 * This is important for small union territories such
 * as Andaman and Nicobar Islands because the map
 * package may identify them differently.
 */
function findStateKey(
  locationName: string,
  locationId: string
) {
  const normalizedName =
    normalizeStateName(locationName);

  const normalizedId =
    normalizeStateName(locationId);

  const aliases: Record<string, string> = {
    odisha: "odisha",
    orissa: "odisha",

    kerala: "kerala",

    "tamil-nadu": "tamil-nadu",
    tamilnadu: "tamil-nadu",

    "andhra-pradesh": "andhra-pradesh",
    andhra: "andhra-pradesh",

    "arunachal-pradesh": "arunachal-pradesh",
    arunachal: "arunachal-pradesh",

    assam: "assam",

    bihar: "bihar",

    chandigarh: "chandigarh",

    chhattisgarh: "chhattisgarh",

    goa: "goa",

    gujarat: "gujarat",

    haryana: "haryana",

    "himachal-pradesh": "himachal",
    himachal: "himachal",

    "jammu-and-kashmir":
      "jammu-and-kashmir",

    "jammu-kashmir":
      "jammu-and-kashmir",

    jharkhand: "jharkhand",

    karnataka: "karnataka",

    ladakh: "ladakh",

    "madhya-pradesh":
      "madhya-pradesh",

    madhya: "madhya-pradesh",

    maharashtra: "maharashtra",

    manipur: "manipur",

    meghalaya: "meghalaya",

    mizoram: "mizoram",

    nagaland: "nagaland",

    punjab: "punjab",

    rajasthan: "rajasthan",

    sikkim: "sikkim",

    telangana: "telangana",

    tripura: "tripura",

    uttarakhand: "uttarakhand",
    uttaranchal: "uttarakhand",

    "uttar-pradesh": "uttar-pradesh",

    "west-bengal": "west-bengal",

    delhi: "delhi",

    "dadra-and-nagar-haveli":
      "dadra-and-nagar-haveli",

    "daman-and-diu":
      "daman-and-diu",

    "dadra-and-nagar-haveli-and-daman-and-diu":
      "dadra-and-nagar-haveli",

    lakshadweep: "lakshadweep",

    puducherry: "puducherry",

    pondicherry: "puducherry",

    /*
     * ANDAMAN AND NICOBAR
     *
     * Support the visible name, SVG id,
     * singular/plural variations and abbreviated
     * forms used by different India SVG maps.
     */
    "andaman-and-nicobar":
      "andaman-and-nicobar",

    "andaman-and-nicobar-islands":
      "andaman-and-nicobar",

    "andaman-and-nicobar-island":
      "andaman-and-nicobar",

    "andaman-nicobar":
      "andaman-and-nicobar",

    "andaman-nicobar-islands":
      "andaman-and-nicobar",

    "andaman-nicobar-island":
      "andaman-and-nicobar",

    "andaman-and-nicobar-islands-ut":
      "andaman-and-nicobar",

    "andaman-nicobar-islands-ut":
      "andaman-and-nicobar",

    "in-an":
      "andaman-and-nicobar",
  };

  /*
   * First try the map's visible name.
   */
  const nameMatch =
    aliases[normalizedName];

  if (
    nameMatch &&
    stateStories[nameMatch]
  ) {
    return nameMatch;
  }

  /*
   * Then try the SVG id.
   */
  const idMatch =
    aliases[normalizedId];

  if (
    idMatch &&
    stateStories[idMatch]
  ) {
    return idMatch;
  }

  /*
   * Finally allow a direct data-key match.
   */
  if (
    stateStories[normalizedName]
  ) {
    return normalizedName;
  }

  if (
    stateStories[normalizedId]
  ) {
    return normalizedId;
  }

  return null;
}

interface IndiaMapProps {
  initialRegion?: string | null;
}

export default function IndiaMap({ initialRegion }: IndiaMapProps = {}) {
  const initialReg = getRegionById(initialRegion);
  const [activeRegion, setActiveRegion] = useState<RegionId>(
    initialRegion ? initialReg.id : "east"
  );
  const [selectedState, setSelectedState] = useState<string>(
    initialRegion ? initialReg.defaultState : "odisha"
  );

  const [hoveredState, setHoveredState] =
    useState<string | null>(null);

  const [isChanging, setIsChanging] =
    useState(false);

  useEffect(() => {
    if (initialRegion) {
      const reg = getRegionById(initialRegion);
      setActiveRegion(reg.id);
      setSelectedState(reg.defaultState);
    }
  }, [initialRegion]);

  const activeRegionInfo = getRegionById(activeRegion);

  /*
   * Safety fallback:
   *
   * Even if a map location ever produces a key
   * that doesn't exist in stateStories, the
   * component will continue using Odisha instead
   * of crashing.
   */
  const selected =
    stateStories[selectedState] ??
    stateStories.odisha;

  const selectedIndex =
    Object.keys(stateStories).indexOf(
      selectedState
    ) + 1;

  function selectState(stateKey: string) {
    /*
     * Never allow an unknown state into
     * selectedState.
     */
    if (!stateStories[stateKey]) {
      return;
    }

    if (stateKey === selectedState) {
      return;
    }

    // Automatically sync active region if selected state belongs to another region
    const stateRegion = getRegionForState(stateKey);
    if (stateRegion.id !== activeRegion) {
      setActiveRegion(stateRegion.id);
    }

    setIsChanging(true);

    window.setTimeout(() => {
      setSelectedState(stateKey);
      setIsChanging(false);
    }, 220);
  }

  function handleSelectRegion(regionId: RegionId) {
    if (regionId === activeRegion) return;
    const reg = getRegionById(regionId);
    setActiveRegion(regionId);
    setIsChanging(true);
    window.setTimeout(() => {
      setSelectedState(reg.defaultState);
      setIsChanging(false);
    }, 220);
  }

  return (
    <div className="map-stage">

      {/* =====================================
          LEFT — INFORMATION
      ===================================== */}

      <div className="map-info">

        <div className="map-info-label">
          SELECTED REGION · {activeRegionInfo.name}
        </div>


        {/* =====================================
            ANIMATED STATE HEADING
        ===================================== */}

        <AnimatePresence mode="wait">

          <motion.div
            key={selectedState}
            className="state-heading"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -18,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          >

            <div className="state-number">
              {String(
                selectedIndex > 0
                  ? selectedIndex
                  : 1
              ).padStart(2, "0")}
            </div>

            <h3>
              {selected.name}
            </h3>

          </motion.div>

        </AnimatePresence>


        {/* =====================================
            DESCRIPTION
        ===================================== */}

        <AnimatePresence mode="wait">

          <motion.p
            key={`${selectedState}-description`}
            className="map-info-intro"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.3,
              delay: 0.05,
            }}
          >

            {selected.description}

          </motion.p>

        </AnimatePresence>


        {/* =====================================
            METADATA
        ===================================== */}

        <AnimatePresence mode="wait">

          <motion.div
            key={`${selectedState}-meta`}
            className="manuscript-meta"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.35,
              delay: 0.1,
            }}
          >

            <div className="meta-row">

              <span>
                LANGUAGES
              </span>

              <strong>
                {selected.languages.join(
                  " · "
                )}
              </strong>

            </div>

            <div className="meta-row">

              <span>
                SCRIPT
              </span>

              <strong>
                {selected.script}
              </strong>

            </div>

            <div className="meta-row">

              <span>
                MATERIAL
              </span>

              <strong>
                {selected.material}
              </strong>

            </div>

          </motion.div>

        </AnimatePresence>


        {/* =====================================
            STATISTICS
        ===================================== */}

        <AnimatePresence mode="wait">

          <motion.div
            key={`${selectedState}-stats`}
            className="map-info-stats"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.35,
              delay: 0.15,
            }}
          >

            <div className="map-stat">

              <strong>
                {selected.manuscriptCount}
              </strong>

              <span>
                MANUSCRIPTS
              </span>

            </div>

            <div className="map-stat">

              <strong>
                {selected.traditions.length}
              </strong>

              <span>
                TRADITIONS
              </span>

            </div>

          </motion.div>

        </AnimatePresence>


        {/* =====================================
            STORY
        ===================================== */}

        <AnimatePresence mode="wait">

          <motion.div
            key={`${activeRegion}-story`}
            className="story-card"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -18,
            }}
            transition={{
              duration: 0.4,
              delay: 0.12,
            }}
          >

            <div className="story-card-top">

              <div className="story-card-label">
                REGIONAL KNOWLEDGE · {activeRegionInfo.name}
              </div>

              <div className="story-card-symbol">
                ✦
              </div>

            </div>

            <h4>
              {activeRegionInfo.knowledgeTitle}
            </h4>

            <p>
              {activeRegionInfo.story}
            </p>

            <div className="story-card-state-context">
              <span className="state-folio-tag">
                STATE FOLIO CONTEXT · {selected.name}
              </span>
              <p>
                {selected.story}
              </p>
            </div>

            <button type="button">
              Explore Collection
              <span>→</span>
            </button>

          </motion.div>

        </AnimatePresence>

      </div>


      {/* =====================================
          RIGHT — MAP
      ===================================== */}

      <div className="map-column">

        <div className="map-label">

          <span>
            {activeRegionInfo.number}
          </span>

          <span>
            INDIA · {activeRegionInfo.name} MANUSCRIPT REGION
          </span>

        </div>

        {/* =====================================
            FOUR BROAD REGIONS NAV
        ===================================== */}

        <div className="map-region-nav" role="tablist" aria-label="Manuscript regions of India">
          {REGIONS.map((r) => {
            const isActive = activeRegion === r.id;
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectRegion(r.id)}
                className={`region-tab-pill ${isActive ? "active" : ""}`}
              >
                <span className="pill-num">{r.number}</span>
                <span>{r.name}</span>
              </button>
            );
          })}
        </div>


        {/* =====================================
            MAP VISUAL
        ===================================== */}

        <div
          className={`map-visual ${
            isChanging
              ? "map-changing"
              : ""
          }`}
        >

          {/* BLUE ATMOSPHERIC GLOW */}

          <motion.div
            className="map-glow"
            animate={{
              opacity: [
                0.2,
                0.45,
                0.2,
              ],
              scale: [
                1,
                1.04,
                1,
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />


          {/* =====================================
              SCANNING BEAM
          ===================================== */}

          <motion.div
            className="map-scan-line"
            initial={{
              opacity: 0,
              x: "-100%",
            }}
            animate={{
              opacity: [
                0,
                1,
                1,
                0,
              ],
              x: [
                "-100%",
                "-20%",
                "120%",
                "140%",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear",
            }}
          />


          {/* =====================================
              INDIA MAP
          ===================================== */}

          <motion.svg
            viewBox={India.viewBox}
            className="india-map"
            aria-label="Interactive map of India"
            animate={{
              scale: isChanging
                ? 0.985
                : 1,
            }}
            transition={{
              duration: 0.35,
            }}
          >

            {India.locations.map(
              (location: {
                id: string;
                name: string;
                path: string;
              }) => {

                /*
                 * IMPORTANT:
                 *
                 * We now pass BOTH location.name
                 * AND location.id.
                 *
                 * This is the key fix for Andaman
                 * and Nicobar.
                 */
                const stateKey =
                  findStateKey(
                    location.name,
                    location.id
                  );

                const isSelected =
                  stateKey ===
                  selectedState;

                const isInActiveRegion =
                  stateKey
                    ? activeRegionInfo.stateKeys.includes(stateKey)
                    : false;

                return (
                  <motion.path
                    key={location.id}
                    d={location.path}
                    className={`india-state ${
                      isSelected
                        ? "state-selected"
                        : ""
                    } ${
                      isInActiveRegion && !isSelected
                        ? "state-in-region"
                        : ""
                    } ${
                      !isInActiveRegion && !isSelected
                        ? "state-outside-region"
                        : ""
                    } ${
                      stateKey
                        ? ""
                        : "state-disabled"
                    }`}
                    animate={{
                      opacity:
                        isSelected
                          ? 1
                          : isInActiveRegion
                          ? 0.95
                          : 0.45,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    onClick={() => {

                      if (!stateKey) {
                        return;
                      }

                      selectState(
                        stateKey
                      );

                    }}
                    onMouseEnter={() => {

                      setHoveredState(
                        location.name
                      );

                    }}
                    onMouseLeave={() => {

                      setHoveredState(
                        null
                      );

                    }}
                  />
                );

              }
            )}

          </motion.svg>


          {/* =====================================
              HOVER TOOLTIP
          ===================================== */}

          <AnimatePresence>

            {hoveredState && (

              <motion.div
                className="state-tooltip"
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 5,
                }}
              >

                <span>
                  REGION
                </span>

                <strong>
                  {hoveredState}
                </strong>

              </motion.div>

            )}

          </AnimatePresence>

        </div>


        {/* =====================================
            INSTRUCTION
        ===================================== */}

        <div className="map-instruction">

          <span className="instruction-dot" />

          ACTIVE: {activeRegionInfo.name} REGION · HOVER OR CLICK ANY STATE TO EXAMINE

        </div>

      </div>

    </div>
  );
}