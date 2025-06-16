"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AlertData {
  hour: string
  alerts: number
  resolved: number
  pending: number
}

const mockAlertData: AlertData[] = [
  { hour: "00:00", alerts: 2, resolved: 1, pending: 1 },
  { hour: "04:00", alerts: 1, resolved: 1, pending: 0 },
  { hour: "08:00", alerts: 5, resolved: 3, pending: 2 },
  { hour: "12:00", alerts: 8, resolved: 6, pending: 2 },
  { hour: "16:00", alerts: 12, resolved: 9, pending: 3 },
  { hour: "20:00", alerts: 15, resolved: 11, pending: 4 },
]

export function AlertFrequencyChart() {
  const [alertData, setAlertData] = useState<AlertData[]>(mockAlertData)
  const [totalAlerts, setTotalAlerts] = useState(43)
  const [resolvedAlerts, setResolvedAlerts] = useState(31)
  const [avgResponseTime, setAvgResponseTime] = useState(4.2)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalAlerts((prev) => prev + Math.floor(Math.random() * 2))
      setResolvedAlerts((prev) => prev + Math.floor(Math.random() * 2))
      setAvgResponseTime((prev) => Math.max(2, Math.min(8, prev + (Math.random() - 0.5) * 0.5)))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const maxAlerts = Math.max(...alertData.map((d) => d.alerts))
  const resolutionRate = Math.round((resolvedAlerts / totalAlerts) * 100)
  const pendingAlerts = totalAlerts - resolvedAlerts

  return (
    <Card className="bg-slate-900/95 border-slate-700/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Alert Analytics Dashboard
          </CardTitle>
          <Badge variant="outline" className="border-blue-400/50 text-blue-400">
            24H Overview
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Total Alerts</p>
                  <p className="text-xl font-bold text-red-400">{totalAlerts}</p>
                  <p className="text-xs text-slate-500">+3 from yesterday</p>
                </div>
                <TrendingUp className="h-5 w-5 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Resolved</p>
                  <p className="text-xl font-bold text-emerald-400">{resolvedAlerts}</p>
                  <p className="text-xs text-slate-500">+5 from yesterday</p>
                </div>
                <TrendingDown className="h-5 w-5 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Resolution Rate</p>
                  <p className="text-xl font-bold text-blue-400">{resolutionRate}%</p>
                  <p className="text-xs text-slate-500">+2% improvement</p>
                </div>
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Avg Response</p>
                  <p className="text-xl font-bold text-amber-400">{avgResponseTime.toFixed(1)}m</p>
                  <p className="text-xs text-slate-500">-0.3m improvement</p>
                </div>
                <Activity className="h-5 w-5 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Pattern Chart */}
        <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-200">24-Hour Alert Pattern</h4>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-slate-400">Total Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span className="text-slate-400">Resolved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded"></div>
                <span className="text-slate-400">Pending</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between h-40 gap-3">
            {alertData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div
                  className="w-full bg-slate-700/30 rounded-t relative transition-all duration-500 hover:bg-slate-700/50"
                  style={{ height: "120px" }}
                >
                  {/* Total alerts bar */}
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 to-red-500 rounded-t transition-all duration-700 opacity-80 group-hover:opacity-100"
                    style={{ height: `${(data.alerts / maxAlerts) * 100}%` }}
                  />
                  {/* Resolved alerts bar */}
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-500 rounded-t transition-all duration-700 opacity-90"
                    style={{ height: `${(data.resolved / maxAlerts) * 100}%` }}
                  />
                  {/* Pending alerts indicator */}
                  {data.pending > 0 && (
                    <div
                      className="absolute w-full bg-gradient-to-t from-amber-600 to-amber-500 rounded-t transition-all duration-700"
                      style={{
                        height: `${(data.pending / maxAlerts) * 100}%`,
                        bottom: `${(data.resolved / maxAlerts) * 100}%`,
                      }}
                    />
                  )}

                  {/* Hover tooltip */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-white p-2 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-slate-700/50 backdrop-blur-sm">
                    <div>Total: {data.alerts}</div>
                    <div>Resolved: {data.resolved}</div>
                    <div>Pending: {data.pending}</div>
                  </div>
                </div>
                <span className="text-xs text-slate-400 mt-2 font-mono">{data.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{pendingAlerts}</div>
              <div className="text-xs text-slate-400 mt-1">Pending Alerts</div>
              <div className="text-xs text-red-400 mt-1">Requires Attention</div>
            </div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{Math.round(avgResponseTime * 60)}s</div>
              <div className="text-xs text-slate-400 mt-1">Avg Response</div>
              <div className="text-xs text-emerald-400 mt-1">Within Target</div>
            </div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">98.2%</div>
              <div className="text-xs text-slate-400 mt-1">System Uptime</div>
              <div className="text-xs text-blue-400 mt-1">Excellent</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
