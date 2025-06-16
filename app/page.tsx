"use client"

import { useState, useEffect } from "react"
import { Camera, Shield, History, Settings, Bell, Maximize2, X, Play, Pause, Monitor, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { InteractiveMap } from "@/components/interactive-map"
import { DistressDetectionPanel } from "@/components/distress-detection-panel"
import { AlertFrequencyChart } from "@/components/alert-frequency-chart"

interface CCTVFeed {
  id: string
  name: string
  location: string
  status: "live" | "offline"
  hasAlert: boolean
  alertType?: "distress" | "suspicious" | "emergency"
  streamUrl: string
  quality: "HD" | "4K" | "SD"
  lastUpdate: string
}

const cctvFeeds: CCTVFeed[] = [
  {
    id: "1",
    name: "Main Junction Cam-01",
    location: "Sector 15, Noida",
    status: "live",
    hasAlert: true,
    alertType: "distress",
    streamUrl: "/placeholder.svg?height=240&width=320&text=LIVE+FEED+01",
    quality: "4K",
    lastUpdate: "2 min ago",
  },
  {
    id: "2",
    name: "Metro Station Cam-02",
    location: "Connaught Place",
    status: "live",
    hasAlert: false,
    streamUrl: "/placeholder.svg?height=240&width=320&text=LIVE+FEED+02",
    quality: "HD",
    lastUpdate: "1 min ago",
  },
  {
    id: "3",
    name: "University Gate Cam-03",
    location: "DU North Campus",
    status: "offline",
    hasAlert: false,
    streamUrl: "/placeholder.svg?height=240&width=320&text=OFFLINE",
    quality: "HD",
    lastUpdate: "15 min ago",
  },
  {
    id: "4",
    name: "Shopping Complex Cam-04",
    location: "Saket District",
    status: "live",
    hasAlert: true,
    alertType: "suspicious",
    streamUrl: "/placeholder.svg?height=240&width=320&text=LIVE+FEED+04",
    quality: "4K",
    lastUpdate: "30 sec ago",
  },
  {
    id: "5",
    name: "Bus Terminal Cam-05",
    location: "ISBT Kashmere Gate",
    status: "live",
    hasAlert: false,
    streamUrl: "/placeholder.svg?height=240&width=320&text=LIVE+FEED+05",
    quality: "HD",
    lastUpdate: "3 min ago",
  },
  {
    id: "6",
    name: "Central Park Cam-06",
    location: "Lodhi Gardens",
    status: "live",
    hasAlert: true,
    alertType: "emergency",
    streamUrl: "/placeholder.svg?height=240&width=320&text=LIVE+FEED+06",
    quality: "4K",
    lastUpdate: "1 min ago",
  },
]

export default function SreeRakshaDashboard() {
  const [selectedFeed, setSelectedFeed] = useState<CCTVFeed | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalCameras] = useState(24)
  const [onlineCameras] = useState(21)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const openFeedModal = (feed: CCTVFeed) => {
    setSelectedFeed(feed)
    setIsModalOpen(true)
  }

  const closeFeedModal = () => {
    setIsModalOpen(false)
    setSelectedFeed(null)
  }

  const getAlertColor = (alertType?: string) => {
    switch (alertType) {
      case "emergency":
        return "bg-red-600/20 border-red-500/50 text-red-400"
      case "distress":
        return "bg-orange-600/20 border-orange-500/50 text-orange-400"
      case "suspicious":
        return "bg-amber-600/20 border-amber-500/50 text-amber-400"
      default:
        return "bg-slate-600/20 border-slate-500/50 text-slate-400"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "4K":
        return "text-emerald-400"
      case "HD":
        return "text-blue-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Full page wrapper with dark background */}
      <div className="w-full bg-slate-950">
        {/* Simplified Header */}
        <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 shadow-xl sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Authority Control Center
                  </h1>
                  <p className="text-sm text-slate-400 font-medium">Women Safety Surveillance Network</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {/* Time Display */}
                <div className="text-right px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="font-mono text-lg font-bold text-slate-200">{currentTime.toLocaleTimeString()}</div>
                  <div className="text-xs text-slate-400">{currentTime.toLocaleDateString()}</div>
                </div>

                {/* Brand */}
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    SreeRaksha
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Authority Dashboard v2.1</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area with dark background */}
        <div className="flex min-h-[calc(100vh-100px)] bg-slate-950">
          {/* Left Section - CCTV Feeds */}
          <div className="w-[40%] flex flex-col bg-slate-950">
            {/* CCTV Grid */}
            <div className="flex-1 p-6 bg-slate-950">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">Live Surveillance Feeds</h2>
                  <p className="text-sm text-slate-400 mt-1">Real-time monitoring across all zones</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-800">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-800">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 min-h-[calc(100vh-300px)]">
                {cctvFeeds.map((feed) => (
                  <Card
                    key={feed.id}
                    className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                    onClick={() => openFeedModal(feed)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={feed.streamUrl || "/placeholder.svg"}
                          alt={feed.name}
                          className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Status Overlays */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge
                            className={`${feed.status === "live" ? "bg-red-600/90 border-red-500/50 text-white" : "bg-slate-600/90 border-slate-500/50 text-slate-200"} text-xs font-medium backdrop-blur-sm`}
                          >
                            {feed.status === "live" ? "🔴 LIVE" : "⚫ OFFLINE"}
                          </Badge>
                          <Badge
                            className={`${getQualityColor(feed.quality)} bg-slate-900/80 border-slate-700/50 text-xs backdrop-blur-sm`}
                          >
                            {feed.quality}
                          </Badge>
                        </div>

                        {/* Alert Badge */}
                        {feed.hasAlert && (
                          <div className="absolute top-3 right-3">
                            <Badge
                              className={`${getAlertColor(feed.alertType)} text-xs font-medium animate-pulse backdrop-blur-sm`}
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              ALERT
                            </Badge>
                          </div>
                        )}

                        {/* Expand Icon */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50">
                            <Maximize2 className="h-4 w-4 text-slate-300" />
                          </div>
                        </div>

                        {/* Last Update */}
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            variant="outline"
                            className="bg-slate-900/80 border-slate-700/50 text-slate-300 text-xs backdrop-blur-sm"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {feed.lastUpdate}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-800/50">
                        <h3 className="font-semibold text-slate-100 text-sm mb-1">{feed.name}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Monitor className="h-3 w-3" />
                          {feed.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bottom Left - Distress Detection - Fixed height */}
            <div className="h-96 p-6 pt-0 bg-slate-950">
              <DistressDetectionPanel />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[60%] flex flex-col bg-slate-950">
            {/* Top Right - Interactive Map - Increased height */}
            <div className="flex-1 p-6 bg-slate-950 min-h-[calc(100vh-480px)]">
              <InteractiveMap />
            </div>

            {/* Bottom Right - Alert Frequency - Fixed height */}
            <div className="h-96 p-6 pt-0 bg-slate-950">
              <AlertFrequencyChart />
            </div>
          </div>
        </div>

        {/* Extra space to ensure scrolling shows dark background */}
        <div className="h-20 bg-slate-950"></div>
      </div>

      {/* Enhanced CCTV Feed Modal */}
      {isModalOpen && selectedFeed && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <Camera className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{selectedFeed.name}</h2>
                  <p className="text-slate-400 flex items-center gap-2 mt-1">
                    <Monitor className="h-4 w-4" />
                    {selectedFeed.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  className={`${selectedFeed.status === "live" ? "bg-red-600/20 border-red-500/50 text-red-400" : "bg-slate-600/20 border-slate-500/50 text-slate-400"} backdrop-blur-sm`}
                >
                  {selectedFeed.status === "live" ? "🔴 LIVE STREAM" : "⚫ OFFLINE"}
                </Badge>
                <Badge
                  className={`${getQualityColor(selectedFeed.quality)} bg-slate-800/50 border-slate-700/50 backdrop-blur-sm`}
                >
                  {selectedFeed.quality} Quality
                </Badge>
                {selectedFeed.hasAlert && (
                  <Badge className={`${getAlertColor(selectedFeed.alertType)} animate-pulse backdrop-blur-sm`}>
                    <Zap className="h-4 w-4 mr-1" />
                    {selectedFeed.alertType?.toUpperCase()} ALERT
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeFeedModal}
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 bg-slate-900/95">
              <div className="relative mb-6 rounded-xl overflow-hidden border border-slate-700/50">
                <img
                  src={selectedFeed.streamUrl || "/placeholder.svg"}
                  alt="Expanded Feed"
                  className="w-full h-[500px] object-cover bg-slate-800"
                />

                {/* Stream Overlays */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-red-600/90 text-white animate-pulse backdrop-blur-sm">🔴 LIVE RECORDING</Badge>
                  <Badge className="bg-slate-900/80 text-slate-300 backdrop-blur-sm">
                    {currentTime.toLocaleTimeString()}
                  </Badge>
                </div>

                {selectedFeed.hasAlert && (
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={`${getAlertColor(selectedFeed.alertType)} animate-pulse backdrop-blur-sm text-lg px-3 py-2`}
                    >
                      ⚠️ {selectedFeed.alertType?.toUpperCase()} DETECTED
                    </Badge>
                  </div>
                )}

                {/* Stream Controls */}
                <div className="absolute bottom-4 left-4 flex gap-3">
                  <Button
                    size="sm"
                    className="bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/50"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/50"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                </div>

                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-slate-900/80 text-slate-300 backdrop-blur-sm">
                    Last Update: {selectedFeed.lastUpdate}
                  </Badge>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="grid grid-cols-5 gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 border border-blue-500/50">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Evidence
                </Button>
                <Button variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-600/10">
                  <Bell className="h-4 w-4 mr-2" />
                  Alert Response Team
                </Button>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-800">
                  <History className="h-4 w-4 mr-2" />
                  View Timeline
                </Button>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Camera Settings
                </Button>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-800">
                  <Monitor className="h-4 w-4 mr-2" />
                  Full Screen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
