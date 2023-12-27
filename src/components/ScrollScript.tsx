"use client";
import React, { useEffect } from "react";

export const ScrollScript = () => {
  useEffect(() => {
    const header = document.getElementById("header__con");
    if (!header) return;
    window.onscroll = function () {
      let top = window.pageXOffset
        ? window.pageXOffset
        : document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
      header.style.backgroundColor = `rgba(255,255,255,${top / 100})`;
    };
  });
  return <></>;
};
