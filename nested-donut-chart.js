require.config({
    paths: {
    	"core":"/extensions/nested-donut-chart/amcharts/core",
    	"charts":"/extensions/nested-donut-chart/amcharts/charts",
    	"animated":"/extensions/nested-donut-chart/amcharts/animated",
    	"dataviz":"/extensions/nested-donut-chart/themes/dataviz",
    	"frozen":"/extensions/nested-donut-chart/themes/frozen",
    	"kelly":"/extensions/nested-donut-chart/themes/kelly",
    	"material":"/extensions/nested-donut-chart/themes/material",
    	"moonrisekingdom":"/extensions/nested-donut-chart/themes/moonrisekingdom",
    	"spiritedaway":"/extensions/nested-donut-chart/themes/spiritedaway",

    },
    shim: {
        'core': {
            init: function () {
                return window.am4core;
            }
        },
        'charts': {
            deps: ['core'],
            exports: 'charts',
            init: function () {
                return window.am4charts;
            }
        },
        'animated': {
            deps: ['core'],
            exports: 'animated',
            init: function () {
                return window.am4themes_animated;
            }
        },
        'dataviz': {
            deps: ['core'],
            exports: 'dataviz',
            init: function () {
                return window.am4themes_dataviz;
            }
        },
        'frozen': {
            deps: ['core'],
            exports: 'frozen',
            init: function () {
                return window.am4themes_frozen;
            }
        },
        'kelly': {
            deps: ['core'],
            exports: 'kelly',
            init: function () {
                return window.am4themes_kelly;
            }
        },
        'material': {
            deps: ['core'],
            exports: 'material',
            init: function () {
                return window.am4themes_material;
            }
        },
        'moonrisekingdom': {
            deps: ['core'],
            exports: 'dataviz',
            init: function () {
                return window.am4themes_moonrisekingdom;
            }
        },
        'spiritedaway': {
            deps: ['core'],
            exports: 'dataviz',
            init: function () {
                return window.am4themes_spiritedaway;
            }
        },
        




    }
});


