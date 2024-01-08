import React, { useEffect, useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useRegisterEvents, useSigma } from "@react-sigma/core";
import _ from "lodash";

const SigmaGraph = ({ graphData }) => {
  const GraphEvents = () => {
    const registerEvents = useRegisterEvents();
    const sigma = useSigma();
    const [draggedNode, setDraggedNode] = useState(null);

    useEffect(() => {
      // Register the events
      registerEvents({
        downNode: (e) => {
          console.log("downNode");
          setDraggedNode(e.node);
          sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
        },
        mouseup: (e) => {
          console.log("mouseup");
          if (draggedNode) {
            setDraggedNode(null);
            sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
          }
        },
        mousedown: (e) => {
          console.log("mousedown");
          // Disable the autoscale at the first down interaction
          if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
        },
        mousemove: (e) => {
          console.log("mousemove");
          if (draggedNode) {
            // Get new position of node
            const pos = sigma.viewportToGraph(e);
            sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
            sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

            // Prevent sigma from moving camera:
            e.preventSigmaDefault();
            e.original.preventDefault();
            e.original.stopPropagation();
          }
        },
        touchup: (e) => {
          console.log("touchup");
          if (draggedNode) {
            setDraggedNode(null);
            sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
          }
        },
        touchdown: (e) => {
          console.log("touchdown");
          // Disable the autoscale at the first down interaction
          if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
        },
        touchmove: (e) => {
          console.log("touchmove");
          if (draggedNode) {
            // Get new position of node
            const pos = sigma.viewportToGraph(e);
            sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
            sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

            // Prevent sigma from moving camera:
            e.preventSigmaDefault();
            e.original.preventDefault();
            e.original.stopPropagation();
          }
        },
      });
    }, [registerEvents, sigma, draggedNode]);

    return null;
  };

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
    graph.addEdge(
      _.get(edge, "source"),
      _.get(edge, "target", { label: _.get(edge, "id") })
    );
  });

  return (
    <>
      <SigmaContainer
        style={{ height: "500px" }}
        graph={graph}
        order={100}
        probability={0.1}
      >
        <GraphEvents />
      </SigmaContainer>
    </>
  );
};

export default SigmaGraph;
