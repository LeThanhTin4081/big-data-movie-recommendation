"use client";

import { useEffect, useState } from "react";
import MovieRow from "./MovieRow";
import { Movie } from "@/lib/types";

export default function FavoriteMoviesRow() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFavs, setHasFavs] = useState(false);

  const fetchFavorites = async () => {
    try {
      const favIds = JSON.parse(localStorage.getItem("t3v_favorites") || "[]");
      if (favIds.length === 0) {
        setHasFavs(false);
        setFavorites([]);
        setLoading(false);
        return;
      }
      
      setHasFavs(true);
      const res = await fetch(`/api/movies?ids=${favIds.join(",")}`);
      const data = await res.json();
      setFavorites(data.movies || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();

    // Listen to custom event to update list when user hearts/unhearts
    const handleFavoritesUpdated = () => {
      fetchFavorites();
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdated);
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdated);
    };
  }, []);

  if (!hasFavs || favorites.length === 0) {
    return null;
  }

  return (
    <div className="relative z-10">
      <MovieRow
        title="Danh Sách Yêu Thích Của Bạn"
        subtitle="Những bộ phim bạn đã thả tim"
        movies={favorites}
        id="favorites"
        accentColor="bg-pink-500"
      />
    </div>
  );
}
