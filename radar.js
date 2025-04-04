// The MIT License (MIT)

// Copyright (c) 2017 Zalando SE

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

function radar_visualization(config) {

  const style = getComputedStyle(document.documentElement);

  config.svg_id = "radar";
  config.width = 1450;
  config.height = 900;
  config.colors = {
    background: style.getPropertyValue('--kleur-achtergrond'),
    text: style.getPropertyValue('--kleur-tekst'),
    text_legend: style.getPropertyValue('--kleur-legend'),
    grid: '#dddde0',
    inactive: "#ddd",
    doing: style.getPropertyValue('--kleur-doing'),
    ongoing: style.getPropertyValue('--kleur-ongoing'),
    planning: style.getPropertyValue('--kleur-planning'),
    undoing: style.getPropertyValue('--kleur-undoing')
  };
  config.quadrants = [
    { name: "IT voor verduurzaming" }, //rechtsonder
    { name: "Duurzaam Werken" }, //linksonder
    { name: "Duurzame Organisatie" }, //linksboven
    { name: "Duurzame IT" }, //rechtsboven
  ];
  config.rings = [
    { name: "DOING", color: config.colors.doing, textColor: "white" },
    { name: "ONGOING", color: config.colors.ongoing, textColor: "white" },
    { name: "PLANNING", color: config.colors.planning, textColor: "white" },
    { name: "UNDOING", color: config.colors.undoing, textColor: "white" }
  ];
  config.print_layout = true;
  config.links_in_new_tabs = false;

  // custom random number generator, to make random sequence reproducible
  // source: https://stackoverflow.com/questions/521295
  var seed = 42;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function random_between(min, max) {
    return min + random() * (max - min);
  }

  function normal_between(min, max) {
    return min + (random() + random()) * 0.5 * (max - min);
  }

  // radial_min / radial_max are multiples of PI
  const quadrants = [
    { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 }, //rechtsboven
    { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 }, //linksboven
    { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 }, //linksonder
    { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 } // rechtsonder
  ];

  const rings = [
    { radius: 130 },
    { radius: 220 },
    { radius: 310 },
    { radius: 400 }
  ];

  const title_offset =
    { x: -675, y: -440 };

  const footer_offset =
    { x: 450, y: 420 };

  const legend_offset = [
    { x: 450, y: 90 }, //rechtsonder
    { x: -675, y: 90 }, //linksonder
    { x: -675, y: -310 }, //linksboven
    { x: 450, y: -310 } //rechtsboven
  ];

  const filter_offset =
    { x: -675, y: 390 };

  function polar(cartesian) {
    var x = cartesian.x;
    var y = cartesian.y;
    return {
      t: Math.atan2(y, x),
      r: Math.sqrt(x * x + y * y)
    }
  }

  function cartesian(polar) {
    return {
      x: polar.r * Math.cos(polar.t),
      y: polar.r * Math.sin(polar.t)
    }
  }

  function bounded_interval(value, min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    return Math.min(Math.max(value, low), high);
  }

  function bounded_ring(polar, r_min, r_max) {
    return {
      t: polar.t,
      r: bounded_interval(polar.r, r_min, r_max)
    }
  }

  function bounded_box(point, min, max) {
    return {
      x: bounded_interval(point.x, min.x, max.x),
      y: bounded_interval(point.y, min.y, max.y)
    }
  }

  function segment(quadrant, ring) {
    var polar_min = {
      t: quadrants[quadrant].radial_min * Math.PI,
      r: ring === 0 ? 30 : rings[ring - 1].radius
    };
    var polar_max = {
      t: quadrants[quadrant].radial_max * Math.PI,
      r: rings[ring].radius
    };
    var cartesian_min = {
      x: 15 * quadrants[quadrant].factor_x,
      y: 15 * quadrants[quadrant].factor_y
    };
    var cartesian_max = {
      x: rings[3].radius * quadrants[quadrant].factor_x,
      y: rings[3].radius * quadrants[quadrant].factor_y
    };
    return {
      clipx: function(d) {
        var c = bounded_box(d, cartesian_min, cartesian_max);
        var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.x = cartesian(p).x; // adjust data too!
        return d.x;
      },
      clipy: function(d) {
        var c = bounded_box(d, cartesian_min, cartesian_max);
        var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.y = cartesian(p).y; // adjust data too!
        return d.y;
      },
      random: function() {
        return cartesian({
          t: random_between(polar_min.t, polar_max.t),
          r: normal_between(polar_min.r, polar_max.r)
        });
      }
    }
  }

  // position each entry randomly in its segment
  for (var i = 0; i < config.entries.length; i++) {
    var entry = config.entries[i];
    entry.segment = segment(entry.quadrant, entry.ring);
    var point = entry.segment.random();
    entry.x = point.x;
    entry.y = point.y;
    entry.color = entry.active || config.print_layout ?
      config.rings[entry.ring].color : config.colors.inactive;
    entry.textColor = config.rings[entry.ring].textColor;
  }

  // partition entries according to segments
  var segmented = new Array(4);
  for (var quadrant = 0; quadrant < 4; quadrant++) {
    segmented[quadrant] = new Array(4);
    for (var ring = 0; ring < 4; ring++) {
      segmented[quadrant][ring] = [];
    }
  }
  for (var i=0; i<config.entries.length; i++) {
    var entry = config.entries[i];
    segmented[entry.quadrant][entry.ring].push(entry);
  }

  // assign unique sequential id to each entry
  var id = 1;
  for (var quadrant of [2,3,1,0]) {
    for (var ring = 0; ring < 4; ring++) {
      var entries = segmented[quadrant][ring];
      for (var i=0; i<entries.length; i++) {
        entries[i].id = "" + id++;
      }
    }
  }



  let filterActive = false; // Houd bij of de filter actief is

 
  // Helper functies
  function translate(x, y) {
    return "translate(" + x + "," + y + ")";
  }

  // Functies voor button gedrag
  
  function createFilterButton(x, y, text, groupFilters) {
    var button = radar.append("g")
      .attr("class", "button")
      .attr("transform", translate(x, y))
      .style("cursor", "pointer");
  
    button.append("rect")
      .attr("width", 200)
      .attr("height", 16)
      .attr("rx", 5)
      .attr("ry", 5)
      .style("fill", config.colors.text)
      .style("stroke", config.colors.grid)
      .style("stroke-width", 2);
  
    var label = button.append("text")
      .text(text)
      .attr("x", 10)
      .attr("y", 8)
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .style("fill", config.colors.background)
      .style("font-size", "16px")
      .style("font-weight", "bold");

    // Voeg het "lees meer" icoon toe (SVG-path)
    button.append("path")
      .attr("d", "M2 2 L10 2 L10 8 L14 4 L10 0 L10 2 L2 2") // Opengeslagen boek path
      .attr("transform", translate(210, 4)) // Plaats het icoon rechts achter de button
      .style("fill", config.colors.text)
      .style("stroke", config.colors.grid)
      .style("stroke-width", 1);
  
    var dropdown = button.append("g")
      .attr("class", "dropdown")
      .attr("transform", translate(0, 20))
      .style("display", "none");
  
    groupFilters.forEach((filter, index) => {
      const option = dropdown.append("g")
        .attr("transform", translate(0, index * 20))
        .style("cursor", "pointer");
  
      option.append("rect")
        .attr("width", 200)
        .attr("height", 20)
        .style("fill", config.colors.text)
        .style("stroke", config.colors.grid)
        .style("stroke-width", 1);
  
      option.append("text")
        .text(filter.label)
        .attr("x", 10)
        .attr("y", 14)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .style("fill", "white")
        .style("font-size", "14px");
  
      option.on("click", function () {
        d3.event.stopPropagation(); // Voorkom dat body-click event triggert
        dropdown.style("display", "none"); // Sluit dropdown
        label.text(filter.label).attr("x", 10).attr("text-anchor", "start");
        
        clickButton(filter.value);
      });
    });
  
    button.on("click", function () {
      d3.event.stopPropagation();
      const isVisible = dropdown.style("display") === "block";
    
      // Controleer of er een filter actief is
      if (filterActive) {
        label.text("Filter").attr("x", 10).attr("text-anchor", "start");
        clickButton(null); // Hef het filter op
        filterActive = false; // Zet de filter status terug
        dropdown.style("display", "none");
      } else {
        dropdown.style("display", isVisible ? "none" : "block");
      }
    });
    
  
    d3.select("body").on("click", function () {
      if (!d3.event.target.closest(".button")) {
        d3.selectAll(".dropdown").style("display", "none");
      }
    });
  }
  
  


  function highlightButton(button) {
    d3.select(button).select("rect")
      .style("fill", config.colors.doing); // Verander kleur bij hover
  }

  function unhighlightButton(button) {
    d3.select(button).select("rect")
      .style("fill", config.colors.text); // Herstel naar standaardkleur
  }

  function clickButton(groupFilter) {
    console.log("Filter button clicked for group: " + groupFilter);
  
    if (filterActive) {
      // Reset de originele staat
      d3.selectAll(".blip").each(function (d) {
        d3.select(this).select("circle")
          .style("fill", d.color)
          .style("stroke", "none")
          .style("stroke-width", 0);
  
        d3.select(this).select("text")
          .style("fill", d.textColor);
  
        // Verwijder onderstreping van legenda-items
        d3.select("#legendItem" + d.id)
          .style("text-decoration", "none");
      });
      filterActive = false;
    } else {
      // Highlight blips en pas legenda-items aan
      d3.selectAll(".blip").each(function (d) {
        if (d.group === groupFilter) {
          // Pas de stijl van de blip aan
          d3.select(this).select("circle")
            .style("fill", config.colors.background)
            .style("stroke", d.color)
            .style("stroke-width", 2);
  
          // Maak de tekst (cijfers) zwart
          d3.select(this).select("text")
            .style("fill", "black");
  
          // Voeg onderstreping toe aan corresponderend legenda-item
          d3.select("#legendItem" + d.id)
            .style("font-weight", "bold")
            //.style("fill", config.colors.background)
            .style("background-color", "black")
            .style("padding", "2px 4px"); // Voeg wat padding toe voor de achtergro
            //legendItem.setAttribute("filter", "url(#solid)");
            //legendItem.setAttribute("fill", config.colors.background);
        }
      });
      filterActive = true;
    }
  }
  
      
  

  var svg = d3.select("svg#" + config.svg_id)
    .style("background-color", config.colors.background)
    .attr("width", config.width)
    .attr("height", config.height);

  var radar = svg.append("g");
  radar.attr("transform", translate(config.width / 2, config.height / 2));

  var grid = radar.append("g");

  // draw grid lines
  grid.append("line")
    .attr("x1", 0).attr("y1", -400)
    .attr("x2", 0).attr("y2", 400)
    .style("stroke", config.colors.grid)
    .style("stroke-width", 2);
  grid.append("line")
    .attr("x1", -400).attr("y1", 0)
    .attr("x2", 400).attr("y2", 0)
    .style("stroke", config.colors.grid)
    .style("stroke-width", 2);

  // background color. Usage `.attr("filter", "url(#solid)")`
  // SOURCE: https://stackoverflow.com/a/31013492/2609980
  var defs = grid.append("defs");
  var filter = defs.append("filter")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", 1)
    .attr("id", "solid");
  filter.append("feFlood")
    .attr("flood-color", config.colors.text);
  filter.append("feComposite")
    .attr("in", "SourceGraphic");

  // draw rings
  for (var i = 0; i < rings.length; i++) {
    grid.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", rings[i].radius)
      .style("fill", "none")
      .style("stroke", config.colors.grid)
      .style("stroke-width", 2);
    if (config.print_layout) {
      grid.append("text")
        .text(config.rings[i].name)
        .attr("y", -rings[i].radius + 32)
        .attr("text-anchor", "middle")
        .style("fill", config.rings[i].color)
        .style("opacity", 0.75) //doorzichtigheid van de tekst in de ring
        .style("text-transform", "uppercase")
        .attr("class", "ring-text") // Gebruik de 'title' klasse uit de CSS
        .style("font-size", "20px")
        .style("font-weight", "900")
        .style("pointer-events", "none")
        .style("user-select", "none");
    }
  }

  function legend_transform(quadrant, ring, index=null) {
    var dx = ring < 2 ? 0 : 150; // ruimte tussen de legenda's
    var dy = (index == null ? 0 : 16 + index * 12); //-16
    if (ring % 2 === 1) {
      dy = dy + 36 + segmented[quadrant][ring-1].length * 12;
    }
    return translate(
      legend_offset[quadrant].x + dx,
      legend_offset[quadrant].y + dy
    );
  }

  // draw title and legend (only in print layout)
  if (config.print_layout) {

    // title
    radar
      .append("text")
      .attr("transform", translate(title_offset.x, title_offset.y + 20))
      .text(config.title || "")
      //.style("font-family", "Raleway")
      .attr("class", "title")
      .style("font-size", "14")
      .style("fill", config.colors.text)

    // footer
    radar.append("text")
      .attr("transform", translate(footer_offset.x, footer_offset.y))
      .text("■ nieuw ▲ verplaatst")
      .attr("xml:space", "preserve")
      //.style("font-family", "Raleway")
      .attr("class", "title")
      .style("font-size", "10px")
      .style("fill", config.colors.text);

    // legend
    var legend = radar.append("g");
    for (var quadrant = 0; quadrant < 4; quadrant++) {
      legend.append("text")
        .attr("transform", translate(
          legend_offset[quadrant].x,
          legend_offset[quadrant].y - 45
        ))
        .text(config.quadrants[quadrant].name)
        //.style("font-family", "Raleway")//
        .attr("class", "legend-text")
        .style("font-size", "20px")
        .style("font-weight", "900")
        .style("fill", config.colors.text_legend);
      
      createFilterButton(
        legend_offset[quadrant].x,
        legend_offset[quadrant].y - 38, // Place the button just below the title
        "Filter",
        config.quadrantGroups[quadrant].map(group => ({ label: group, value: group }))
      );

      for (var ring = 0; ring < 4; ring++) {
        legend.append("text")
          .attr("transform", legend_transform(quadrant, ring))
          .text(config.rings[ring].name)
          //.style("font-family", "Raleway")//
          .attr("class", "legend-text")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .style("fill", config.rings[ring].color);
        legend.selectAll(".legend" + quadrant + ring)
          .data(segmented[quadrant][ring])
          .enter()
            .append("a")
              .attr("href", function (d, i) {
                 return d.link ? d.link : "#"; // stay on same page if no link was provided
              })
              // Add a target if (and only if) there is a link and we want new tabs
              .attr("target", function (d, i) {
                 return (d.link && config.links_in_new_tabs) ? "_blank" : null;
              })
              .attr("data-custom-id", function (d, i) {
                return d.label.replace(/\s+/g, '');
              })
              .attr("data-custom-name", function (d, i) {
                return d.label;
              })
              .attr("data-custom-bhvr", function (d, i) {
                return "NAVIGATION";
              })
            .append("text")
              .attr("transform", function(d, i) { return legend_transform(quadrant, ring, i); })
              .attr("class", "legend" + quadrant + ring)
              .attr("id", function(d, i) { return "legendItem" + d.id; })
              .text(function(d, i) { 
                // Define a function to truncate text to a maximum length
                function truncateText(text, maxLength) {
                  if (text.length > maxLength) {
                    return text.substring(0, maxLength - 3) + "..."; // Subtract 3 for the ellipsis
                  } else {
                    return text;
                  }
                }
              
                const maxLength = 25; //maximale lengte van de tekst
                const displayText = d.id + ". " + d.label;
                return truncateText(displayText, maxLength);
              })
              //.style("font-family", "Raleway")//
              .attr("class", "legend-text")
              .style("font-size", "11px")
              .attr("fill", config.colors.text)
              .on("mouseover", function(d) { showBubble(d); highlightLegendItem(d); })
              .on("mouseout", function(d) { hideBubble(d); unhighlightLegendItem(d); });
      }
    }
  }

  // layer for entries
  var rink = radar.append("g")
    .attr("id", "rink");

  // rollover bubble (on top of everything else)
  var bubble = radar.append("g")
    .attr("id", "bubble")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("pointer-events", "none")
    .style("user-select", "none");
  bubble.append("rect")
    .attr("rx", 4)
    .attr("ry", 4)
    .style("fill", config.colors.text);
  bubble.append("text")
    //.style("font-family", "Raleway")//
    .attr("class", "legend-text")
    .style("font-size", "10px")
    .style("fill", config.colors.background);
  bubble.append("path")
    .attr("d", "M 0,0 10,0 5,8 z")
    .style("fill", config.colors.text);

  function showBubble(d) {
    if (d.active || config.print_layout) {
      var tooltip = d3.select("#bubble text")
        .text(d.label); //hoover text
      var bbox = tooltip.node().getBBox();
      d3.select("#bubble")
        .attr("transform", translate(d.x - bbox.width / 2, d.y - 16))
        .style("opacity", 1);
      d3.select("#bubble rect")
        .attr("x", -5)
        .attr("y", -bbox.height)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height + 4);
      d3.select("#bubble path")
        .attr("transform", translate(bbox.width / 2 - 5, 3));
    }
  }

  function hideBubble(d) {
    var bubble = d3.select("#bubble")
      .attr("transform", translate(0,0))
      .style("opacity", 0);
  }

  function highlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.setAttribute("filter", "url(#solid)");
    legendItem.setAttribute("fill", config.colors.background);
  }

  function unhighlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.removeAttribute("filter");
    legendItem.setAttribute("fill", config.colors.text);
  }

  // draw blips on radar
  var blips = rink.selectAll(".blip")
    .data(config.entries)
    .enter()
      .append("g")
        .attr("class", "blip")
        .attr("transform", function(d, i) { return legend_transform(d.quadrant, d.ring, i); })
        .on("mouseover", function(d) { showBubble(d); highlightLegendItem(d); })
        .on("mouseout", function(d) { hideBubble(d); unhighlightLegendItem(d); });

  // configure each blip
  blips.each(function(d) {
    var blip = d3.select(this);

    // blip link
    //if (d.active && d.hasOwnProperty("link") && d.link) {
    //  blip = blip.append("a")
    //    .attr("xlink:href", d.link);

    //  if (config.links_in_new_tabs) {
    //    blip.attr("target", "_blank");
    //  }
    //}
    // Blip link functionaliteit
    if (d.hasOwnProperty("link") && d.link) {
      blip.style("cursor", "pointer") // Zorg voor een pointer cursor bij hover
        .on("click", function() {
          window.open(d.link, "_blank"); // Open de link in een nieuw tabblad
      });
    }

    // blip shape
    if (d.status == 1) {
      blip.append("rect") //nieuw (vierkant)
      .attr("x", -7)       // x-coordinate of the top-left corner
      .attr("y", -6)       // y-coordinate of the top-left corner
      .attr("width", 15) 
      .attr("height", 15)
      .attr("fill", d.color);
    } else if (d.status == 2) {
      blip.append("path")
        .attr("d", "M -11,5 11,5 0,-13 z") // verplaatst (driehoek)
        .style("fill", d.color);
    } else {
      blip.append("circle")
        .attr("r", 9)
        .attr("fill", d.color);
    }
    // blip text
    if (d.active || config.print_layout) {
      var blip_text = config.print_layout ? d.id : d.label.match(/[a-z]/i);
      blip.append("text")
        .text(blip_text)
        .attr("y", 3)
        .attr("text-anchor", "middle")
        .style("fill", d.textColor)
        //.style("font-family", "Raleway")//
        .attr("class", "blip-text")
        .style("font-size", function(d) { return blip_text.length > 2 ? "8px" : "9px"; })
        .style("pointer-events", "none")
        .style("user-select", "none");
    }
  });

  // make sure that blips stay inside their segment
  function ticked() {
    blips.attr("transform", function(d) {
      return translate(d.segment.clipx(d), d.segment.clipy(d));
    })
  }

  // distribute blips, while avoiding collisions
  d3.forceSimulation()
    .nodes(config.entries)
    .velocityDecay(0.19) // magic number (found by experimentation)
    .force("collision", d3.forceCollide().radius(12).strength(0.85))
    .on("tick", ticked);
}
