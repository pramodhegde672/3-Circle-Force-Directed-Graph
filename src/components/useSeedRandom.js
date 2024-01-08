import { useEffect, useMemo } from "react";
import seedrandom from "seedrandom";
import { faker, Faker } from "@faker-js/faker";

/**
 * The goal of this file is to seed random generators if the query params 'seed' is present.
 * As an example you can go to http://localhost:8000/components.html?seed=foo and refresh multiple times the page
 * you should have the result. This feature is mainly used for the E2E test.
 *
 * For now it :
 * - replace the global `Math.random` with a seed one
 * - seed the faker library
 */
export const useSeedRandom = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const seed = urlParams.get("seed");

  useEffect(() => {
    // Globally seed the Math.random
    if (seed) {
      seedrandom(seed, { global: true });
      // seed faker with the random function
      faker.seed(Math.random());
    }
  }, [seed]);

  const randomColor = useMemo(() => {
    return () => {
      const digits = "0123456789abcdef";
      let code = "#";
      for (let i = 0; i < 6; i++) {
        code += digits.charAt(Math.floor(Math.random() * 16));
      }
      return code;
    };
  }, []);

  return { faker, randomColor };
};
