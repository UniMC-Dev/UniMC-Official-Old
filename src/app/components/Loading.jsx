"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-circle">
        <img
          src={'./logo.png'}
          alt="UniMC Logo"
          width={80}
          height={80}
          className="logo-image"
          draggable="false"
          loading="lazy"
          style={{ background: 'transparent' }}
        />
      </div>

      <style jsx>{`
        .loading-wrapper {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(315deg, #b8d0ffff 5%, #fff 80%, #fff 80%);
        }

        .loading-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-circle::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 8px solid #e6f3ff;
          border-top-color: #274B93;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        :global(.logo-image) {
          border-radius: 50%;
          z-index: 1;
        }

        :global(*) {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :global(html, body) {
          --primary-color: #274B93;
          width: 100%;
          height: 100%;
          font-family: 'Open Sans', sans-serif;
          font-size: 16px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Loading;