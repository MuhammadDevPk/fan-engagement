"use client"

import React, { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { Plus, Minus, Maximize, RefreshCcw } from "lucide-react"

// URL to a valid TopoJSON file
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const mockData = [
  { id: "USA", value: 456, name: "United States" },
  { id: "GBR", value: 267, name: "United Kingdom" },
  { id: "JPN", value: 234, name: "Japan" },
  { id: "SGP", value: 198, name: "Singapore" },
  { id: "DEU", value: 120, name: "Germany" },
  { id: "FRA", value: 110, name: "France" },
  { id: "CAN", value: 90, name: "Canada" },
  { id: "BRA", value: 80, name: "Brazil" },
  { id: "AUS", value: 70, name: "Australia" },
  { id: "IND", value: 60, name: "India" },
]

const colorScale = scaleLinear<string>()
  .domain([0, 500])
  .range(["#2D2640", "#8b5cf6"])

export default function GeographicHeatmap() {
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 })
  const [activeCountry, setActiveCountry] = useState<any>(null)

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }))
  }

  const handleMoveEnd = (position: any) => {
    setPosition(position)
  }

  return (
    <div className="relative h-[400px] w-full bg-white/5 rounded-xl border border-white/10 overflow-hidden group">
      <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md rounded-lg p-2 flex flex-col gap-2 border border-white/10">
        <button onClick={handleZoomIn} className="p-1 hover:bg-white/10 rounded transition-colors text-white">
          <Plus size={16} />
        </button>
        <button onClick={handleZoomOut} className="p-1 hover:bg-white/10 rounded transition-colors text-white">
          <Minus size={16} />
        </button>
        <div className="h-px bg-white/10 my-1" />
        <button 
            onClick={() => setPosition({ coordinates: [0, 20], zoom: 1 })}
            className="p-1 hover:bg-white/10 rounded transition-colors text-white"
        >
            <RefreshCcw size={16} />
        </button>
      </div>

      <ComposableMap projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}>
        <ZoomableGroup 
            zoom={position.zoom} 
            center={position.coordinates as [number, number]} 
            onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = mockData.find(s => s.id === geo.id || (geo.properties && geo.properties.iso_a3 === s.id)) // Fallback matches
                // Note: standard world-atlas 110m typically uses numeric IDs or ISO codes in properties.
                // We'll simplistic match or minimal logic. In real world we check properties.
                
                // For demonstration with world-atlas, we might need to map numeric IDs to ISO. 
                // Because `ctry_110m` often has ISO_A3.
                // Let's assume the mockData IDs match the geo properties (e.g. ISO_A3).
                const iso = geo.properties.ISO_A3 || geo.properties.iso_a3
                const countryData = mockData.find(d => d.id === iso)

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryData ? colorScale(countryData.value) : "#1f1b2e"}
                    stroke="#2D2042"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#a78bfa", outline: "none", transition: 'all 0.3s' },
                      pressed: { fill: "#7c3aed", outline: "none" },
                    }}
                    onMouseEnter={() => {
                       if (countryData) setActiveCountry(countryData)
                    }}
                    onMouseLeave={() => {
                        setActiveCountry(null)
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Custom Floating Tooltip-ish Overlay */}
      {activeCountry && (
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg z-20 shadow-xl">
             <div className="flex items-center gap-2 mb-1">
                 <span className="font-bold text-white">{activeCountry.name}</span>
                 <span className="text-xs px-1.5 py-0.5 rounded bg-brand-primary/20 text-brand-primary border border-brand-primary/20">Top Market</span>
             </div>
             <div className="text-sm text-gray-300">
                 Sales Volume: <span className="text-white font-mono">{activeCountry.value}</span>
             </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 text-xs text-gray-400">
        <span>Low</span>
        <div className="h-2 w-20 rounded-full bg-gradient-to-r from-[#2D2640] to-[#8b5cf6]" />
        <span>High</span>
      </div>
    </div>
  )
}
