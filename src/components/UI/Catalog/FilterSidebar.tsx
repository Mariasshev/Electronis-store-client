"use client";

import React from 'react';
import { CiSearch } from "react-icons/ci";

const FilterSidebar = () => {
    return (
        <div className="filter-sidebar pe-lg-4">
            {/* Accordion для фильтров */}
            <div className="accordion accordion-flush" id="accordionFilters">

                {/* Filter: Brand */}
                <div className="accordion-item mb-3 border-0">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fw-bold bg-transparent shadow-none p-0 mb-3 text-dark"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseBrand"
                            aria-expanded="true"
                        >
                            Brand
                        </button>
                    </h2>
                    <div id="collapseBrand" className="accordion-collapse collapse show" data-bs-parent="#accordionFilters">
                        <div className="accordion-body p-0">
                            {/* Search input inside Brand */}
                            <div className="input-group mb-3 bg-light rounded">
                <span className="input-group-text bg-transparent border-0 text-muted">
                    <CiSearch size={20} />
                </span>
                                <input type="text" className="form-control bg-transparent border-0 shadow-none" placeholder="Search" />
                            </div>

                            {/* Checkboxes */}
                            <div className="d-flex flex-column gap-2">
                                {['Apple', 'Samsung', 'Xiaomi', 'Poco', 'OPPO', 'Honor', 'Motorola'].map((brand, index) => (
                                    <div key={index} className="form-check d-flex justify-content-between align-items-center">
                                        <div>
                                            <input className="form-check-input shadow-none bg-dark border-dark" type="checkbox" id={`brand-${index}`} defaultChecked={brand === 'Apple'} />
                                            <label className="form-check-label ms-2" htmlFor={`brand-${index}`}>
                                                {brand}
                                            </label>
                                        </div>
                                        <span className="text-muted small">110</span> {/* Количество (мок данные) */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter: Battery capacity (Collapsed example) */}
                <div className="accordion-item mb-3 border-0">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed fw-bold bg-transparent shadow-none p-0 mb-3 text-dark"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseBattery"
                        >
                            Battery capacity
                        </button>
                    </h2>
                    <div id="collapseBattery" className="accordion-collapse collapse">
                        <div className="accordion-body p-0 text-muted">
                            Options here...
                        </div>
                    </div>
                </div>

                {/* Другие фильтры по аналогии... */}
                {['Screen type', 'Screen diagonal', 'Protection class', 'Built-in memory'].map((filter, i) => (
                    <div key={i} className="accordion-item mb-3 border-0">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed fw-bold bg-transparent shadow-none p-0 mb-3 text-dark"
                                type="button"
                            >
                                {filter}
                            </button>
                        </h2>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default FilterSidebar;