define( ["qlik","jquery","css!./style.css","core","charts", "animated","dataviz","frozen","kelly","material","moonrisekingdom","spiritedaway","./about"],
	function ( qlik, $,cssContent, core, charts, animated,dataviz,frozen,kelly,material,moonrisekingdom,spiritedaway) {
		
		"use strict";
		return {
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 5,
						qHeight: 50
					}]
				}
			},
			definition: {
				type: "items",
				component: "accordion",
				items: {
					dimensions: {
						uses: "dimensions",
						min: 1,
						max: 1
					},
					measures: {
						uses: "measures",
						min: 1,
						max: 4
					},
					sorting: {
						uses: "sorting"
					},
					settings: {
						uses: "settings",
						items: {
							ChartSettings: {
								label: "Chart Custom Settings",
								items: {
										ThemeDropdownProp: {
											type: "string",
											component: "dropdown",
											label: "Change Theme",
											ref: "myproperties.vtheme",
											options: [{
												value: "animated",
												label: "Animated"
											},
											 {
												value: "dataviz",
												label: "Dataviz"
											},
											{
												value: "frozen",
												label: "Frozen"
											},
											{
												value: "kelly",
												label: "Kelly"
											},
											{
												value: "material",
												label: "Material"
											},
											{
												value: "moonrisekingdom",
												label: "Moonrisekingdom"
											},
											{
												value: "spiritedaway",
												label: "Spiritedaway"
											}],
											defaultValue: "animated"
										},
										InnerRadius: {
											type: "number",
											label: "Inner Radius (%)",
											ref: "innerRadius",
											defaultValue: 40,
										},
							            
							            
								        

									
								}
							}
						}
					},
					about: {
                            component: "rabout",
                            translation: "About",
                            label: "About"
                        }
				// end
				}
			},
			support: {
				snapshot: true,
				export: true,
				exportData: true
			},
			paint: function ($element, layout) {
				
				var id = "chartdiv_" + layout.qInfo.qId;
				$element.html("<div id ='"+id+"' class='chartdiv'></div>");

				var qHyperCube = layout.qHyperCube;
				var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
				var qMeasureInfo = qHyperCube.qMeasureInfo;
				var qDimensionInfo = qHyperCube.qDimensionInfo;

				var margin = {top: 5, right: 5, bottom: 5, left: 5};
				var width = $element.width() + margin.left + margin.right;
			    var height = $element.height() + margin.top + margin.bottom;
			    
			    $("#"+id).css({"width": width, "height": height});

			    //themes
			    const themes_list = { animated: am4themes_animated, dataviz: am4themes_dataviz,frozen: am4themes_frozen,kelly: am4themes_kelly,material: am4themes_material, moonrisekingdom: am4themes_moonrisekingdom, spiritedaway: am4themes_spiritedaway};

			    
			
				// Themes begin
				am4core.useTheme(themes_list[layout.myproperties.vtheme]);
				// Themes end

				// Create chart instance
				var chart = am4core.create(id, am4charts.PieChart);

				// Let's cut a hole in our Pie chart the size of 40% the radius
				chart.innerRadius = am4core.percent(layout.innerRadius);

				// Chart radius It can be either fixed pixel value, or relative value in percents (relative to the space available to the chart).
				chart.radius = am4core.percent(95);



				// Add data
				if(qMeasureInfo.length == 1){
					var tempdata = [];
					qMatrix.forEach(function (d){	
					tempdata.push({
						dimension: d[0].qText,
				        measure1: d[1].qNum,
					});		  
					});
				}
				else if(qMeasureInfo.length == 2){
					var tempdata = [];
					qMatrix.forEach(function (d){	
					tempdata.push({
						dimension: d[0].qText,
				        measure1: d[1].qNum,
				        measure2: d[2].qNum,
					});		  
					});
				}
				else if(qMeasureInfo.length == 3){
					var tempdata = [];
					qMatrix.forEach(function (d){	
					tempdata.push({
						dimension: d[0].qText,
				        measure1: d[1].qNum,
				        measure2: d[2].qNum,
				        measure3: d[3].qNum,
					});		  
					});
				}
				else if(qMeasureInfo.length == 4){
					var tempdata = [];
					qMatrix.forEach(function (d){	
					tempdata.push({
						dimension: d[0].qText,
				        measure1: d[1].qNum,
				        measure2: d[2].qNum,
				        measure3: d[3].qNum,
				        measure3: d[3].qNum,
					});		  
					});
				}	

				chart.data = tempdata;


				

				// Add and configure Series
				var pieSeries = chart.series.push(new am4charts.PieSeries());
				pieSeries.dataFields.value = "measure1";
				pieSeries.dataFields.category = "dimension";
				pieSeries.slices.template.stroke = am4core.color("#fff");
				pieSeries.slices.template.strokeWidth = 2;
				pieSeries.slices.template.strokeOpacity = 1;
				pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
				pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;

				

				if(qMeasureInfo.length == 2 || qMeasureInfo.length == 3 || qMeasureInfo.length == 4){
					// Disabling labels and ticks on inner circle
					pieSeries.labels.template.disabled = true;
					pieSeries.ticks.template.disabled = true;
				} else if(qMeasureInfo.length == 1){
						pieseries.calculatePercent = true;
						pieSeries.labels.template.text = "{dimension}: {measure1.percent}%";
						pieSeries.labels.template.disabled = false;
						pieSeries.ticks.template.disabled = false;
				}
				
				

				
				
				// Add second series
				var pieSeries2 = chart.series.push(new am4charts.PieSeries());
				pieSeries2.dataFields.value = "measure2";
				pieSeries2.dataFields.category = "dimension";
				pieSeries2.slices.template.stroke = am4core.color("#fff");
				pieSeries2.slices.template.strokeWidth = 2;
				pieSeries2.slices.template.strokeOpacity = 1;
				pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
				pieSeries2.slices.template.states.getKey("hover").properties.scale = 1.1;
				

				if(qMeasureInfo.length == 1 || qMeasureInfo.length == 3 || qMeasureInfo.length == 4){
					// Disabling labels and ticks on inner circle
						pieSeries2.labels.template.disabled = true;
						pieSeries2.ticks.template.disabled = true;
				}
				else if(qMeasureInfo.length == 2){
						pieseries2.calculatePercent = true;
						pieSeries2.labels.template.text = "{dimension}: {measure2.percent}%";
						// Enabling labels and ticks on inner circle
						pieSeries2.labels.template.disabled = false;
						pieSeries2.ticks.template.disabled = false;
				}

				// Add third series
				var pieSeries3 = chart.series.push(new am4charts.PieSeries());
				pieSeries3.dataFields.value = "measure3";
				pieSeries3.dataFields.category = "dimension";
				pieSeries3.slices.template.stroke = am4core.color("#fff");
				pieSeries3.slices.template.strokeWidth = 2;
				pieSeries3.slices.template.strokeOpacity = 1;
				pieSeries3.slices.template.states.getKey("hover").properties.shiftRadius = 0;
				pieSeries3.slices.template.states.getKey("hover").properties.scale = 1.1;
				

				if(qMeasureInfo.length == 1 || qMeasureInfo.length == 2 || qMeasureInfo.length == 4){
					// Disabling labels and ticks on inner circle
						pieSeries3.labels.template.disabled = true;
						pieSeries3.ticks.template.disabled = true;
				}
				else if(qMeasureInfo.length == 3){
						pieseries3.calculatePercent = true;
						pieSeries3.labels.template.text = "{dimension}: {measure3.percent}%";
						// Enabling labels and ticks on inner circle
						pieSeries3.labels.template.disabled = false;
						pieSeries3.ticks.template.disabled = false;
				}

				// Add fourth series
				var pieSeries4 = chart.series.push(new am4charts.PieSeries());
				pieSeries4.dataFields.value = "measure3";
				pieSeries4.dataFields.category = "dimension";
				pieSeries4.slices.template.stroke = am4core.color("#fff");
				pieSeries4.slices.template.strokeWidth = 2;
				pieSeries4.slices.template.strokeOpacity = 1;
				pieSeries4.slices.template.states.getKey("hover").properties.shiftRadius = 0;
				pieSeries4.slices.template.states.getKey("hover").properties.scale = 1.1;
				

				if(qMeasureInfo.length == 1 || qMeasureInfo.length == 2 || qMeasureInfo.length == 3){
					// Disabling labels and ticks on inner circle
						pieSeries4.labels.template.disabled = true;
						pieSeries4.ticks.template.disabled = true;
				}
				else if(qMeasureInfo.length == 4){
						pieseries4.calculatePercent = true;
						pieSeries4.labels.template.text = "{dimension}: {measure4.percent}%";
						// Enabling labels and ticks on inner circle
						pieSeries4.labels.template.disabled = false;
						pieSeries4.ticks.template.disabled = false;
				}
				
				return qlik.Promise.resolve();
			}
		};

	} );
