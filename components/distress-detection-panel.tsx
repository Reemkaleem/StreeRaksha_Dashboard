"use client"

import { useState, useEffect } from "react"
import { User, Clock, MapPin, Shield, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DistressAlert {
  id: string
  cameraId: string
  cameraName: string
  location: string
  gestureType: "help_signal" | "distress_call" | "panic_gesture" | "isolation_detected"
  timestamp: string
  severity: "low" | "medium" | "high"
  status: "active" | "acknowledged" | "resolved"
  confidence: number
}

const mockDistressAlerts: DistressAlert[] = [
  {
    id: "1",
    cameraId: "CAM001",
    cameraName: "Main Street Junction",
    location: "Sector 15, Noida",
    gestureType: "help_signal",
    timestamp: "2 min ago",
    severity: "high",
    status: "active",
    confidence: 94,
  },
  {
    id: "2",
    cameraId: "CAM004",
    cameraName: "Shopping Complex",
    location: "Saket, Delhi",
    gestureType: "isolation_detected",
    timestamp: "5 min ago",
    severity: "medium",
    status: "acknowledged",
    confidence: 87,
  },
  {
    id: "3",
    cameraId: "CAM006",
    cameraName: "Park Area",
    location: "Lodhi Gardens",
    gestureType: "panic_gesture",
    timestamp: "8 min ago",
    severity: "high",
    status: "active",
    confidence: 91,
  },
]

export function DistressDetectionPanel() {
  const [alerts, setAlerts] = useState<DistressAlert[]>(mockDistressAlerts)
  const [isolatedFemales, setIsolatedFemales] = useState(3)
  const [detectionAccuracy, setDetectionAccuracy] = useState(92)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsolatedFemales((prev) => Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
      setDetectionAccuracy((prev) => Math.max(85, Math.min(98, prev + Math.floor(Math.random() * 6) - 3)))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 border-red-500/50 text-red-400"
      case "medium":
        return "bg-amber-500/20 border-amber-500/50 text-amber-400"
      default:
        return "bg-blue-500/20 border-blue-500/50 text-blue-400"
    }
  }

  const getGestureIcon = (gestureType: string) => {
    switch (gestureType) {
      case "help_signal":
        return "🆘"
      case "distress_call":
        return "📢"
      case "panic_gesture":
        return "⚠️"
      case "isolation_detected":
        return "👤"
      default:
        return "🚨"
    }
  }

  const getGestureLabel = (gestureType: string) => {
    switch (gestureType) {
      case "help_signal":
        return "Help Signal Detected"
      case "distress_call":
        return "Distress Call"
      case "panic_gesture":
        return "Panic Gesture"
      case "isolation_detected":
        return "Isolated Individual"
      default:
        return "Unknown Alert"
    }
  }

  const activeAlerts = alerts.filter((a) => a.status === "active").length

  return (
    <Card className="bg-slate-900/95 border-slate-700/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-red-400" />
            Threat Detection System
          </CardTitle>
          <Badge variant="destructive" className="bg-red-600/20 border-red-500/50 text-red-400">
            {activeAlerts} Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Isolated Individuals</p>
                  <p className="text-xl font-bold text-amber-400">{isolatedFemales}</p>
                </div>
                <User className="h-5 w-5 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Detection Accuracy</p>
                  <p className="text-xl font-bold text-emerald-400">{detectionAccuracy}%</p>
                </div>
                <Activity className="h-5 w-5 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Confidence Meter */}
        <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">AI Detection Confidence</span>
            <span className="text-sm text-slate-400">{detectionAccuracy}%</span>
          </div>
          <Progress value={detectionAccuracy} className="h-2" />
        </div>

        {/* Active Alerts - Fixed spacing and height */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-200">Recent Detections</h4>
            <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
              Last 30 min
            </Badge>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`${getSeverityColor(alert.severity)} border transition-all duration-200 hover:scale-[1.01]`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-lg">{getGestureIcon(alert.gestureType)}</div>
                      <div>
                        <div className="font-medium text-slate-100 text-sm">{getGestureLabel(alert.gestureType)}</div>
                        <div className="text-xs text-slate-400">{alert.cameraName}</div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        alert.severity === "high"
                          ? "border-red-500/50 text-red-400"
                          : alert.severity === "medium"
                            ? "border-amber-500/50 text-amber-400"
                            : "border-blue-500/50 text-blue-400"
                      }`}
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-400">Confidence: {alert.confidence}%</div>
                      <Badge variant={alert.status === "active" ? "destructive" : "secondary"} className="text-xs">
                        {alert.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
