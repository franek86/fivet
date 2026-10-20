/**
 * React & Hooks
 */
import { useState } from "react";

/**
 * Third-party libraries
 */
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import styled from "styled-components";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import Title from "../ui/Title.jsx";

import { useUserByCountryData } from "../../hooks/useDashboardStatistic.js";

export default function MapChart() {
  const [selected, setSelected] = useState("");
  const [zoom, setZoom] = useState(1);

  const { data, isLoading } = useUserByCountryData();

  const countries = data?.data ?? [];

  const selectedCountry = countries?.find((c) => c.country === selected);

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  if (isLoading) {
    return <TablePlaceholder count={2} />;
  }

  return (
    <MapGrid>
      <MapArea>
        <Header>
          <Title tag='h3'>Users around the world</Title>
          <ZoomBtn>
            <button onClick={() => setZoom((z) => Math.min(z * 1.5, 8))}>+</button>
            <button onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}>-</button>
          </ZoomBtn>
        </Header>

        <ComposableMap projectionConfig={{ scale: 250 }}>
          <ZoomableGroup zoom={zoom} minZoom={1} maxZoom={8} center={[0, 20]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties.name !== "Antarctica")
                  .map((geo) => {
                    const feature = geo;
                    const name = feature.properties.name ?? "";
                    const item = countries?.find((c) => c.country.toLowerCase() === name.toLowerCase());

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => setSelected(name)}
                        style={{
                          default: {
                            fill: item ? "var(--color-accent)" : "var(--color-border)",
                            stroke: "var(--color-white)",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: "var(--color-accent)",
                            stroke: "var(--color-white)",
                            strokeWidth: 0.7,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: "var(--color-accent)",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </MapArea>

      <Details>
        <strong>{selectedCountry?.country ?? "Select a country"}</strong>

        {selectedCountry ? (
          <RoleStats>
            <RoleStat>
              <span>Total users</span>
              <strong>{selectedCountry.total}</strong>
            </RoleStat>
            <RoleStat>
              <span>Brokers</span>
              <strong>{selectedCountry.brokers}</strong>
            </RoleStat>
            <RoleStat>
              <span>Owners</span>
              <strong>{selectedCountry.owners}</strong>
            </RoleStat>
            <RoleStat>
              <span>Buyers</span>
              <strong>{selectedCountry.buyers}</strong>
            </RoleStat>
          </RoleStats>
        ) : (
          <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Click a country to view its user breakdown.</p>
        )}
      </Details>
    </MapGrid>
  );
}

const MapGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(150px, 300px);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Header = styled.header`
  padding: 2rem;
`;

const ZoomBtn = styled.div`
  display: flex;
  gap: 0.7rem;
  margin: 2rem 0;
  button {
    background: var(--color-border);
    border: none;
    color: var(--color-accent-600);
    padding: 0.35rem 1.25rem;
    font-size: 2rem;
  }
`;

const MapArea = styled.div`
  width: 100%;
  background-color: var(--color-white);

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Details = styled.div`
  padding: 16px;
  border-radius: 10px;
  background: var(--color-white);
`;

const RoleStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
`;

const RoleStat = styled.div`
  background: var(--color-white);
  padding: 10px;
  border-radius: 8px;

  span {
    display: block;
    color: var(--color-text-muted);
    font-size: 11px;
  }

  strong {
    display: block;
    margin-top: 5px;
    font-size: 18px;
  }
`;
