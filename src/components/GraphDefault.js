import React, { useEffect, useState } from "react";

import Graph from "graphology";
import {
  useSigma,
  useRegisterEvents,
  useLoadGraph,
  useSetSettings,
} from "@react-sigma/core";

import { useSeedRandom } from "./useSeedRandom";

function interpolateColor(color1, color2, factor) {
  const hex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const interpolateChannel = (channel1, channel2) => {
    return Math.round(channel1 + factor * (channel2 - channel1));
  };

  const rgb1 = [
    parseInt(color1.slice(1, 3), 16),
    parseInt(color1.slice(3, 5), 16),
    parseInt(color1.slice(5, 7), 16),
  ];

  const rgb2 = [
    parseInt(color2.slice(1, 3), 16),
    parseInt(color2.slice(3, 5), 16),
    parseInt(color2.slice(5, 7), 16),
  ];

  const interpolatedRgb = [
    interpolateChannel(rgb1[0], rgb2[0]),
    interpolateChannel(rgb1[1], rgb2[1]),
    interpolateChannel(rgb1[2], rgb2[2]),
  ];

  return `#${hex(interpolatedRgb[0])}${hex(interpolatedRgb[1])}${hex(
    interpolatedRgb[2]
  )}`;
}

export const GraphDefault = ({ order, probability }) => {
  const { faker, randomColor } = useSeedRandom();
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const setSettings = useSetSettings();
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    // Create the graph
    const graph = new Graph();
    const innerCircleRadius = 50;
    const middleCircleRadius = 150;
    const outerCircleRadius = 250;

    for (let i = 0; i < order; i++) {
      const angle = (2 * Math.PI * i) / order;

      const innerX = innerCircleRadius * Math.cos(angle);
      const innerY = innerCircleRadius * Math.sin(angle);

      const middleX = middleCircleRadius * Math.cos(angle);
      const middleY = middleCircleRadius * Math.sin(angle);

      const outerX = outerCircleRadius * Math.cos(angle);
      const outerY = outerCircleRadius * Math.sin(angle);

      // Generate a random color
      const randomFactor = Math.random();
      const color1 = "#74A1EF";
      const color2 = "#133C84";
      const color3 = "#F80000";
      const color4 = "#B228F2";
      const color5 = "#F8CB23";
      const color6 = "#F88923";
      const randomColorValue1 = interpolateColor(color1, color2, randomFactor);
      const randomColorValue2 = interpolateColor(color4, color3, randomFactor);
      const randomColorValue3 = interpolateColor(color5, color6, randomFactor);

      graph.addNode(i, {
        label: i.toString(),
        size: 10, // Adjust size as needed
        x: innerX,
        y: innerY,
        color: randomColorValue3,
      });

      graph.addNode(`middle_${i}`, {
        label: i.toString(),
        size: 15, // Adjust size as needed
        x: middleX,
        y: middleY,
        color: randomColorValue2,
      });

      graph.addNode(`outer_${i}`, {
        label: i.toString(),
        size: 20, // Adjust size as needed
        x: outerX,
        y: outerY,
        color: randomColorValue1,
      });

      // Add directed edges with random probability
      if (Math.random() < probability) {
        graph.addDirectedEdge(i, `middle_${i}`);
      }

      if (Math.random() < probability) {
        graph.addDirectedEdge(i, `outer_${i}`);
      }

      if (Math.random() < probability) {
        graph.addDirectedEdge(`middle_${i}`, `outer_${i}`);
      }
    }

    loadGraph(graph);

    // Register the events
    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
    });
  }, [loadGraph, registerEvents, order, probability]);

  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, highlighted: data.highlighted || false };

        if (hoveredNode) {
          if (
            node === hoveredNode ||
            graph.neighbors(hoveredNode).includes(node)
          ) {
            newData.highlighted = true;
          } else {
            newData.color = "#E2E2E2";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma]);

  return null;
};
