import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import styled from "styled-components";
import { useState } from "react";

const MapChartWrapp = styled.section`
  position: relative;
  padding: 2rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const ZoomBtn = styled.div`
  display: flex;
  gap: 0.7rem;
  button {
    background: var(--bg-linear-gradient);
    border: none;
    color: var(--color-grey-0);
    padding: 1rem 1.6rem;
    font-size: 1.5rem;
  }
`;

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";

const conutries = [
  { country: "Croatia", count: 12 },
  { country: "India", count: 7 },
  { country: "Germany", count: 4 },
];

const dataMap = {};
conutries.forEach((d) => {
  dataMap[d.country] = d.count;
});

const maxCount = Math.max(...conutries.map((d) => d.count), 1);

const colorScale = scaleLinear().domain([0, maxCount]).range(["#a3b3ff", "#155dfc"]);

export default function MapChart() {
  const [zoom, setZoom] = useState(1);
  const [tooltip, setTooltip] = useState("");
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);

  return (
    <MapChartWrapp>
      {tooltip && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "5px 8px",
            borderRadius: 4,
            fontSize: 12,
            top: tooltipY,
            left: tooltipX,
          }}
        >
          {tooltip}
        </div>
      )}
      <ZoomBtn>
        <button onClick={() => setZoom((z) => Math.min(z * 1.5, 8))}>+</button>
        <button onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}>-</button>
      </ZoomBtn>
      <ComposableMap projectionConfig={{ scale: 200 }} style={{ width: "100%", height: "100%" }}>
        <ZoomableGroup zoom={zoom} minZoom={1} maxZoom={8} center={[0, 20]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name !== "Antarctica")
                .map((geo) => {
                  const countryName = geo.properties.name;
                  const count = countryName ? (dataMap[countryName] ?? 0) : 0;
                  console.log(geo);
                  /* const [cx, cy] = geo.centroid; */

                  return (
                    <Geography
                      key={geo.rsmKey}
                      fill={count ? colorScale(count) : "#EEE"}
                      stroke='#FFF'
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#FFA726", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltip(`${geo.properties.name}: ${count} users`);
                        /* setTooltipX(cx);
                        setTooltipY(cy); */
                      }}
                      onMouseLeave={() => setTooltip("")}
                      onMouseMove={(evt) => {
                        setTooltipX(evt.clientX + 1);
                        setTooltipY(evt.clientY + 1);
                      }}
                    />
                  );
                })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </MapChartWrapp>
  );
}
