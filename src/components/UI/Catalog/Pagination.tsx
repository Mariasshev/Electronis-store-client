import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = () => {
    return (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
            <button className="btn btn-light border-0"><IoIosArrowBack /></button>

            {/* Active Page */}
            <button className="btn btn-dark px-3">1</button>

            <button className="btn btn-light border-0 px-3">2</button>
            <button className="btn btn-light border-0 px-3">3</button>
            <span className="text-muted">...</span>
            <button className="btn btn-light border-0 px-3">12</button>

            <button className="btn btn-light border-0"><IoIosArrowForward /></button>
        </div>
    );
};

export default Pagination;