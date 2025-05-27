"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Cargar favoritos del localStorage
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`)
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } else {
      setFavorites([])
    }
  }, [isAuthenticated, user])

  const toggleFavorite = (providerId) => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para guardar favoritos")
      return
    }

    let newFavorites
    if (favorites.includes(providerId)) {
      newFavorites = favorites.filter((id) => id !== providerId)
    } else {
      newFavorites = [...favorites, providerId]
    }

    setFavorites(newFavorites)
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites))
  }

  return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>
}
