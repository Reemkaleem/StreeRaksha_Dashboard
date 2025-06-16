"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Clock, MapPin, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CameraLocation {
  id: string
  name: string
  lat: number
  lng: number
  status: "online" | "offline" | "alert"
  alertLevel: "low" | "medium" | "high"
  lastSeen: string
}

const cameraLocations: CameraLocation[] = [
  {
    id: "1",
    name: "Main Street Junction",
    lat: 28.6139,
    lng: 77.209,
    status: "alert",
    alertLevel: "high",
    lastSeen: "2 min ago",
  },
  {
    id: "2",
    name: "Metro Station Exit",
    lat: 28.6129,
    lng: 77.2295,
    status: "online",
    alertLevel: "low",
    lastSeen: "1 min ago",
  },
  {
    id: "3",
    name: "University Campus Gate",
    lat: 28.6869,
    lng: 77.209,
    status: "offline",
    alertLevel: "low",
    lastSeen: "15 min ago",
  },
  {
    id: "4",
    name: "Shopping Complex Entrance",
    lat: 28.5355,
    lng: 77.391,
    status: "alert",
    alertLevel: "medium",
    lastSeen: "30 sec ago",
  },
  {
    id: "5",
    name: "Bus Terminal Platform",
    lat: 28.6692,
    lng: 77.2265,
    status: "online",
    alertLevel: "low",
    lastSeen: "3 min ago",
  },
  {
    id: "6",
    name: "Central Park Area",
    lat: 28.5921,
    lng: 77.2507,
    status: "alert",
    alertLevel: "high",
    lastSeen: "1 min ago",
  },
  {
    id: "7",
    name: "Hospital Main Gate",
    lat: 28.6304,
    lng: 77.2177,
    status: "online",
    alertLevel: "low",
    lastSeen: "2 min ago",
  },
  {
    id: "8",
    name: "Railway Station",
    lat: 28.6414,
    lng: 77.2214,
    status: "online",
    alertLevel: "low",
    lastSeen: "4 min ago",
  },
]

export function InteractiveMap() {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
  const [hoveredCamera, setHoveredCamera] = useState<string | null>(null)

  const getMarkerColor = (status: string, alertLevel: string) => {
    if (status === "offline") return "bg-slate-500 border-slate-400"
    if (status === "alert") {
      switch (alertLevel) {
        case "high":
          return "bg-red-500 border-red-400 shadow-red-500/50"
        case "medium":
          return "bg-amber-500 border-amber-400 shadow-amber-500/50"
        default:
          return "bg-orange-500 border-orange-400 shadow-orange-500/50"
      }
    }
    return "bg-emerald-500 border-emerald-400 shadow-emerald-500/50"
  }

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case "offline":
        return <Clock className="h-3 w-3 text-white" />
      case "alert":
        return <AlertTriangle className="h-3 w-3 text-white" />
      default:
        return <CheckCircle className="h-3 w-3 text-white" />
    }
  }

  const getStatusStats = () => {
    const online = cameraLocations.filter((c) => c.status === "online").length
    const alerts = cameraLocations.filter((c) => c.status === "alert").length
    const offline = cameraLocations.filter((c) => c.status === "offline").length
    return { online, alerts, offline }
  }

  const stats = getStatusStats()

  return (
    <Card className="bg-slate-900/95 border-slate-700/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            Surveillance Network Map
          </CardTitle>
          <Badge variant="outline" className="border-blue-400/50 text-blue-400">
            {cameraLocations.length} Cameras
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-slate-300">Online</span>
            </div>
            <div className="text-lg font-semibold text-emerald-400">{stats.online}</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-300">Alerts</span>
            </div>
            <div className="text-lg font-semibold text-red-400">{stats.alerts}</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
              <span className="text-xs text-slate-300">Offline</span>
            </div>
            <div className="text-lg font-semibold text-slate-400">{stats.offline}</div>
          </div>
        </div>

        {/* Map Container - Increased height */}
        <div className="relative bg-slate-800/30 rounded-lg h-[500px] border border-slate-700/50 overflow-hidden">
          {/* Map Background */}
          <div
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{
              backgroundImage: "url('/placeholder.svg?height=500&width=800&text=Delhi+NCR+Map+View')",
              filter: "brightness(0.4) contrast(1.2)",
            }}
          />

          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Camera Markers */}
          {cameraLocations.map((camera, index) => (
            <div
              key={camera.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                selectedCamera === camera.id ? "scale-125 z-20" : hoveredCamera === camera.id ? "scale-110 z-10" : "z-5"
              }`}
              style={{
                left: `${15 + (index % 4) * 20}%`,
                top: `${15 + Math.floor(index / 4) * 25}%`,
              }}
              onClick={() => setSelectedCamera(selectedCamera === camera.id ? null : camera.id)}
              onMouseEnter={() => setHoveredCamera(camera.id)}
              onMouseLeave={() => setHoveredCamera(null)}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 ${getMarkerColor(camera.status, camera.alertLevel)} 
                flex items-center justify-center shadow-lg transition-all duration-300
                ${camera.status === "alert" ? "animate-pulse" : ""}
                ${selectedCamera === camera.id || hoveredCamera === camera.id ? "shadow-xl" : ""}`}
              >
                {getMarkerIcon(camera.status)}
              </div>

              {/* Ripple Effect for Alerts */}
              {camera.status === "alert" && (
                <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-30"></div>
              )}

              {/* Info Tooltip */}
              {(selectedCamera === camera.id || hoveredCamera === camera.id) && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white p-3 rounded-lg text-xs whitespace-nowrap z-30 border border-slate-700/50 shadow-xl">
                  <div className="font-semibold text-slate-100">{camera.name}</div>
                  <div className="text-slate-300 mt-1">Status: {camera.status}</div>
                  <div className="text-slate-400">Last seen: {camera.lastSeen}</div>
                  {camera.status === "alert" && (
                    <div className="text-red-400 mt-1 flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Alert Level: {camera.alertLevel}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend - Moved down and made more compact */}
        <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50 mt-4">
          <div className="text-xs font-medium text-slate-300 mb-2">Legend</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full border border-emerald-400"></div>
              <span className="text-slate-400">Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full border border-red-400"></div>
              <span className="text-slate-400">High Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full border border-amber-400"></div>
              <span className="text-slate-400">Medium Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-500 rounded-full border border-slate-400"></div>
              <span className="text-slate-400">Offline</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
