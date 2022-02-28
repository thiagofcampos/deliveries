import React from 'react';
import Deliveries from '../pages/deliveries/Deliveries';
import Delivery from '../pages/delivery/Delivery';
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Deliveries />} />
            <Route path=":id" element={<Delivery />} />
        </Routes>
    );
};

export default AppRouter;
