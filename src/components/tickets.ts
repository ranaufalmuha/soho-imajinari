/**
 * Tujuan tombol "Get Tickets" di seluruh situs.
 *
 * Satu-satunya sumber kebenaran URL tiket — semua tombol tiket mengimpor
 * dari sini supaya tidak ada yang menunjuk ke URL lama saat diganti.
 * Ganti nilainya saja bila film yang sedang tayang berpindah.
 */

// Tiket film yang sedang tayang (Pulang Kampung) via TIX.ID.
export const TICKETS_URL =
  "https://app.tix.id/movie-detail?movieId=2109544621762756608&uri_scheme_data=1.bW92aWU_bW92aWVfaWQ9MjEwOTU0NDYyMTc2Mjc1NjYwOCZldmVudF9pZD0yMTA5NTQ0NjIyNzI3NDQ2NTI4&utm_campaign=pulang-kampung&utm_medium=whatsapp&utm_source=app";
