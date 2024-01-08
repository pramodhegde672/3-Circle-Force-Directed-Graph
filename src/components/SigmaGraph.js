import React, { useEffect } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useRegisterEvents } from "@react-sigma/core";
import _ from "lodash";

const SigmaGraph = ({ graphData }) => {
  const graph = new MultiDirectedGraph();
  _.forEach(_.get(graphData, "nodes", []), (node) => {
    graph.addNode(_.get(node, "id"), {
      x: _.get(node, "x"),
      y: _.get(node, "y"),
      label: _.get(node, "label"),
      size: _.get(node, "size") * 10,
      color: _.get(node, "color"),
    });
  });
  _.forEach(_.get(graphData, "edges", []), (edge) => {
    console.log(edge, "ed");
    graph.addEdge(
      _.get(edge, "source"),
      _.get(edge, "target", { label: _.get(edge, "id") })
    );
  });

  return (
    <SigmaContainer style={{ height: "500px" }} graph={graph}></SigmaContainer>
  );
};

export default SigmaGraph;

