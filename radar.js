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
  config.width = 1700;//was 1450
  config.height = 900;
  config.colors = {
    background: style.getPropertyValue('--kleur-achtergrond'),
    text: style.getPropertyValue('--kleur-tekst'),
    text_legend: style.getPropertyValue('--kleur-legend') || '#5E2977', 
    grid: "#5E2977",
    inactive: "#ddd",
    doing: style.getPropertyValue('--kleur-doing'),
    ongoing: style.getPropertyValue('--kleur-ongoing'),
    planning: style.getPropertyValue('--kleur-planning'),
    undoing: style.getPropertyValue('--kleur-undoing'),
    text_filter_legend:"#003471" //" style.getPropertyValue('--kleur-filterlegend')
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

  //const rings = [
  //  { radius: 130 },
  //  { radius: 220 },
  //  { radius: 310 },
  //  { radius: 400 }
  //];

  const rings = [
  { radius: 100 },
  { radius: 170 },
  { radius: 240 },
  { radius: 300 }
  ];

  const title_offset =
    { x: -675, y: -440 };

  const footer_offset =
    { x: 450, y: 420 };

  const legend_offset = [
    { x: 450, y: 30 }, //90 rechtsonder
    { x: -800, y: 30 }, //-675 90 linksonder
    { x: -800, y: -310 }, //linksboven
    { x: 450, y: -310 } //rechtsboven
  ];

  const filter_offset =
    { x: -820, y: 245 };//390

  const uniqueGroups = new Set(); //stores the unique values of the field "group"
  for (let i = 0; i < config.entries.length; i++) {
    const entry = config.entries[i];
    if (entry.group) {
      uniqueGroups.add(entry.group);
    }
  }
 
  
  // Zet de unieke groepen in het config-object zodat ze elders bruikbaar zijn
  //config.uniqueGroups = Array.from(uniqueGroups);
  
  // Zet de unieke groepen in het config-object zodat ze elders bruikbaar zijn
  let unsortedGroups = Array.from(uniqueGroups);

  // Regex voor "nummer. tekst" patroon
  const nummeringRegex = /^(\d+)\.\s/;

  // Splits groepen in genummerde en overige
  let genummerd = [];
  let overig = [];

  unsortedGroups.forEach(group => {
    const match = group.match(nummeringRegex);
    if (match) {
      genummerd.push({ original: group, nummer: parseInt(match[1], 10) });
    } else {
      overig.push(group);
    }
  });

  // Sorteer genummerde groepen op nummer
  genummerd.sort((a, b) => a.nummer - b.nummer);

  // Combineer en zet in config
  config.uniqueGroups = [
    ...genummerd.map(g => g.original),
    ...overig.sort() // optioneel: alfabetisch sorteren van niet-genummerde groepen
  ];

    function definieerGroepVormen(config) {
  // Handmatige mapping van groep naar statusvormen 1 t/m 12
          //case 1:  filled circle            
          //case 2:  filled triangle 
          //case 3:  filled square 
          //case 4:  filled ellipse 
          //case 5:  filled pentagon  
          //case 6:  filled hexagon  
          //case 7:  filled star  
          //case 8:  open circle  
          //case 9:  open triangle  
          //case 10: open square  
          //case 11: open ellipse  
          //case 12: open pentagon  
          //case 13: open hexagon  
          //case 14: open star
      const vasteGroepvormen = {
        "1. Minder Hardware": 1,        // filled circle
        "2. Carbonaware": 2,            // closed circle
        "3. Minder Energie": 3,        // filled square
        "4. Duurzaam Gebruik": 5,      // filled pentagon
        "5. Software": 6,              // filled hexagon
        "6. Data": 8,           // open circle   
        "7. Medewerker": 9,     // open triangle
        "8. Organisatie": 10     // open square
        //"9. Processen": 
        //"10. Communicatie": ,         // filled ellipse
        //"11. Security": 6, // filled star
        //"12. Hardware": 12      // open star
      };

      // Maak de mapping volledig: expliciet of automatisch
      const groupToStatus = {};
      config.uniqueGroups.forEach((group, index) => {
        groupToStatus[group] = vasteGroepvormen[group] || ((index % 12) + 1);
      });

      config.groupToStatus = groupToStatus;
    }

  
  definieerGroepVormen(config);


  // Genereer automatisch een mapping van group naar status (vorm)
  //const groupToStatus = {};
  //config.uniqueGroups.forEach((group, index) => {
  //  groupToStatus[group] = (index % 12) + 1; // Status loopt van 1 t/m 12 (vormen herhalen indien nodig)
  //});

  //config.groupToStatus = groupToStatus;



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
        var p = bounded_ring(polar(c), polar_min.r + 10, polar_max.r - 10); //15
        d.x = cartesian(p).x; // adjust data too!
        return d.x;
      },
      clipy: function(d) {
        var c = bounded_box(d, cartesian_min, cartesian_max);
        var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15); //15
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
      if (groupfilter === null) {
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

    d3.selectAll(".blip").each(function (d) {
      const shape = d3.select(this).select("circle,path,rect,ellipse");
      const text = d3.select(this).select("text");
      const legend = d3.select("#legendItem" + d.id);

      const isMatch = d.group === groupFilter;

      // Determine shape resize values
      const scaleUp = 1.5;
      const fontSizeDefault = 13;
      const fontSizeActive = 14;

      if (groupFilter === null || !isMatch) {
        // Reset shape style
        shape.attr("transform", null)
        if (d.status >= 8) {
          // open vormen herstellen
          shape
            .style("fill", "none")
            .style("stroke", d.color)
            .style("stroke-width", 2);
        } else {
          // dichte vormen herstellen
          shape
            .style("fill", d.color)
            .style("stroke", "none")
            .style("stroke-width", 0);
        }
          

        // Reset text
        text
          .style("fill", d.textColor)
          .style("font-size", fontSizeDefault + "px");

        // Reset legend style
        legend
          .style("font-weight", "normal")
          .style("text-decoration", "none")
          .style("background-color", "transparent")
          .style("padding", "0");
      }

      if (isMatch) {
        // Resize shape and apply highlight
        shape
          .attr("transform", `scale(${scaleUp})`)
          .style("fill", config.colors.background)
          .style("stroke", d.color)
          .style("stroke-width", 2);

        // Resize text and highlight
        text
          .style("fill", "black")
          .style("font-size", fontSizeActive + "px");

        // Highlight legend
        legend
          .style("font-weight", "bold")
          .style("background-color", "black")
          .style("padding", "2px 4px");
      }
    });
  }


      
  

  var svg = d3.select("svg#" + config.svg_id)
    .style("background-color", config.colors.background)
    .attr("width", config.width)
    .attr("height", config.height);

  var radar = svg.append("g");
  radar.attr("transform", translate(config.width / 2, config.height / 2 - 80));

  var grid = radar.append("g");

  // draw grid lines
  const maxRadius = rings[3].radius;

  grid.append("line")
    .attr("x1", 0).attr("y1", -maxRadius)
    .attr("x2", 0).attr("y2", maxRadius)
    .style("stroke", config.colors.grid)
    .style("stroke-width", 2);

  grid.append("line")
    .attr("x1", -maxRadius).attr("y1", 0)
    .attr("x2", maxRadius).attr("y2", 0)
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
      
      // Capsulevormige labels met kleinere tekst
      const labelText = config.rings[i].name;
      const fontSize = 14;//18 // 2pt kleiner dan 20px
      const paddingX = 8;//10
      const paddingY = 4;//5

      // Meet de breedte van de tekst
      const tempText = radar.append("text")
        .text(labelText)
        .attr("font-size", fontSize + "px")
        .attr("visibility", "hidden");

      const textLength = tempText.node().getComputedTextLength();
      tempText.remove();

      const capsuleWidth = textLength + 2 * paddingX;
      const capsuleHeight = fontSize + paddingY;
      const yOffset = -rings[i].radius; // + 20

      // Achtergrond (capsule)
      grid.append("rect")
        .attr("x", -capsuleWidth / 2)
        .attr("y", yOffset - capsuleHeight / 2)
        .attr("rx", capsuleHeight / 2)
        .attr("ry", capsuleHeight / 2)
        .attr("width", capsuleWidth)
        .attr("height", capsuleHeight)
        .style("fill", config.rings[i].color)
        .style("opacity", 0.9);

      // Tekst op capsule
      grid.append("text")
        .text(labelText)
        .attr("y", yOffset + fontSize / 3)
        .attr("text-anchor", "middle")
        .style("fill", config.colors.background)
        .style("font-size", fontSize + "px")
        .style("font-weight", "bold")
        .style("text-transform", "uppercase")
        .attr("class", "ring-text")
        .style("pointer-events", "none")
        .style("user-select", "none");

      
      
    }
  }

  function legend_transform(quadrant, ring, index=null) {
    //var dx = ring < 2 ? 0 : 160; //-120 was 0 ruimte tussen de legenda's
    const isLeft = quadrant === 1 || quadrant === 2;

    const dx = ring < 2
      ? 0
      : (isLeft ? 150 : 100);  // dichter bij elkaar

    var dy = (index == null ? 0 : 16 + index * 12); //-16
    if (ring % 2 === 1) {
      dy = dy + 36 + segmented[quadrant][ring-1].length * 12;
    }
    return translate(
      legend_offset[quadrant].x + dx,
      legend_offset[quadrant].y + dy
    );
  }

  // Bepaal maximale tekstbreedte voor alle legend-items
  const tempText = radar.append("text")
    .attr("font-size", "11px")
    .attr("visibility", "hidden");

  let maxTextWidth = 0;
  config.entries.forEach(entry => {
    const text = entry.id + ". " + entry.label;
    tempText.text(text);
    const width = tempText.node().getComputedTextLength();
    if (width > maxTextWidth) {
      maxTextWidth = width;
    }
  });
  tempText.remove();

  const cardSidePadding = 20;
  const globalCardWidth = maxTextWidth + cardSidePadding * 2;



  // draw title and legend (only in print layout)
  if (config.print_layout) {

    // title
    radar.append("text")
      .attr("transform", translate(title_offset.x, title_offset.y + 20))
      .text(config.title || "")
      //.style("font-family", "Raleway")
      .attr("class", "title")
      .style("font-size", "14")
      .style("fill", config.colors.text)

    // footer
    //radar.append("text")
    //  .attr("transform", translate(footer_offset.x, footer_offset.y))
    //  .text("■ nieuw ▲ verplaatst")
    //  .attr("xml:space", "preserve")
    //  //.style("font-family", "Raleway")
    //  .attr("class", "title")
    //  .style("font-size", "10px")
    //  .style("fill", config.colors.text);

    // legend
    var legend = radar.append("g");
    for (var quadrant = 0; quadrant < 4; quadrant++) {
      const qx = legend_offset[quadrant].x;
      const qy = legend_offset[quadrant].y;

      const titleX = (quadrant === 0 || quadrant === 3) ? qx - 100 : qx;

      legend.append("text")
        .attr("transform", translate(titleX, qy - 25))
        .text(config.quadrants[quadrant].name)
        .attr("class", "legend-text")
        .style("font-size", "20px")
        .style("font-weight", "900")
        .style("fill", config.colors.text_legend);

      

      const ringHeights = [
        Math.max(segmented[quadrant][0].length, segmented[quadrant][1].length) * 13 + 30,
        Math.max(segmented[quadrant][2].length, segmented[quadrant][3].length) * 13 + 30
      ];
      const topRowHeight = Math.max(
        segmented[quadrant][0].length,
        segmented[quadrant][1].length) * 13 + 30;
      
      // Stap 1: Langste tekstregel bepalen
      //const tempText = radar.append("text")
      //  .attr("font-size", "11px")
      //  .attr("visibility", "hidden");

      //..let maxTextWidth = 0;

      //..config.entries.forEach(entry => {
      // / const text = entry.id + ". " + entry.label;
      //  tempText.text(text);
      //  const width = tempText.node().getComputedTextLength();
      //  if (width > maxTextWidth) {
      //    maxTextWidth = width;
      //  }
      //});

      //tempText.remove();

      // Stap 2: Voeg padding toe (bijv. 20px links + 20px rechts)
      //const cardSidePadding = 20;
      //const cardWidth = maxTextWidth + cardSidePadding * 2;
      const cardWidth = globalCardWidth;

      const dx = ring < 2
        ? (isRight ? -cardSidePadding : 0)
        : cardWidth + 20; // 20px ruimte tussen kaarten


      for (var ring = 0; ring < 4; ring++) {
        //const isLeft = quadrant === 1 || quadrant === 2;
        //const dx = ring < 2 ? 0 : (isLeft ? 260 : 160);
        const isLeft = quadrant === 1 || quadrant === 2;
        const isRight = quadrant === 0 || quadrant === 3;

        const dx = ring < 2
          ? (isRight ? -100 : 0)   // DOING/ONGOING → iets naar links als rechts
          : (isLeft ? 260 : 160);  // PLANNING/UNDOING → verder weg als links

        const lineHeight = 13;
        const extraMargin = 60; //was 30
        //const dx = ring < 2 ? 0 : 160; //was 160 180
        //const dy = ring < 2
        //  ? 0 // DOING & ONGOING (bovenste rij)
        //  : topRowHeight + 20; // PLANNING & UNDOING (onderste rij)
        let dy = 0;

        if (ring === 0) {
          dy = 0; // DOING (links boven)
        }
        
        if (ring === 1) {
          const prevNumLines = segmented[quadrant][0].length;
          const prevHeight = prevNumLines * lineHeight + extraMargin;
          dy = prevHeight + 10; // ONGOING onder DOING
        }
        if (ring === 2) {
          dy = 0; // PLANNING (rechts boven)
        }
        if (ring === 3) {
          const prevNumLines = segmented[quadrant][2].length;
          const prevHeight = prevNumLines * lineHeight + extraMargin;
          dy = prevHeight + 10; // UNDOING onder PLANNING
        }


        const groupX = qx + dx;
        const groupY = qy + dy;
       // const cardWidth = 180; // was 220 320 - smallere breedte links en rechts consistent

        const ringGroup = legend.append("g")
          .attr("transform", translate(groupX, groupY));
        const headerHeight = 25; // hoogte van de bovenbalk
        

        //ringGroup.append("rect")
        //  .attr("x", -20)
        //  .attr("y", -10)
        //  .attr("width", cardWidth)
        //  .attr("height", headerHeight)
        //  .attr("rx", 12)
        //  .attr("ry", 12)
        //  .style("fill", config.rings[ring].color)
        //  .style("opacity", 0.95);
        // Gekleurde bovenbalk met afgeronde bovenhoeken (en rechte onderkant)
        const tabX = -20;
        const tabY = -10;
        const tabW = cardWidth;
        const tabH = headerHeight;
        const radius = 12;

        const tabPath = `
          M ${tabX + radius},${tabY} 
          H ${tabX + tabW - radius} 
          A ${radius},${radius} 0 0 1 ${tabX + tabW},${tabY + radius} 
          V ${tabY + tabH} 
          H ${tabX} 
          V ${tabY + radius} 
          A ${radius},${radius} 0 0 1 ${tabX + radius},${tabY} 
          Z
        `;

        ringGroup.append("path")
          .attr("d", tabPath)
          .style("fill", config.rings[ring].color)
          .style("opacity", 0.95);


        
        const numLines = segmented[quadrant][ring].length;
        //const padding = extraMargin / 2;
        const totalHeight = numLines * lineHeight + extraMargin;
        const padding = (totalHeight - numLines * lineHeight) / 2;
        const baseY = tabY + tabH;
        const fontSize = 14;


        ringGroup.append("rect")
          .attr("x", -20)
          .attr("y", -10)
          .attr("width", cardWidth)
          .attr("height", totalHeight) //segmented[quadrant][ring].length * 13 + 30)
          .attr("rx", 12)
          .attr("ry", 12)
          .style("fill", "#ffffff")
          .style("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))")
          .lower();

        ringGroup.append("text")
          .attr("y", tabY + tabH / 2) 
          .attr("dominant-baseline", "middle")
          .text(config.rings[ring].name)
          .attr("class", "legend-text")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .style("fill",config.colors.background );//config.rings[ring].color);

        ringGroup.selectAll(".legend" + quadrant + ring)
          .data(segmented[quadrant][ring])
          .enter()
          .append("a")
          .attr("href", d => d.link || "#")
          .attr("target", d => (d.link && config.links_in_new_tabs) ? "_blank" : null)
          .append("text")
          //.attr("transform", (d, i) => translate(0, 24 + i * 13)) //was 16
          //.attr("transform", (d, i) => translate(0, padding + i * lineHeight))
          //const baseY = 15; // onderrand tabblad
          .attr("transform", (d, i) => translate(0, baseY + padding + i * lineHeight))
          .attr("id", d => "legendItem" + d.id)
          .text(d => {
            const displayText = d.id + ". " + d.label;
            return displayText.length > 25 ? displayText.slice(0, 22) + "..." : displayText;
          })
          .attr("class", "legend-text")
          .style("font-size", "11px")
          .attr("fill", config.colors.text)
          .on("mouseover", d => { showBubble(d); highlightLegendItem(d); })
          .on("mouseout", d => { hideBubble(d); unhighlightLegendItem(d); });
      }
    }
    // Filterblok met titel "Filters"
    
        // Teken de witte card met titel en 2 kolommen filters
    
    // Teken de gekleurde header-tab en witte kaart

    const lineHeight = 13;
    const extraMargin = 60;
    const spacing = 10;  // verticale ruimte tussen kaarten
    const extraBelow = 30; // ruimte tussen laatste kaart en filterblok

    const topLines = segmented[1][0].length;
    const topHeight = topLines * lineHeight + extraMargin;

    const bottomLines = segmented[1][1].length;
    const bottomHeight = bottomLines * lineHeight + extraMargin;

    const leftBlockY = legend_offset[1].y;
    const filtersYOffset = leftBlockY + topHeight + spacing + bottomHeight + extraBelow;

    const filtersXOffset = -820; // ← handhaaf originele horizontale uitlijning

    var filtersLegend = radar.append("g")
      //.attr("transform", translate(filter_offset.x, filter_offset.y));
      .attr("transform", translate(filtersXOffset, filtersYOffset));

    const cardWidth = globalCardWidth * 2 + 45;

    //const cardWidth = globalCardWidth;

    const cardHeight = 180;
    const headerHeight = 30; //was 22
    const radius = 12;

    // Tabblad-header met afgeronde bovenhoeken en rechte onderkant
    const tabPath = `
      M ${radius},0 
      H ${cardWidth - radius} 
      A ${radius},${radius} 0 0 1 ${cardWidth},${radius} 
      V ${headerHeight} 
      H 0 
      V ${radius} 
      A ${radius},${radius} 0 0 1 ${radius},0 
      Z
    `;

    filtersLegend.append("path")
      .attr("d", tabPath)
      .style("fill", config.colors.text_filter_legend)
      .style("opacity", 0.95);

    // Titeltekst in de gekleurde header
    filtersLegend.append("text")
      .text("Filters")
      .attr("x", 12)
      .attr("y", headerHeight / 2)
      .attr("class", "legend-text")
      .attr("dominant-baseline", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", config.colors.background);


    // Witte body van de kaart
    filtersLegend.append("rect")
      .attr("y", 0)
      .attr("width", cardWidth)
      .attr("height", cardHeight)
      .attr("rx", 12)
      .attr("ry", 12)
      .style("fill", "#ffffff")
      .style("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))")
      .lower(); // zet 'm onder het tabblad

    // Kolominstellingen
    const leftColumnX = 20;
    const rightColumnX = 278;
    const rowSpacing = 20;
    let currentFilter = null;

    config.uniqueGroups.forEach((group, index) => {
      const isLeft = index < 5;
      const colX = isLeft ? leftColumnX : rightColumnX;
      const row = isLeft ? index : index - 5;
      const y = 50 + row * rowSpacing;

      const groupItem = filtersLegend.append("g")
        .attr("transform", translate(colX, y))
        .style("cursor", "pointer")
        .on("click", function () {
          const wasActive = currentFilter === group;
          currentFilter = wasActive ? null : group;
          clickButton(currentFilter);
          filtersLegend.selectAll("text.filter-label")
            .style("font-weight", d => (d === currentFilter ? "bold" : "normal"));
        });

      const status = config.groupToStatus[group] || 1;
      const color = config.colors.text_filter_legend; // 👈 nu in juiste kleur

      // Vormpje
      function drawShape(status, color, parent) {
        const strokeWidth = 1.5;

        switch (status) {
          case 1: // filled circle
            parent.append("circle")
              .attr("r", 5)
              .attr("fill", color);
            break;
          case 2: // filled triangle
            parent.append("path")
              .attr("d", "M -6,3 6,3 0,-7 z")
              .attr("fill", color);
            break;
          case 3: // filled square
            parent.append("rect")
              .attr("x", -5).attr("y", -5).attr("width", 10).attr("height", 10)
              .attr("fill", color);
            break;
          case 4: // filled ellipse
            parent.append("ellipse")
              .attr("rx", 6).attr("ry", 4)
              .attr("fill", color);
            break;
          case 5: // filled pentagon
            parent.append("path")
              .attr("d", "M 0,-6 L 5,-2 L 3,5 L -3,5 L -5,-2 Z")
              .attr("fill", color);
            break;
          case 6: // filled hexagon
            parent.append("path")
              .attr("d", "M 0,-6 L 5,-3 L 5,3 L 0,6 L -5,3 L -5,-3 Z")
              .attr("fill", color);
            break;  
          case 7: // filled star
            parent.append("path")
              .attr("d", "M0,-6 L2,-2 L6,-2 L3,1 L4,5 L0,3 L-4,5 L-3,1 L-6,-2 L-2,-2 Z")
              .attr("fill", color);
            break;
          case 8: // open circle
            parent.append("circle")
              .attr("r", 5)
              .attr("fill", "none")
              .attr("stroke", color)
              .attr("stroke-width", strokeWidth);
            break;
          case 9: // open triangle
            parent.append("path")
              .attr("d", "M -6,3 6,3 0,-7 z")
              .attr("fill", "none")
              .attr("stroke", color)
              .attr("stroke-width", strokeWidth);
            break;
          case 10: // open square
            parent.append("rect")
              .attr("x", -5).attr("y", -5).attr("width", 10).attr("height", 10)
              .attr("fill", "none")
              .attr("stroke", color)
              .attr("stroke-width", strokeWidth);
            break;
          case 11: // open ellipse
            parent.append("ellipse")
              .attr("rx", 6).attr("ry", 4)
              .attr("fill", "none")
              .attr("stroke", color)
              .attr("stroke-width", strokeWidth);
            break;
          case 12: // open pentagon
            parent.append("path")
              .attr("d", "M 0,-6 L 5,-2 L 3,5 L -3,5 L -5,-2 Z")
              .attr("fill", "none")
              .attr("stroke", color)
              .attr("stroke-width", strokeWidth);
            break;
          case 13: // open hexagon
            parent.append("path")
              .attr("d", "M 0,-6 L 5,-3 L 5,3 L 0,6 L -5,3 L -5,-3 Z")
              .attr("fill", "none")
              .attr("stroke", color)
              .attr("stroke-width", 1.5);
            break;
          case 14: // open star
            parent.append("path")
              .attr("d", "M0,-6 L2,-2 L6,-2 L3,1 L4,5 L0,3 L-4,5 L-3,1 L-6,-2 L-2,-2 Z")
              .attr("fill", "none")
              .attr("stroke", color)
              .attr("stroke-width", strokeWidth);
            break;
          default: // fallback: filled circle
            parent.append("circle")
              .attr("r", 5)
              .attr("fill", color);
        }
      }



      drawShape(status, color, groupItem);

      // Label
      groupItem.append("text")
        .text(group)
        .attr("x", 12)
        .attr("y", 4)
        .attr("class", "legend-text filter-label")
        .datum(group)
        .style("font-size", "13px")
        .style("fill", config.colors.text_filter_legend); // 👈 juiste kleur
    });



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

        
    // Zet d.status op basis van index van de group in config.uniqueGroups
    // d.status = config.uniqueGroups.indexOf(d.group) + 1;
    d.status = config.groupToStatus[d.group] || 1;

    // Tekstkleur aanpassen bij open vormen (vanaf status 8)
    if (d.status >= 8) {
      d.textColor = (d.textColor === "white") ? "black" : "white";
    }

    // Blip link functionaliteit
    if (d.hasOwnProperty("link") && d.link) {
      blip.style("cursor", "pointer") // Zorg voor een pointer cursor bij hover
        .on("click", function() {
          window.open(d.link, "_blank"); // Open de link in een nieuw tabblad
      });
    }
    
    // blip shape
    if (d.status == 1) { // filled circle
      blip.append("circle")
        .attr("r", 9)
        .attr("fill", d.color);
    } else if (d.status == 2) { // filled triangle
      blip.append("path")
        .attr("d", "M -11,5 11,5 0,-13 z")
        .attr("fill", d.color);
    } else if (d.status == 3) { // filled square
      blip.append("rect")
        .attr("x", -7)
        .attr("y", -7)
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", d.color);
    } else if (d.status == 4) { // filled ellipse
      blip.append("ellipse")
        .attr("rx", 9)
        .attr("ry", 6)
        .attr("fill", d.color);
    } else if (d.status == 5) { // filled pentagon
      blip.append("path")
        .attr("d", "M 0,-10 L 9,-3 L 6,8 L -6,8 L -9,-3 Z")
        .attr("fill", d.color);
    } else if (d.status == 6) { // filled hexagon
      blip.append("path")
        .attr("d", "M 0,-10 L 9,-5 L 9,5 L 0,10 L -9,5 L -9,-5 Z")
        .attr("fill", d.color);
    } else if (d.status == 8) { // open circle
      blip.append("circle")
        .attr("r", 9)
        .attr("fill", "none")
        .attr("stroke", d.color)
        .attr("stroke-width", 2);
    } else if (d.status == 9) { // open triangle
      blip.append("path")
        .attr("d", "M -11,5 11,5 0,-13 z")
        .attr("fill", "none")
        .attr("stroke", d.color)
        .attr("stroke-width", 2);
    } else if (d.status == 10) { // open square
      blip.append("rect")
        .attr("x", -7)
        .attr("y", -7)
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", "none")
        .attr("stroke", d.color)
        .attr("stroke-width", 2);        
    } else if (d.status == 11) { // open ellipse
      blip.append("ellipse")
        .attr("rx", 9)
        .attr("ry", 6)
        .attr("fill", "none")
        .attr("stroke", d.color)
        .attr("stroke-width", 2);
    } else if (d.status == 12) { // open pentagon
      blip.append("path")
        .attr("d", "M 0,-10 L 9,-3 L 6,8 L -6,8 L -9,-3 Z")
        .attr("fill", "none")
        .attr("stroke", d.color)
        .attr("stroke-width", 2);
    } else if (d.status == 13) { // open star
      blip.append("path")
        .attr("d", "M0,-10 L3,-3 L10,-3 L5,2 L7,9 L0,5 L-7,9 L-5,2 L-10,-3 L-3,-3 Z")
        .attr("fill", "none")
        .attr("stroke", d.color)
        .attr("stroke-width", 2);
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
        .style("font-size", function(d) { return blip_text.length > 2 ? "7px" : "8px"; }) //8 9
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
