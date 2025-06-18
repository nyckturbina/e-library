export function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2); // Converte 0-10 para 0-5
  return <span>{[...Array(5)].map((_, i) => (i < stars ? "★" : "☆"))}</span>;
}
