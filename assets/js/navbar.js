/* Copyright 2025 SimpleMaps, https://simplemaps.com
 Released under MIT license - https://opensource.org/licenses/MIT 
 */
(function (plugin) {
    'use strict';

    // Constants
    const SCROLL_AMOUNT = 200;
    const DEFAULT_CONTAINER_ID = 'map_navbar';
    const DEFAULT_LEVEL = 'default';

    // Utility class for DOM manipulation
    class DOMUtil {
        static getElement(id, warnMessage) {
            const element = document.getElementById(id);
            if (!element) console.warn(warnMessage);
            return element;
        }

        static createElement(tag, attributes = {}) {
            const element = document.createElement(tag);
            Object.assign(element, attributes);
            return element;
        }
    }

    // Map configuration
    class MapConfigurator {
        static initialize(map) {
            Object.assign(map.mapdata.main_settings, {

                // initial map settings, adjust as needed
                all_states_zoomable: 'yes',
                manual_zoom: 'no'
            });

            map.load();
        }
    }

    // Navigation bar manager
    class NavBarManager {
        constructor(map, config, updateArrowsCallback) {
            this.map = map;
            this.config = config;
            this.updateArrows = updateArrowsCallback;
            this.regionStates = []; // Store states of the clicked region
        }

        createNavigationElements(data, levelType) {
            const container = DOMUtil.getElement('map_navbar_elements', 
                "Nav bar container 'map_navbar_elements' not found!");
            if (!container) return {};

            container.innerHTML = '';
            const elements = {};

            Object.entries(data)
                .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                .forEach(([id, item]) => {
                    const li = DOMUtil.createElement('li');
                    const a = DOMUtil.createElement('a', {
                        innerHTML: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                        className: id
                    });
                    li.appendChild(a);
                    container.appendChild(li);
                    elements[id] = li;
                });

            if (Object.keys(elements).length === 0) {
                if (levelType === 'regions') {
                    console.warn('No regions found to display in the navigation bar. This mapdata file does not have regions, or all regions were excluded.');
                } else if (levelType === 'states') {
                    console.warn('No states found to display in the navigation bar. This mapdata file does not have states, or all states were excluded.');
                }
            }

            return elements;
        }

        setupHoverEvents(elements, type) {
            if (!this.config.list_to_map) return;

            const dic = { states: 'state', regions: 'region', locations: 'location' };
            
            Object.values(elements).forEach(element => {
                const anchor = element.querySelector('a');
                const id = anchor.className;

                element.addEventListener('mouseenter', () => {
                    type === 'states' 
                        ? this.map.pulse_state(id)
                        : this.map.popup(dic[type], id);
                });

                element.addEventListener('mouseleave', () => {
                    type === 'states'
                        ? this.map.pulse_state(id, false)
                        : this.map.popup_hide();
                });
            });
        }

        setupClickEvents(elements, type) {
            Object.entries(elements).forEach(([id, element]) => {
                element.addEventListener('click', () => {
                    if (type === 'regions') {
                        this.regionStates = this.map.mapdata.regions[id].states || []; // Set states for this region
                        this.map.popup_hide();
                        this.map.region_zoom(id);
                    } else if (type === 'states') {
                        this.map.state_zoom(id);
                    }
                });
            });
        }

        generateLevelData(levelType) {
            const levelKey = levelType === 'states' ? 'state_specific' : levelType;
            const elementsInfo = this.map.mapdata[levelKey] || {}; // Default to empty object if undefined
            const filteredElements = this.filterElements(elementsInfo, levelType);
            const htmlElements = this.createNavigationElements(filteredElements, levelType);
            this.setupHoverEvents(htmlElements, levelType);
            this.setupClickEvents(htmlElements, levelType);
            if (this.updateArrows) this.updateArrows();
        }

        filterElements(elementsInfo, levelType) {
            let filtered = Object.entries(elementsInfo)
                .filter(([key]) => !this.config.exclude.includes(key));

            // If showing states and regionStates is set, filter to only those states
            if (levelType === 'states' && this.regionStates.length > 0) {
                filtered = filtered.filter(([key]) => this.regionStates.includes(key));
            }

            return Object.fromEntries(filtered);
        }

        updateCategoryHeading(category) {
            const heading = DOMUtil.getElement('map_navbar_heading',
                "Category heading element 'map_navbar_heading' not found!");
            if (heading) {
                let labelText = category;
                if (category === 'states') {
                    labelText = this.config.states_label;
                } else if (category === 'regions') {
                    labelText = this.config.regions_label;
                }
                heading.textContent = labelText;
            }
        }
    }

    // Scroll menu manager
    class ScrollMenu {
        static initialize(containerID) {
            // First check if a custom container exists
            let container = DOMUtil.getElement(containerID);
            
            // If no custom container exists, create one inside the map div
            if (!container) {
                const mapDiv = DOMUtil.getElement('map', 'Map container div not found!');
                if (!mapDiv) return null;
                
                // Create the navbar container inside the map div
                container = DOMUtil.createElement('div', {
                    id: containerID,
                    className: 'map_navbar'
                });
                
                // Insert at the beginning of the map div
                mapDiv.insertBefore(container, mapDiv.firstChild);
            } else {
                container.classList.add('map_navbar');
            }
            
            container.appendChild(DOMUtil.createElement('div', {
                className: 'map_navbar_heading',
                id: 'map_navbar_heading'
            }));
    
            const scrollDiv = DOMUtil.createElement('div', {
                className: 'map_navbar_elements',
                id: 'map_navbar_elements'
            });
    
            const [leftArrow, rightArrow] = ['left', 'right'].map(dir => 
                DOMUtil.createElement('div', {
                    className: `map_navbar_arrow ${dir}`,
                    innerHTML: dir === 'left' ? '◄' : '►'
                })
            );
    
            container.appendChild(leftArrow);
            container.appendChild(scrollDiv);
            container.appendChild(rightArrow);
            return this.setupScrollBehavior(scrollDiv, leftArrow, rightArrow);
        }
    
        static setupScrollBehavior(scrollDiv, leftArrow, rightArrow) {
            const SCROLL_AMOUNT = 200;
            const TOLERANCE = 2;

            const updateArrows = () => {
                const isOverflowing = scrollDiv.scrollWidth > scrollDiv.clientWidth;
                const atLeft = scrollDiv.scrollLeft <= 0;
                const atRight = scrollDiv.scrollLeft + scrollDiv.clientWidth >= scrollDiv.scrollWidth - TOLERANCE;
    
                leftArrow.style.display = isOverflowing && !atLeft ? 'block' : 'none';
                rightArrow.style.display = isOverflowing && !atRight ? 'block' : 'none';
            };
    
            leftArrow.addEventListener('click', () => 
                scrollDiv.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' }));
            rightArrow.addEventListener('click', () => 
                scrollDiv.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' }));
            
            scrollDiv.addEventListener('scroll', updateArrows);
            scrollDiv.addEventListener('mouseenter', updateArrows);
            updateArrows();
            return updateArrows;
        }
    }

    function applyStyles(apply_css) {
        if (!apply_css) return;

        const style = DOMUtil.createElement('style', {
            innerHTML: `
                .map_navbar {
                    display: flex;
                    align-items: center;
                    background-color: #f8f9fa;
                    padding: 5px 10px;
                    border-bottom: 1px solid #e0e0e0;
                    gap: 10px;
                    position: relative;
                    z-index: 1;
                }
                .map_navbar .map_navbar_heading {
                    font-weight: bold;
                    font-size: 18px;
                    color: #343a40;
                    flex-shrink: 0;
                    padding: 0 10px;
                    line-height: 1;
                    margin: 0;
                }
                .map_navbar .map_navbar_elements {
                    display: flex;
                    align-items: center;
                    overflow-x: auto;
                    white-space: nowrap;
                    gap: 10px;
                    flex-grow: 1;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                    justify-content: space-around !important;
                }
                .map_navbar .map_navbar_elements::-webkit-scrollbar {
                    display: none;
                }
                .map_navbar .map_navbar_elements li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6c757d;
                    padding: 8px 16px;
                    font-size: 16px;
                    font-weight: 500;
                    transition: color 0.3s ease, background-color 0.3s ease;
                    cursor: pointer;
                    line-height: 1;
                    margin: 0;
                    min-height: 24px;
                    box-sizing: border-box;
                }
                .map_navbar .map_navbar_elements li:hover {
                    color: #343a40;
                    background-color: #e9ecef;
                }
                .map_navbar_arrow {
                    position: relative;
                    font-size: 20px;
                    color: #343a40;
                    cursor: pointer;
                    display: none;
                    padding: 5px;
                    flex-shrink: 0;
                    line-height: 1;
                }
                .map_navbar_arrow.left { left: 10px; }
                .map_navbar_arrow.right { right: 10px; }
                @media (max-width: 768px) {
                    .map_navbar { padding: 5px; }
                    .map_navbar .map_navbar_heading { font-size: 16px; }
                    .map_navbar .map_navbar_elements li {
                        padding: 6px 12px;
                        font-size: 14px;
                        min-height: 20px;
                    }
                    .map_navbar_arrow { font-size: 18px; padding: 8px; }
                }
            `
        });
        document.head.appendChild(style);
    }
    
    // API initialization
    const api = {
        map: null,
        exclude: [],
        list_to_map: false,
        level_to_show: DEFAULT_LEVEL,
        apply_css: true,
        states_label: 'States',
        regions_label: 'Regions'
    };

    window[plugin] = api;

    // Main initialization
    document.addEventListener('DOMContentLoaded', () => {
        const me = window[plugin];
        const map = me.map || window['simplemaps_usmap'];
        const updateArrows = ScrollMenu.initialize(DEFAULT_CONTAINER_ID);
        if (!updateArrows) console.warn('ScrollMenu initialization failed; check if map div exists in the DOM.');
        const navManager = new NavBarManager(map, me, updateArrows);

        MapConfigurator.initialize(map);
        applyStyles(me.apply_css);

        map.plugin_hooks.zoomable_click_region.push(id => {
            // Set the region states before zooming
            navManager.regionStates = map.mapdata.regions[id].states || [];
            map.region_zoom(id);
        });

        map.hooks.zooming_complete = () => {
            const level = map.zoom_level;
            if (level === 'out') {
                navManager.regionStates = []; // Reset when zoomed out
                const targetLevel = me.level_to_show === DEFAULT_LEVEL ? 'regions' : me.level_to_show;
                navManager.generateLevelData(targetLevel);
                navManager.updateCategoryHeading(targetLevel);
            } else if (level === 'region' && me.level_to_show !== 'regions') {
                navManager.generateLevelData('states');
                navManager.updateCategoryHeading('states');
            }
        };
    });
})('simplemaps_navbar');