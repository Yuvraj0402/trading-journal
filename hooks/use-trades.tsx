"use client"

import { useState, useEffect } from "react"

export function useTrades() {
  const [trades, setTrades] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load trades from localStorage on initial render
  useEffect(() => {
    const loadTrades = () => {
      try {
        const savedTrades = localStorage.getItem("tradingJournalTrades")
        if (savedTrades) {
          setTrades(JSON.parse(savedTrades))
        }
      } catch (error) {
        console.error("Error loading trades:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTrades()
  }, [])

  // Save trades to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tradingJournalTrades", JSON.stringify(trades))
    }
  }, [trades, isLoading])

  const addTrade = (trade) => {
    setTrades((prevTrades) => [trade, ...prevTrades])
  }

  const updateTrade = (id, updatedTrade) => {
    setTrades((prevTrades) => prevTrades.map((trade) => (trade.id === id ? { ...trade, ...updatedTrade } : trade)))
  }

  const deleteTrade = (id) => {
    setTrades((prevTrades) => prevTrades.filter((trade) => trade.id !== id))
  }

  const clearAllTrades = () => {
    setTrades([])
  }

  const exportTrades = () => {
    const dataStr = JSON.stringify(trades, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `trading-journal-export-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importTrades = (importedTrades) => {
    if (Array.isArray(importedTrades)) {
      setTrades(importedTrades)
    }
  }

  return {
    trades,
    isLoading,
    addTrade,
    updateTrade,
    deleteTrade,
    clearAllTrades,
    exportTrades,
    importTrades,
  }
}
