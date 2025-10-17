"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { footerLinks, contentData } from "@/lib/data";
import "../styles/Footer.css";
import Image from "next/image";
import footerLogo from "../public/footer-logo.svg";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showAjabNews, setShowAjabNews] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="text-white footer-bg relative">
      <div className="tree-icon"></div>
      <div className=" pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="footer-content-max-width mx-auto">
          <div className="footer-inner">
            {/* About Section */}
            <div className="footer-content">
              <h3 className="footer-heading-text">About</h3>
              <p className="text-gray">
                Ajab Shahar is a wondrous city of songs, poems and conversations
                from Bhakti, Sufi and Baul oral traditions from India and
                beyond.
              </p>
              <div className="mt-6">
                <h3 className="footer-heading-text">Support</h3>
                <p className="text-gray max-w-[70%]">
                  If you have found joy and value here, consider supporting this
                  work.
                </p>
              </div>
            </div>

            {/* Stay Connected */}
            <div className="footer-content">
              <h3 className="footer-heading-text">
                <Link href="/ajab-news" className="pink">
                  Ajab News
                </Link>
              </h3>
              <p className="text-gray mb-4">
                To receive news, inspirations and more from us...
              </p>

              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  id="email-subscrib"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-800 text-white border-0 rounded-l focus:outline-none email-input"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-800 text-white rounded-r transition-colors cursor-pointer email-subscribe"
                >
                  Subscribe
                </button>
              </form>

              <div className="mt-4">
                <p className="text-gray text-sm mb-2">
                  Write to us at{" "}
                  <a href="mailto:ajabshahar@gmail.com" className="pink">
                    ajabshahar@gmail.com
                  </a>
                </p>
                <p className="text-gray text-sm">
                  Follow us on{" "}
                  {footerLinks.social.map((link, index) => (
                    <span key={link.name}>
                      <a href={link.href} className="pink">
                        {link.name}
                      </a>
                      {index < footerLinks.social.length - 1 && " | "}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-content flex flex-col gap-3">
              {footerLinks.main.map((link) =>
                link.name === "Ajab News" ? (
                  <button
                    key={link.name}
                    onClick={() => setShowAjabNews(true)}
                    className="pink  transition-colors text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="pink text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 footer-border text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={footerLogo}
                alt="Ajab Shahar"
                width={130}
                height={130}
              />
            </div>
            <p className="text-gray-400 text-xs footer-text">
              Website Design <span>Smriti Chanchani</span> | Created by the
              <span> Kabir Project</span> at{" "}
              <span> Shabad Dhun Foundation</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
