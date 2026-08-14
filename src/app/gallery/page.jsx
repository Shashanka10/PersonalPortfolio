"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Images,
  RefreshCw,
} from "lucide-react";
import { getGalleryDocs, getImageUrl } from "@/lib/appwrite";
import Reveal from "@/components/Reveal/Reveal";
import Particles from "@/components/Particles/Particles";
import Image from "next/image";

function groupIntoSections(docs) {
  const map = {};
  docs.forEach((doc) => {
    const key = doc.section;
    if (!map[key]) {
      map[key] = {
        title: doc.section,
        emoji: doc.emoji || "",
        order: doc.order,
        slug: key.toLowerCase().replace(/\s+/g, "-"),
        photos: [],
      };
    }
    map[key].photos.push({
      url: getImageUrl(doc.fileId),
      caption: doc.caption || "",
      date: doc.date || "",
    });
  });
  return Object.values(map).sort((a, b) => a.order - b.order);
}

function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const photo = photos[currentIndex];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a]
          flex items-center justify-center text-gray-400 hover:text-white hover:border-[#12c971]/40
          transition-all duration-200 z-10"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full
        bg-[#1a1a1a] border border-[#2e2e2e] text-gray-400 text-xs font-mono z-10"
      >
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl border border-[#2e2e2e]
          bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-[#12c971]
          hover:border-[#12c971]/40 transition-all duration-200 z-10"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl border border-[#2e2e2e]
          bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-[#12c971]
          hover:border-[#12c971]/40 transition-all duration-200 z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Image */}
      <div
        className="relative max-w-4xl w-full mx-20 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.url}
          alt={photo.caption || "Gallery photo"}
          className="w-full max-h-[75vh] object-contain rounded-2xl"
        />
        {(photo.caption || photo.date) && (
          <div className="text-center space-y-1">
            {photo.caption && (
              <p className="text-gray-200 text-sm font-medium">
                {photo.caption}
              </p>
            )}
            {photo.date && (
              <p className="text-gray-600 text-xs font-mono">
                {new Date(photo.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoGrid({ photos, onPhotoClick }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-600 gap-3">
        <Images size={32} className="opacity-40" />
        <p className="text-sm font-mono">No photos in this section yet.</p>
        <p className="text-xs text-gray-700">
          Upload from your Appwrite dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
      {photos.map((photo, i) => (
        <Reveal key={i} delay={i * 40}>
          <div
            className="relative break-inside-avoid rounded-xl overflow-hidden h-[200px] lg:h-[250px] cursor-zoom-in
              border border-[#2e2e2e] hover:border-[#12c971]/40 transition-all duration-300 group mb-3"
            onClick={() => onPhotoClick(i)}
          >
            <Image
              src={photo.url}
              alt={photo.caption || `Photo ${i + 1}`}
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
              fill
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
              <div
                className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0
                group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              >
                {photo.caption && (
                  <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                    {photo.caption}
                  </p>
                )}
                {photo.date && (
                  <p className="text-gray-400 text-[10px] font-mono mt-0.5">
                    {new Date(photo.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                )}
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-7 h-7 rounded-lg bg-[#12c971]/20 border border-[#12c971]/40
                  flex items-center justify-center"
                >
                  <ZoomIn size={13} className="text-[#12c971]" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function SectionTab({ section, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border
        transition-all duration-300 whitespace-nowrap shrink-0
        ${
          active
            ? "bg-[#12c971] text-[#0d0d0d] border-[#12c971]"
            : "text-gray-400 border-[#2e2e2e] hover:border-[#12c971]/40 hover:text-white"
        }`}
    >
      {section.emoji && <span>{section.emoji}</span>}
      {section.title}
      <span
        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full
        ${active ? "bg-[#0d0d0d]/20 text-[#0d0d0d]" : "bg-[#2e2e2e] text-gray-500"}`}
      >
        {section.photos?.length || 0}
      </span>
    </button>
  );
}

function GallerySkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex gap-3 flex-wrap">
        {[100, 120, 90].map((w, i) => (
          <div
            key={i}
            className="h-9 rounded-full bg-[#222]"
            style={{ width: w }}
          />
        ))}
      </div>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
        {[180, 240, 160, 220, 200, 260, 180, 150].map((h, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-3 rounded-xl bg-[#222]"
            style={{ height: h }}
          />
        ))}
      </div>
    </div>
  );
}

const Gallery = () => {
  const [sections, setSections] = useState([]);
  const [activeSlug, setActiveSlug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const docs = await getGalleryDocs();
      const data = groupIntoSections(docs);
      setSections(data);
      if (data.length > 0) setActiveSlug((prev) => prev || data[0].slug);
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const activeSection = sections.find((s) => s.slug === activeSlug);
  const activePhotos = activeSection?.photos || [];

  const openLightbox = useCallback(
    (index) => setLightbox({ open: true, index }),
    [],
  );
  const closeLightbox = useCallback(
    () => setLightbox({ open: false, index: 0 }),
    [],
  );
  const prevPhoto = useCallback(
    () =>
      setLightbox((l) => ({
        ...l,
        index: (l.index - 1 + activePhotos.length) % activePhotos.length,
      })),
    [activePhotos.length],
  );
  const nextPhoto = useCallback(
    () =>
      setLightbox((l) => ({
        ...l,
        index: (l.index + 1) % activePhotos.length,
      })),
    [activePhotos.length],
  );

  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="relative w-full p-5 sm:px-12 md:p-16 lg:p-24 mt-8 md:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">
        <Particles count={20} />

        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(18,201,113,0.05) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 space-y-10">
          {/* ── HEADER ── */}
          <Reveal>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-[#12c971] font-mono text-xs tracking-[0.25em] uppercase">
                  — Memories
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-100 tracking-tight leading-tight">
                  Gallery
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  Moments captured in life.
                </p>
              </div>
              <button
                onClick={fetchGallery}
                title="Refresh gallery"
                className="p-2 rounded-xl border border-[#2e2e2e] text-gray-500 hover:text-[#12c971]
                  hover:border-[#12c971]/40 transition-all duration-300 mt-1 shrink-0"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </Reveal>

          {loading ? (
            <GallerySkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600 gap-3">
              <p className="text-sm font-mono">Could not load gallery.</p>
              <p className="text-xs text-gray-700">
                Check your Appwrite config in .env.local
              </p>
              <button
                onClick={fetchGallery}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2e2e2e]
                  text-gray-500 hover:text-[#12c971] hover:border-[#12c971]/40 text-xs font-mono
                  transition-all duration-300 mt-2"
              >
                <RefreshCw size={13} /> Try again
              </button>
            </div>
          ) : sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600 gap-2">
              <Images size={32} className="opacity-40" />
              <p className="text-sm font-mono">No photos yet.</p>
              <p className="text-xs text-gray-700">
                Add documents in your Appwrite collection.
              </p>
            </div>
          ) : (
            <>
              <Reveal delay={80}>
                <div className="flex flex-wrap gap-3">
                  {sections.map((section) => (
                    <SectionTab
                      key={section.slug}
                      section={section}
                      active={activeSlug === section.slug}
                      onClick={() => setActiveSlug(section.slug)}
                    />
                  ))}
                </div>
              </Reveal>
              <PhotoGrid photos={activePhotos} onPhotoClick={openLightbox} />
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#2e2e2e]" />
                <p className="text-gray-600 text-xs font-mono tracking-wider">
                  {activePhotos.length}{" "}
                  {activePhotos.length === 1 ? "photo" : "photos"}
                </p>
                <div className="h-px flex-1 bg-[#2e2e2e]" />
              </div>
            </>
          )}
        </div>

        {lightbox.open && activePhotos.length > 0 && (
          <Lightbox
            photos={activePhotos}
            currentIndex={lightbox.index}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
