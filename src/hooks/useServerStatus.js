import { useState, useEffect, useRef } from "react";

// Simple in-memory cache for API responses
const statusCache = new Map();
const CACHE_DURATION = 60000; // 60 seconds

export function useServerStatus(serverIp) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchStatus = async () => {
      // Check cache first
      const cached = statusCache.get(serverIp);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        if (isMountedRef.current) {
          setStatus(cached.data);
          setLoading(false);
        }
        return;
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response = await fetch(
          `https://api.mcsrvstat.us/3/${serverIp}`,
          { signal: controller.signal }
        );

        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        // Cache the result
        statusCache.set(serverIp, {
          data,
          timestamp: Date.now(),
        });

        if (isMountedRef.current) {
          setStatus(data);
          setError(null);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err.message || "Failed to fetch server status");
          setStatus(null);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchStatus();

    return () => {
      isMountedRef.current = false;
    };
  }, [serverIp]);

  const refresh = async () => {
    // Clear cache for this server
    statusCache.delete(serverIp);
    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(
        `https://api.mcsrvstat.us/3/${serverIp}`,
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      statusCache.set(serverIp, {
        data,
        timestamp: Date.now(),
      });

      if (isMountedRef.current) {
        setStatus(data);
        setError(null);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message || "Failed to fetch server status");
        setStatus(null);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return { status, loading, error, refresh };
}
