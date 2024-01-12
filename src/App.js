import React from "react";
import SigmaGraph from "./components/SigmaGraph";

const App = () => {
  const generateCircularGraphData = (numNodes, radius) => {
    const businessProviders = [
      "Makemytrip",
      "Booking.com",
      "Ola",
      "Uber",
      "Nimma Yatri",
      "Bhima Jewellers",
    ];

    const products = ["Hotel", "Jewellery Shop", "Cab Services"];

    const vendors = [
      "Itsy By Treebo - Shree Comforts",
      "Oval Diamond Earrings in 18KT Rose Gold",
      "Bangalore Luxury Cars | Wedding Cars at Bangalore",
      "Ibis Bengaluru City Centre - An Accor Brand",
      "Gold & Diamonds opens seventh store",
      "Bloom Hotel - HSR Layout Sector 6",
      "Zing Car, Self Drive Car at HSR Layout",
      "Embrace natural beauty with Golden Ardor Couple Rings",
      "Bangalore Luxury Cars | Wedding Cars at Bangalore",
      "GRAND Kalinaga Hotel",
      "Twin Tulips Mystic Premier",
    ];

    const graphData = {
      nodes: [],
      edges: [],
    };

    const getRandomNode = (currentNodeId, totalNodes) => {
      let randomNodeId;
      do {
        randomNodeId = Math.floor(Math.random() * totalNodes);
      } while (randomNodeId === currentNodeId);

      return randomNodeId;
    };

    for (let i = 0; i < numNodes; i++) {
      // Inner circle
      const angleInner = (i / numNodes) * 2 * Math.PI;
      const xInner = (radius + 150) * Math.cos(angleInner);
      const yInner = (radius + 150) * Math.sin(angleInner);

      const innerNodeId = `n${i}_inner`;
      graphData.nodes.push({
        id: innerNodeId,
        label: businessProviders[i % businessProviders.length], // Use business provider names cyclically
        x: xInner,
        y: yInner,
        size: 1,
        color: "yellow",
      });

      if (i < numNodes - 1) {
        const innerEdgeId = `e${i}_inner`;
        const innerTargetNodeId = `n${i + 1}_inner`;
        graphData.edges.push({
          id: innerEdgeId,
          source: innerNodeId,
          target: innerTargetNodeId,
          color: "#ccc",
        });
      } else {
        const innerEdgeId = `e${i}_inner`;
        const innerTargetNodeId = "n0_inner";
        graphData.edges.push({
          id: innerEdgeId,
          source: innerNodeId,
          target: innerTargetNodeId,
          color: "#ccc",
        });
      }

      // Middle circle
      const angleMiddle = (i / numNodes) * 2 * Math.PI;
      const xMiddle = (radius + 400) * Math.cos(angleMiddle); // Adjust the radius for the outer circle
      const yMiddle = (radius + 400) * Math.sin(angleMiddle);

      const middleNodeId = `n${i}_middle`;
      graphData.nodes.push({
        id: middleNodeId,
        label: products[i % products.length], // Use product names cyclically
        x: xMiddle,
        y: yMiddle,
        size: 1.5,
        color: "#B228F2",
      });

      if (i < numNodes - 1) {
        const middleEdgeId = `e${i}_middle`;
        const middleTargetNodeId = `n${i + 1}_middle`;
        graphData.edges.push({
          id: middleEdgeId,
          source: middleNodeId,
          target: middleTargetNodeId,
          color: "#ccc",
        });
      } else {
        const middleEdgeId = `e${i}_middle`;
        const middleTargetNodeId = "n0_middle";
        graphData.edges.push({
          id: middleEdgeId,
          source: middleNodeId,
          target: middleTargetNodeId,
          color: "#ccc",
        });
      }

      // Outer circle
      const angleOuter = (i / numNodes) * 2 * Math.PI;
      const xOuter = (radius + 800) * Math.cos(angleOuter); // Adjust the radius for the outer circle
      const yOuter = (radius + 800) * Math.sin(angleOuter);

      const outerNodeId = `n${i}_outer`;
      graphData.nodes.push({
        id: outerNodeId,
        label: vendors[i % vendors.length], // Use vendor names cyclically
        x: xOuter,
        y: yOuter,
        size: 2,
        color: "#005FFE",
      });

      if (i < numNodes - 1) {
        const outerEdgeId = `e${i}_outer`;
        const outerTargetNodeId = `n${i + 1}_outer`;
        graphData.edges.push({
          id: outerEdgeId,
          source: outerNodeId,
          target: outerTargetNodeId,
          color: "#ccc",
        });
      } else {
        const outerEdgeId = `e${i}_outer`;
        const outerTargetNodeId = "n0_outer";
        graphData.edges.push({
          id: outerEdgeId,
          source: outerNodeId,
          target: outerTargetNodeId,
          color: "#ccc",
        });
      }

      // Additional random edges for each node
      for (let j = 0; j < Math.floor(Math.random() * 2) + 2; j++) {
        const randomTargetNodeId = getRandomNode(i, numNodes);

        graphData.edges.push({
          id: `e${i}_${j}`,
          source: `n${i}_outer`,
          target: `n${randomTargetNodeId}_outer`,
          color: "black", // Adjust the color as needed
        });
      }

      // Additional edges connecting nodes from inner to middle and middle to outer
      if (i < numNodes - 1) {
        const innerToMiddleEdgeId = `e${i}_inner_middle`;
        const innerToMiddleTargetNodeId = `n${i + 1}_middle`;
        graphData.edges.push({
          id: innerToMiddleEdgeId,
          source: innerNodeId,
          target: innerToMiddleTargetNodeId,
          color: "black",
        });

        const middleToOuterEdgeId = `e${i}_middle_outer`;
        const middleToOuterTargetNodeId = `n${i + 1}_outer`;
        graphData.edges.push({
          id: middleToOuterEdgeId,
          source: middleNodeId,
          target: middleToOuterTargetNodeId,
          color: "black",
        });
      }
    }

    return graphData;
  };

  const graphData = generateCircularGraphData(50, 70);

  return (
    <div>
      <h1>Sigma.js</h1>
      <SigmaGraph graphData={graphData} />
    </div>
  );
};

export default App;
