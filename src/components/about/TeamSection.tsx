"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

import { teamMembers } from "@/data/testimonials";

export default function TeamSection() {
  return (
    <section className="bg-cream-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
            The Experts Behind Every Bloom
          </p>

          <h2 className="font-display text-3xl font-bold text-sage-900 md:text-4xl">
            Meet Our Team
          </h2>

          <p className="mx-auto mt-2 max-w-xl font-body text-sage-500">
            Passionate floral artists and industry experts dedicated to
            creating extraordinary experiences.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-3xl bg-cream-200 shadow-soft transition-all duration-300 group-hover:shadow-card">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Social Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-blush-700/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Instagram`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}

                  {member.social.facebook && (
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Facebook`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}

                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold text-sage-900">
                {member.name}
              </h3>

              <p className="mt-0.5 mb-2 font-body text-sm font-medium text-blush-600">
                {member.role}
              </p>

              <p className="line-clamp-3 font-body text-xs leading-relaxed text-sage-500">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}