import { getUserAvailability } from "@/actions/availability";
import React from "react";
import { defaultAvailability } from "./data";
import AvailabilityForm from "./_components/availability-form";

const AvailabilityPage = async () => {
    const availabilityData = await getUserAvailability();

    return <AvailabilityForm initialData={availabilityData || defaultAvailability} />
};

export default AvailabilityPage;
